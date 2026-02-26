import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

// Use env vars or fall back to .env file values for CLI usage
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://iifumpbvwqlhqndknaoq.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tSPCRC26S3PQLwYBQ2DeNQ_W-Uq8Kwj'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Exercise Definitions ────────────────────────────────────────────────────
// 55 exercises covering all 5 movement patterns and various equipment levels

export interface SeedExercise {
  id: string
  name: string
  movement_pattern: 'push' | 'pull' | 'squat' | 'hinge' | 'core'
  equipment_required: string[]
  base_difficulty: number
}

export interface SeedWODMovement {
  exercise_id: string
  reps: number | string
}

export interface SeedWorkout {
  id: string
  name: string
  type: 'AMRAP' | 'For Time' | 'EMOM'
  default_movements: SeedWODMovement[]
}

export const seededExercises: SeedExercise[] = [
  // ── PUSH movements (12) ──────────────────────────────────────────────────
  { id: uuidv4(), name: 'Push Up', movement_pattern: 'push', equipment_required: [], base_difficulty: 3 },
  { id: uuidv4(), name: 'Burpee', movement_pattern: 'push', equipment_required: [], base_difficulty: 5 },
  { id: uuidv4(), name: 'Handstand Push Up', movement_pattern: 'push', equipment_required: [], base_difficulty: 8 },
  { id: uuidv4(), name: 'Strict Press', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Push Press', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 6 },
  { id: uuidv4(), name: 'Push Jerk', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Thruster', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 8 },
  { id: uuidv4(), name: 'Ring Dip', movement_pattern: 'push', equipment_required: ['Rings'], base_difficulty: 7 },
  { id: uuidv4(), name: 'DB Push Press', movement_pattern: 'push', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'DB Thruster', movement_pattern: 'push', equipment_required: ['Dumbbell'], base_difficulty: 6 },
  { id: uuidv4(), name: 'KB Push Press', movement_pattern: 'push', equipment_required: ['Kettlebell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Wall Walk', movement_pattern: 'push', equipment_required: [], base_difficulty: 7 },

  // ── PULL movements (10) ──────────────────────────────────────────────────
  { id: uuidv4(), name: 'Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Chest to Bar Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Bar Muscle Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 9 },
  { id: uuidv4(), name: 'Ring Muscle Up', movement_pattern: 'pull', equipment_required: ['Rings'], base_difficulty: 9 },
  { id: uuidv4(), name: 'Ring Row', movement_pattern: 'pull', equipment_required: ['Rings'], base_difficulty: 3 },
  { id: uuidv4(), name: 'DB Renegade Row', movement_pattern: 'pull', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Barbell Row', movement_pattern: 'pull', equipment_required: ['Barbell', 'Weights'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Rope Climb', movement_pattern: 'pull', equipment_required: ['Rope'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Rowing', movement_pattern: 'pull', equipment_required: ['Rower'], base_difficulty: 4 },
  { id: uuidv4(), name: 'Sumo Deadlift High Pull', movement_pattern: 'pull', equipment_required: ['Barbell', 'Weights'], base_difficulty: 6 },

  // ── SQUAT movements (11) ─────────────────────────────────────────────────
  { id: uuidv4(), name: 'Air Squat', movement_pattern: 'squat', equipment_required: [], base_difficulty: 2 },
  { id: uuidv4(), name: 'Back Squat', movement_pattern: 'squat', equipment_required: ['Barbell', 'Weights'], base_difficulty: 6 },
  { id: uuidv4(), name: 'Front Squat', movement_pattern: 'squat', equipment_required: ['Barbell', 'Weights'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Overhead Squat', movement_pattern: 'squat', equipment_required: ['Barbell', 'Weights'], base_difficulty: 8 },
  { id: uuidv4(), name: 'Pistol Squat', movement_pattern: 'squat', equipment_required: [], base_difficulty: 8 },
  { id: uuidv4(), name: 'Box Jump', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 4 },
  { id: uuidv4(), name: 'Wall Ball', movement_pattern: 'squat', equipment_required: ['Medicine Ball'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Goblet Squat', movement_pattern: 'squat', equipment_required: ['Kettlebell'], base_difficulty: 4 },
  { id: uuidv4(), name: 'DB Front Rack Lunge', movement_pattern: 'squat', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Lunge', movement_pattern: 'squat', equipment_required: [], base_difficulty: 3 },
  { id: uuidv4(), name: 'Step Up', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 3 },

  // ── HINGE movements (10) ─────────────────────────────────────────────────
  { id: uuidv4(), name: 'Deadlift', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 6 },
  { id: uuidv4(), name: 'Clean', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 8 },
  { id: uuidv4(), name: 'Power Clean', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Snatch', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 9 },
  { id: uuidv4(), name: 'Power Snatch', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 8 },
  { id: uuidv4(), name: 'KB Swing', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 4 },
  { id: uuidv4(), name: 'KB Snatch', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 6 },
  { id: uuidv4(), name: 'KB Clean', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'DB Snatch', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: uuidv4(), name: 'DB Clean and Jerk', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 6 },

  // ── CORE movements (12) ──────────────────────────────────────────────────
  { id: uuidv4(), name: 'Sit Up', movement_pattern: 'core', equipment_required: [], base_difficulty: 2 },
  { id: uuidv4(), name: 'Toes to Bar', movement_pattern: 'core', equipment_required: ['Pull Up Bar'], base_difficulty: 6 },
  { id: uuidv4(), name: 'V-Up', movement_pattern: 'core', equipment_required: [], base_difficulty: 4 },
  { id: uuidv4(), name: 'Hollow Hold', movement_pattern: 'core', equipment_required: [], base_difficulty: 4 },
  { id: uuidv4(), name: 'Plank', movement_pattern: 'core', equipment_required: [], base_difficulty: 2 },
  { id: uuidv4(), name: 'L-Sit', movement_pattern: 'core', equipment_required: [], base_difficulty: 7 },
  { id: uuidv4(), name: 'GHD Sit Up', movement_pattern: 'core', equipment_required: ['GHD Machine'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Double Under', movement_pattern: 'core', equipment_required: ['Jump Rope'], base_difficulty: 5 },
  { id: uuidv4(), name: 'Single Under', movement_pattern: 'core', equipment_required: ['Jump Rope'], base_difficulty: 2 },
  { id: uuidv4(), name: 'Medicine Ball Clean', movement_pattern: 'core', equipment_required: ['Medicine Ball'], base_difficulty: 4 },
  { id: uuidv4(), name: 'Turkish Get Up', movement_pattern: 'core', equipment_required: ['Kettlebell'], base_difficulty: 7 },
  { id: uuidv4(), name: 'Russian Twist', movement_pattern: 'core', equipment_required: [], base_difficulty: 3 },
]

// Helper to find exercise ID by name
function exId(name: string): string {
  const exercise = seededExercises.find(e => e.name === name)
  if (!exercise) throw new Error(`Exercise not found: ${name}`)
  return exercise.id
}

// ─── Classic WOD Definitions ─────────────────────────────────────────────────
export const seededWorkouts: SeedWorkout[] = [
  {
    id: uuidv4(),
    name: 'Cindy',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 5 },
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Fran',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Thruster'), reps: '21-15-9' },
      { exercise_id: exId('Pull Up'), reps: '21-15-9' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Helen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('KB Swing'), reps: 21 },
      { exercise_id: exId('Pull Up'), reps: 12 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Diane',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: '21-15-9' },
      { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Annie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Double Under'), reps: '50-40-30-20-10' },
      { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Grace',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Clean'), reps: 30 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Isabel',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Snatch'), reps: 30 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Jackie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Rowing'), reps: 1000 },
      { exercise_id: exId('Thruster'), reps: 50 },
      { exercise_id: exId('Pull Up'), reps: 30 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Karen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Wall Ball'), reps: 150 },
    ],
  },
  {
    id: uuidv4(),
    name: 'Mary',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Handstand Push Up'), reps: 5 },
      { exercise_id: exId('Pistol Squat'), reps: 10 },
      { exercise_id: exId('Pull Up'), reps: 15 },
    ],
  },
]

// ─── Seed Runner ─────────────────────────────────────────────────────────────
async function runSeed() {
  console.log('🌱 Seeding exercises...')

  // Clear existing data first
  await supabase.from('workouts').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('exercises').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Insert exercises
  const { error: exError } = await supabase.from('exercises').insert(seededExercises)
  if (exError) {
    console.error('❌ Failed to seed exercises:', exError.message)
    process.exit(1)
  }
  console.log(`✅ Seeded ${seededExercises.length} exercises`)

  // Insert workouts
  console.log('🌱 Seeding workouts...')
  const { error: wodError } = await supabase.from('workouts').insert(seededWorkouts)
  if (wodError) {
    console.error('❌ Failed to seed workouts:', wodError.message)
    process.exit(1)
  }
  console.log(`✅ Seeded ${seededWorkouts.length} classic WODs`)

  console.log('\n🎉 Seeding complete!')
  console.log(`   Exercises: ${seededExercises.length}`)
  console.log(`   Workouts:  ${seededWorkouts.length}`)
}

// Run if executed directly
runSeed()
