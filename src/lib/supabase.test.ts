import { describe, it, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'

// Create a test client using env vars (loaded by Vitest via Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

describe('Supabase Database Filtering', () => {
  it('connects to the live Supabase database', async () => {
    const { error } = await supabase.from('exercises').select('id').limit(1)
    expect(error).toBeNull()
  })

  it('filters exercises based on available equipment', async () => {
    // Fetch all exercises from live DB
    const { data: exercises, error } = await supabase
      .from('exercises')
      .select('*')

    expect(error).toBeNull()

    // Apply client-side filtering logic (mirrors what WorkoutEngine will do)
    const availableEquipment = ['Dumbbell']

    const filtered = (exercises ?? []).filter((ex: { equipment_required: string[] }) => {
      if (ex.equipment_required.length === 0) return true
      return ex.equipment_required.every((equip: string) =>
        availableEquipment.includes(equip)
      )
    })

    // All returned exercises should either need no equipment or only a Dumbbell
    filtered.forEach((ex: { equipment_required: string[] }) => {
      ex.equipment_required.forEach((equip: string) => {
        expect(availableEquipment).toContain(equip)
      })
    })
  })
})
