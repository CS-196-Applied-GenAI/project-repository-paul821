import { supabase } from './supabase'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Exercise {
  id: string
  name: string
  movement_pattern: 'push' | 'pull' | 'squat' | 'hinge' | 'core'
  equipment_required: string[]
  base_difficulty: number
}

export interface WODMovement {
  exercise_id: string
  reps: number | string
}

export interface Workout {
  id: string
  name: string
  type: 'AMRAP' | 'For Time' | 'EMOM'
  default_movements: WODMovement[]
}

export interface GeneratedTimeBlock {
  durationMinutes: number
  type: 'AMRAP' | 'EMOM' | 'For Time'
  movements: Array<{ exercise_id: string; name: string; reps: number }>
}

export interface ClosestMatch {
  wod: Workout
  missingEquipment: string[]
}

// ─── WorkoutEngine ───────────────────────────────────────────────────────────

export class WorkoutEngine {
  /**
   * Filters exercises to those the user can perform with their available equipment.
   * An exercise is valid if equipment_required is empty (bodyweight) or all
   * required items are in the user's available equipment list.
   */
  private filterExercisesByEquipment(
    exercises: Exercise[],
    availableEquipment: string[]
  ): Exercise[] {
    return exercises.filter((ex) => {
      if (ex.equipment_required.length === 0) return true
      return ex.equipment_required.every((equip) =>
        availableEquipment.includes(equip)
      )
    })
  }

  /**
   * Phase 1: Classic WOD Matcher
   * Returns classic WODs from the DB that the user can fully perform
   * with their available equipment.
   */
  async getMatchedWODs(availableEquipment: string[]): Promise<Workout[]> {
    const { data: exercises, error: exError } = await supabase
      .from('exercises')
      .select('*')

    if (exError) throw new Error(`Failed to fetch exercises: ${exError.message}`)

    const { data: workouts, error: wodError } = await supabase
      .from('workouts')
      .select('*')

    if (wodError) throw new Error(`Failed to fetch workouts: ${wodError.message}`)

    // Build set of valid exercise IDs based on equipment
    const validExerciseIds = new Set(
      this.filterExercisesByEquipment(exercises as Exercise[], availableEquipment)
        .map((ex) => ex.id)
    )

    // Return only workouts where ALL movements use valid exercises
    return (workouts as Workout[]).filter((wod) =>
      wod.default_movements.every((m) => validExerciseIds.has(m.exercise_id))
    )
  }

  /**
   * Phase 2: Template Stacker
   * Creates a workout time block structure based on duration.
   */
  generateTimeBlock(durationMinutes: number): GeneratedTimeBlock {
    let type: 'AMRAP' | 'EMOM' | 'For Time'

    if (durationMinutes <= 10) {
      type = 'AMRAP'
    } else if (durationMinutes <= 20) {
      type = 'EMOM'
    } else {
      type = 'For Time'
    }

    return {
      durationMinutes,
      type,
      movements: [],
    }
  }

  /**
   * Balanced Movement Rule + Smart Workout Generator
   * Generates a workout with balanced movement distribution:
   * one push, one pull, and one squat/hinge movement.
   * All selected exercises must be performable with the user's equipment.
   */
  async generateSmartWorkout(
    durationMinutes: number,
    availableEquipment: string[]
  ): Promise<GeneratedTimeBlock> {
    const block = this.generateTimeBlock(durationMinutes)

    const { data: exercises, error } = await supabase
      .from('exercises')
      .select('*')

    if (error) throw new Error(`Failed to fetch exercises: ${error.message}`)

    const validExercises = this.filterExercisesByEquipment(
      exercises as Exercise[],
      availableEquipment
    )

    // Bucket exercises by movement pattern category
    const pushExercises = validExercises.filter((e) => e.movement_pattern === 'push')
    const pullExercises = validExercises.filter((e) => e.movement_pattern === 'pull')
    const squatHingeExercises = validExercises.filter(
      (e) => e.movement_pattern === 'squat' || e.movement_pattern === 'hinge'
    )

    // Pick one random exercise from each bucket
    const pickRandom = (arr: Exercise[]): Exercise | null =>
      arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null

    const selected = [
      pickRandom(pushExercises),
      pickRandom(pullExercises),
      pickRandom(squatHingeExercises),
    ].filter((e): e is Exercise => e !== null)

    block.movements = selected.map((ex) => ({
      exercise_id: ex.id,
      name: ex.name,
      reps: ex.base_difficulty * 5,
    }))

    return block
  }

  /**
   * Phase 3: Filter Relaxation
   * When no classic WOD matches exactly, find the closest matches
   * and report which equipment is missing.
   */
  async getClosestMatchedWODs(
    availableEquipment: string[]
  ): Promise<ClosestMatch[]> {
    const { data: exercises, error: exError } = await supabase
      .from('exercises')
      .select('*')

    if (exError) throw new Error(`Failed to fetch exercises: ${exError.message}`)

    const { data: workouts, error: wodError } = await supabase
      .from('workouts')
      .select('*')

    if (wodError) throw new Error(`Failed to fetch workouts: ${wodError.message}`)

    const exerciseMap = new Map(
      (exercises as Exercise[]).map((ex) => [ex.id, ex])
    )

    const results: ClosestMatch[] = []

    for (const wod of workouts as Workout[]) {
      const missingSet = new Set<string>()

      for (const movement of wod.default_movements) {
        const exercise = exerciseMap.get(movement.exercise_id)
        if (!exercise) continue

        for (const equip of exercise.equipment_required) {
          if (!availableEquipment.includes(equip)) {
            missingSet.add(equip)
          }
        }
      }

      // Only include if there IS missing equipment (otherwise it's an exact match)
      // and the gap isn't too large (at most 3 missing items)
      if (missingSet.size > 0 && missingSet.size <= 3) {
        results.push({
          wod,
          missingEquipment: Array.from(missingSet),
        })
      }
    }

    // Sort by fewest missing items first (closest match)
    return results.sort((a, b) => a.missingEquipment.length - b.missingEquipment.length)
  }

  /**
   * Rep-Volume Scaling
   * When substituting equipment, scale reps to maintain stimulus.
   * Barbell → Dumbbell: +20% reps
   * Dumbbell → None (bodyweight): +50% reps
   */
  scaleRepVolume(
    reps: number | string,
    originalEquipment: string,
    substitutedEquipment: string
  ): number | string {
    let scaleFactor = 1

    if (originalEquipment === 'Barbell' && substitutedEquipment === 'Dumbbell') {
      scaleFactor = 1.2
    } else if (originalEquipment === 'Dumbbell' && substitutedEquipment === 'None') {
      scaleFactor = 1.5
    } else if (originalEquipment === 'Barbell' && substitutedEquipment === 'None') {
      scaleFactor = 1.8
    } else {
      return reps // Unknown substitution, return unchanged
    }

    if (typeof reps === 'number') {
      return Math.round(reps * scaleFactor)
    }

    // Handle string rep schemes like "21-15-9"
    return reps
      .split('-')
      .map((r) => Math.round(parseInt(r, 10) * scaleFactor).toString())
      .join('-')
  }
}
