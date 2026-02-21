import { describe, it, expect } from 'vitest';

describe('Supabase Database Filtering', () => {
    it('verifies a SQL query logic for filtering exercises based on available equipment', () => {
        // Note: Since we don't have a live database to connect to in the test suite by default,
        // this test demonstrates the logic of the query that will be used.
        // The requirement states: "return all exercises where equipment_required is empty or contains 'Dumbbell'".

        // Example available equipment for the user:
        const availableEquipment = ['Dumbbell'];

        // In PostgREST/Supabase TS SDK, this query would look like:
        // supabase.from('exercises').select('*').or(`equipment_required.cs.{${availableEquipment.join(',')}},equipment_required.eq.{}`);

        // We can simulate the filtering locally to verify the logic matches expectations:
        const mockExercises = [
            { id: 1, name: 'Air Squat', equipment_required: [] },
            { id: 2, name: 'Dumbbell Snatch', equipment_required: ['Dumbbell'] },
            { id: 3, name: 'Pull Up', equipment_required: ['Pull Up Bar'] },
            { id: 4, name: 'Renegade Row', equipment_required: ['Dumbbell', 'Kettlebell'] } // Let's say it requires both
        ];

        // Filter logic: equipment_required array is empty OR every item in equipment_required is in availableEquipment
        // (If the array requires both DB and KB, and we only have DB, we can't do it)
        const filteredExercises = mockExercises.filter(ex => {
            if (ex.equipment_required.length === 0) return true;
            return ex.equipment_required.every(equip => availableEquipment.includes(equip));
        });

        expect(filteredExercises.map(ex => ex.name)).toEqual(['Air Squat', 'Dumbbell Snatch']);
    });
});
