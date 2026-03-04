import { describe, it, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

describe('Seeding Integrity', () => {
  it('ensures 50+ distinct exercises are seeded with all movement patterns', async () => {
    const { data: exercises, error } = await supabase
      .from('exercises')
      .select('*')

    expect(error).toBeNull()
    expect(exercises).not.toBeNull()
    expect(exercises!.length).toBeGreaterThanOrEqual(92)

    // Verify all movement patterns are covered
    const patterns = new Set(exercises!.map((e: { movement_pattern: string }) => e.movement_pattern))
    expect(patterns.has('push')).toBe(true)
    expect(patterns.has('pull')).toBe(true)
    expect(patterns.has('squat')).toBe(true)
    expect(patterns.has('hinge')).toBe(true)
    expect(patterns.has('core')).toBe(true)

    // Verify all IDs are unique
    const uniqueIds = new Set(exercises!.map((e: { id: string }) => e.id))
    expect(uniqueIds.size).toBe(exercises!.length)
  })

  it('ensures every classic WOD has valid exercise references in its jsonb column', async () => {
    const { data: workouts, error: wodError } = await supabase
      .from('workouts')
      .select('*')

    expect(wodError).toBeNull()
    expect(workouts).not.toBeNull()
    expect(workouts!.length).toBeGreaterThanOrEqual(230)

    // Get all exercise IDs from DB
    const { data: exercises } = await supabase
      .from('exercises')
      .select('id')

    const exerciseIds = new Set(exercises!.map((e: { id: string }) => e.id))

    // Every WOD movement should reference a valid exercise
    workouts!.forEach((wod: { name: string; default_movements: Array<{ exercise_id: string }> }) => {
      expect(wod.default_movements.length).toBeGreaterThan(0)
      wod.default_movements.forEach((movement) => {
        expect(movement.exercise_id).toBeDefined()
        expect(exerciseIds.has(movement.exercise_id)).toBe(true)
      })
    })
  })
})
