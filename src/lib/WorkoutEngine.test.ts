import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkoutEngine } from './WorkoutEngine';
import { supabase } from './supabase';

// Mock Supabase client
vi.mock('./supabase', () => ({
    supabase: {
        from: vi.fn()
    }
}));

describe('WorkoutEngine - Phase 1 & 2', () => {
    let engine: WorkoutEngine;

    beforeEach(() => {
        engine = new WorkoutEngine();
        vi.resetAllMocks();
    });

    it('Phase 1: correctly filters out a workout if a required piece of equipment is missing', async () => {
        const mockExercises = [
            { id: '1', name: 'Air Squat', equipment_required: [] },
            { id: '2', name: 'Pull Up', equipment_required: ['Pull Up Bar'] },
            { id: '3', name: 'Thruster', equipment_required: ['Barbell', 'Weights'] }
        ];

        const mockWorkouts = [
            {
                id: 'w1', name: 'Murph Lite', type: 'For Time',
                default_movements: [{ exercise_id: '1', reps: 100 }, { exercise_id: '2', reps: 50 }]
            },
            {
                id: 'w2', name: 'Fran', type: 'For Time',
                default_movements: [{ exercise_id: '3', reps: 21 }, { exercise_id: '2', reps: 21 }]
            }
        ];

        // Setup the mocked supabase client
        (supabase.from as any).mockImplementation((table: string) => ({
            select: vi.fn().mockResolvedValue(
                table === 'exercises' ? { data: mockExercises, error: null } : { data: mockWorkouts, error: null }
            )
        }));

        // User only has a Pull Up Bar, NO Barbell/Weights
        const availableEquipment = ['Pull Up Bar'];

        const matchedWODs = await engine.getMatchedWODs(availableEquipment);

        // "Murph Lite" requires Air Squat (no eq) and Pull Up (Pull Up Bar). -> Valid
        // "Fran" requires Thruster (Barbell, Weights) and Pull Up. -> Invalid because no Barbell
        expect(matchedWODs).toHaveLength(1);
        expect(matchedWODs[0].name).toBe('Murph Lite');
    });

    it('Phase 2: generateTimeBlock creates a proper structure based on duration', () => {
        const amrapBlock = engine.generateTimeBlock(10);
        expect(amrapBlock.durationMinutes).toBe(10);
        expect(amrapBlock.type).toBe('AMRAP');
        expect(amrapBlock.movements).toEqual([]);

        const emomBlock = engine.generateTimeBlock(15);
        expect(emomBlock.type).toBe('EMOM');

        const ftBlock = engine.generateTimeBlock(30);
        expect(ftBlock.type).toBe('For Time');
    });

    it('Phase 3: test_smart_distribution ensures 1 push, 1 pull, 1 squat/hinge', async () => {
        const mockExercises = [
            { id: '1', name: 'Air Squat', movement_pattern: 'squat', equipment_required: [] },
            { id: '2', name: 'Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'] },
            { id: '3', name: 'Push Up', movement_pattern: 'push', equipment_required: [] },
            { id: '4', name: 'Deadlift', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'] }
        ];

        (supabase.from as any).mockImplementation(() => ({
            select: vi.fn().mockResolvedValue({ data: mockExercises, error: null })
        }));

        // Filter missing barbell, so we only have Air Squat (squat), Pull Up (pull), and Push Up (push).
        const availableEquipment = ['Pull Up Bar'];

        const smartWorkout = await engine.generateSmartWorkout(15, availableEquipment);

        expect(smartWorkout.movements.length).toBe(3);

        // Verify exactly one push, one pull, and one squat/hinge based on what was selected
        const exerciseIds = smartWorkout.movements.map(m => m.exercise_id);
        const selectedExercises = mockExercises.filter(e => exerciseIds.includes(e.id));

        expect(selectedExercises.find(e => e.movement_pattern === 'push')).toBeDefined();
        expect(selectedExercises.find(e => e.movement_pattern === 'pull')).toBeDefined();
        expect(selectedExercises.find(e => e.movement_pattern === 'squat' || e.movement_pattern === 'hinge')).toBeDefined();

        // Ensure the deadlift was not picked because no barbell
        expect(selectedExercises.find(e => e.name === 'Deadlift')).toBeUndefined();
    });

    it('Filter Relaxation: gets closest matches and displays missing equipment', async () => {
        const mockExercises = [
            { id: '1', name: 'Pull Up', equipment_required: ['Pull Up Bar'] },
            { id: '2', name: 'Thruster', equipment_required: ['Barbell', 'Weights'] }
        ];

        const mockWorkouts = [
            {
                id: 'w1', name: 'Fran', type: 'For Time',
                default_movements: [{ exercise_id: '1', reps: 21 }, { exercise_id: '2', reps: 21 }]
            }
        ];

        (supabase.from as any).mockImplementation((table: string) => ({
            select: vi.fn().mockResolvedValue(
                table === 'exercises' ? { data: mockExercises, error: null } : { data: mockWorkouts, error: null }
            )
        }));

        const availableEquipment = ['Pull Up Bar']; // Missing Barbell and Weights
        const closestMatches = await engine.getClosestMatchedWODs(availableEquipment);

        expect(closestMatches.length).toBe(1);
        expect(closestMatches[0].wod.name).toBe('Fran');
        expect(closestMatches[0].missingEquipment).toContain('Barbell');
        expect(closestMatches[0].missingEquipment).toContain('Weights');
    });

    it('Rep-Volume Scaling: scales reps properly based on equipment substituted', () => {
        // Barbell to Dumbbell (+20%)
        expect(engine.scaleRepVolume(10, 'Barbell', 'Dumbbell')).toBe(12);

        // Dumbbell to None (+50%)
        expect(engine.scaleRepVolume(10, 'Dumbbell', 'None')).toBe(15);

        // Complex rep string scaling (21-15-9 Barbell to Dumbbell)
        // 21 * 1.2 = 25.2 -> 25
        // 15 * 1.2 = 18
        // 9 * 1.2 = 10.8 -> 11
        expect(engine.scaleRepVolume('21-15-9', 'Barbell', 'Dumbbell')).toBe('25-18-11');
    });
});
