import { describe, it, expect } from 'vitest';
import { seededExercises, seededWorkouts } from '../../scripts/seed';

describe('Seeding Integrity', () => {
    it('ensures exactly 20 distinct exercises are seeded', () => {
        expect(seededExercises.length).toBe(20);
        const uniqueIds = new Set(seededExercises.map(e => e.id));
        expect(uniqueIds.size).toBe(20);

        // Check coverage of all movement patterns
        const patterns = new Set(seededExercises.map(e => e.movement_pattern));
        expect(patterns.has('push')).toBeTruthy();
        expect(patterns.has('pull')).toBeTruthy();
        expect(patterns.has('squat')).toBeTruthy();
        expect(patterns.has('hinge')).toBeTruthy();
        expect(patterns.has('core')).toBeTruthy();
    });

    it('ensures every classic WOD has valid exercise references in its jsonb column', () => {
        expect(seededWorkouts.length).toBe(5);
        const exerciseIds = new Set(seededExercises.map(e => e.id));

        seededWorkouts.forEach(wod => {
            wod.default_movements.forEach((movement: any) => {
                expect(movement.exercise_id).toBeDefined();
                // The referenced exercise must exist in the seeded 'exercises' table
                expect(exerciseIds.has(movement.exercise_id)).toBeTruthy();
            });
        });
    });
});
