import { supabase } from './supabase';
import { seededExercises, seededWorkouts } from '../../scripts/seed';

export interface Exercise {
    id: string;
    name: string;
    movement_pattern: 'push' | 'pull' | 'squat' | 'hinge' | 'core';
    equipment_required: string[];
    base_difficulty: number;
}

export interface WODMovement {
    exercise_id: string;
    reps: number | string;
}

export interface Workout {
    id: string;
    name: string;
    type: 'AMRAP' | 'For Time' | 'EMOM';
    default_movements: WODMovement[];
}

export interface GeneratedTimeBlock {
    durationMinutes: number;
    type: 'AMRAP' | 'EMOM' | 'For Time';
    movements: any[];
}

export class WorkoutEngine {
    constructor() { }

    /**
     * Phase 1 (Classic WOD Matcher): Takes 'availableEquipment' and returns classic WODs
     * from the DB that the user can perform.
     */
    async getMatchedWODs(availableEquipment: string[]): Promise<Workout[]> {
        let exercisesData = null;
        let workoutsData = null;

        try {
            const { data, error } = await supabase.from('exercises').select('*');
            if (error) throw error;
            exercisesData = data;
        } catch (e) {
            console.warn('Falling back to seeded exercises data due to fetch error:', e);
            exercisesData = seededExercises;
        }

        // Filter to valid exercises
        const validExercises = (exercisesData as Exercise[]).filter((ex: any) => {
            if (ex.equipment_required.length === 0) return true;
            return ex.equipment_required.every(eq => availableEquipment.includes(eq));
        });

        const validExerciseIds = new Set(validExercises.map(e => e.id));

        // 2. Fetch all classic workouts
        try {
            const { data, error } = await supabase.from('workouts').select('*');
            if (error) throw error;
            workoutsData = data;
        } catch (e) {
            console.warn('Falling back to seeded workouts data due to fetch error:', e);
            workoutsData = seededWorkouts;
        }

        // 3. Filter WODs where all movements refer to a valid exercise
        return (workoutsData as Workout[]).filter((wod: any) => {
            // Check if every movement's exercise is in the valid set
            return wod.default_movements.every(m => validExerciseIds.has(m.exercise_id));
        });
    }

    /**
     * Phase 2 (Template Stacker): Takes a 'duration' (minutes) and creates a
     * workout structure (e.g., a 10-minute AMRAP template).
     */
    generateTimeBlock(durationMinutes: number): GeneratedTimeBlock {
        let type: 'AMRAP' | 'EMOM' | 'For Time' = 'AMRAP';

        if (durationMinutes <= 10) {
            type = 'AMRAP';
        } else if (durationMinutes <= 20) {
            type = 'EMOM';
        } else {
            type = 'For Time';
        }

        return {
            durationMinutes,
            type,
            movements: []
        };
    }

    /**
     * Phase 3 (Balanced Movement Rule): Ensures distribution of movement patterns
     * (e.g., one Push, one Pull, and one Squat/Hinge).
     */
    async generateSmartWorkout(durationMinutes: number, availableEquipment: string[]): Promise<GeneratedTimeBlock> {
        const timeBlock = this.generateTimeBlock(durationMinutes);

        // Fetch valid exercises based on available equipment
        let exercisesData = null;
        try {
            const { data, error } = await supabase.from('exercises').select('*');
            if (error) throw error;
            exercisesData = data;
        } catch (e) {
            console.warn('Falling back to seeded exercises data due to fetch error:', e);
            exercisesData = seededExercises;
        }

        const validExercises = (exercisesData as Exercise[]).filter((ex: any) => {
            if (ex.equipment_required.length === 0) return true;
            return ex.equipment_required.every(eq => availableEquipment.includes(eq));
        });

        // We want a 3-movement workout with distribution: 1 pull, 1 push, 1 squat/hinge
        const pullMovements = validExercises.filter(e => e.movement_pattern === 'pull');
        const pushMovements = validExercises.filter(e => e.movement_pattern === 'push');
        const squatHingeMovements = validExercises.filter(e => e.movement_pattern === 'squat' || e.movement_pattern === 'hinge');

        // Pick 1 random from each category (or use the first one if doing randomly is overkill for simple matching)
        // Here we just pick the first match for simplicity
        const selectedMovements: Exercise[] = [];

        if (pullMovements.length > 0) selectedMovements.push(pullMovements[0]);
        if (pushMovements.length > 0) selectedMovements.push(pushMovements[0]);
        if (squatHingeMovements.length > 0) selectedMovements.push(squatHingeMovements[0]);

        timeBlock.movements = selectedMovements.map(ex => ({
            exercise_id: ex.id,
            reps: ex.base_difficulty * 5 // Just an arbitrary logic for generated reps
        }));

        return timeBlock;
    }

    /**
     * Phase 3 (Filter Relaxation): If no classic WOD matches, 
     * find the closest match and display the missing equipment.
     */
    async getClosestMatchedWODs(availableEquipment: string[]): Promise<Array<{ wod: Workout, missingEquipment: string[] }>> {
        let exercisesData = null;
        let workoutsData = null;

        try {
            const { data, error } = await supabase.from('exercises').select('*');
            if (error) throw error;
            exercisesData = data;
        } catch (e) {
            console.warn('Falling back to seeded exercises data due to fetch error:', e);
            exercisesData = seededExercises;
        }

        try {
            const { data, error } = await supabase.from('workouts').select('*');
            if (error) throw error;
            workoutsData = data;
        } catch (e) {
            console.warn('Falling back to seeded workouts data due to fetch error:', e);
            workoutsData = seededWorkouts;
        }

        const exerciseMap = new Map((exercisesData as Exercise[]).map((e: any) => [e.id, e]));

        const results: Array<{ wod: Workout, missingEquipment: string[] }> = [];

        (workoutsData as Workout[]).forEach((wod: any) => {
            const missingEquipmentForWod = new Set<string>();

            wod.default_movements.forEach(m => {
                const ex = exerciseMap.get(m.exercise_id);
                if (ex) {
                    ex.equipment_required.forEach(eq => {
                        if (!availableEquipment.includes(eq)) {
                            missingEquipmentForWod.add(eq);
                        }
                    });
                }
            });

            if (missingEquipmentForWod.size > 0 && missingEquipmentForWod.size <= 2) {
                results.push({
                    wod,
                    missingEquipment: Array.from(missingEquipmentForWod)
                });
            }
        });

        // Sort by the least missing equipment
        return results.sort((a, b) => a.missingEquipment.length - b.missingEquipment.length);
    }

    /**
     * Rep-Volume Scaling utility: if substituting barbell for lighter dumbbell,
     * increase prescribed reps by 20%. Round to nearest integer.
     */
    scaleRepVolume(reps: number | string, originalEquipment: string, substitutedEquipment: string): number | string {
        if (typeof reps === 'string') {
            // Check if it's a rep scheme like 21-15-9
            if (reps.includes('-')) {
                return reps.split('-').map(r => this.scaleRepVolume(parseInt(r, 10), originalEquipment, substitutedEquipment)).join('-');
            }
            return reps; // if it's something complex, leave as is
        }

        // Example scaling logic based on weight classes
        // Barbell -> Dumbbell = +20%
        if (originalEquipment === 'Barbell' && substitutedEquipment === 'Dumbbell') {
            return Math.round(reps * 1.2);
        }

        // Dumbbell -> No Equipment = +50%
        if (originalEquipment === 'Dumbbell' && substitutedEquipment === 'None') {
            return Math.round(reps * 1.5);
        }

        return reps;
    }
}
