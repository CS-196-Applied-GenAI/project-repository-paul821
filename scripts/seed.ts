import { supabase } from '../src/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Since we may not have a live database, we will export the seeded data structures
// so that our tests (and potentially app) can use them.

export const seededExercises = [
    { id: uuidv4(), name: 'Push Up', movement_pattern: 'push', equipment_required: [], base_difficulty: 1 },
    { id: uuidv4(), name: 'Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Air Squat', movement_pattern: 'squat', equipment_required: [], base_difficulty: 1 },
    { id: uuidv4(), name: 'Deadlift', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 3 },
    { id: uuidv4(), name: 'Sit Up', movement_pattern: 'core', equipment_required: [], base_difficulty: 1 },
    { id: uuidv4(), name: 'Dumbbell Snatch', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Thruster', movement_pattern: 'squat', equipment_required: ['Barbell', 'Weights'], base_difficulty: 4 },
    { id: uuidv4(), name: 'Kettlebell Swing', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Burpee', movement_pattern: 'push', equipment_required: [], base_difficulty: 3 },
    { id: uuidv4(), name: 'Box Jump', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Wall Ball', movement_pattern: 'squat', equipment_required: ['Medicine Ball', 'Wall'], base_difficulty: 3 },
    { id: uuidv4(), name: 'Toes to Bar', movement_pattern: 'core', equipment_required: ['Pull Up Bar'], base_difficulty: 3 },
    { id: uuidv4(), name: 'Ring Dip', movement_pattern: 'push', equipment_required: ['Rings'], base_difficulty: 4 },
    { id: uuidv4(), name: 'Double Under', movement_pattern: 'core', equipment_required: ['Jump Rope'], base_difficulty: 3 },
    { id: uuidv4(), name: 'Clean', movement_pattern: 'hinge', equipment_required: ['Barbell', 'Weights'], base_difficulty: 4 },
    { id: uuidv4(), name: 'Jerk', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 4 },
    { id: uuidv4(), name: 'Row', movement_pattern: 'pull', equipment_required: ['Rower'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Strict Press', movement_pattern: 'push', equipment_required: ['Barbell', 'Weights'], base_difficulty: 2 },
    { id: uuidv4(), name: 'Lunge', movement_pattern: 'squat', equipment_required: [], base_difficulty: 2 },
    { id: uuidv4(), name: 'Plank', movement_pattern: 'core', equipment_required: [], base_difficulty: 1 }
];

export const seededWorkouts = [
    {
        id: uuidv4(),
        name: 'Cindy',
        type: 'AMRAP',
        duration: 20,
        default_movements: [
            { exercise_id: seededExercises.find(e => e.name === 'Pull Up')?.id, reps: 5 },
            { exercise_id: seededExercises.find(e => e.name === 'Push Up')?.id, reps: 10 },
            { exercise_id: seededExercises.find(e => e.name === 'Air Squat')?.id, reps: 15 }
        ]
    },
    {
        id: uuidv4(),
        name: 'Fran',
        type: 'For Time',
        default_movements: [
            { exercise_id: seededExercises.find(e => e.name === 'Thruster')?.id, reps: '21-15-9' },
            { exercise_id: seededExercises.find(e => e.name === 'Pull Up')?.id, reps: '21-15-9' }
        ]
    },
    {
        id: uuidv4(),
        name: 'Helen',
        type: 'For Time',
        default_movements: [
            { exercise_id: seededExercises.find(e => e.name === 'Kettlebell Swing')?.id, reps: 21 },
            { exercise_id: seededExercises.find(e => e.name === 'Pull Up')?.id, reps: 12 }
        ]
    },
    {
        id: uuidv4(),
        name: 'Diane',
        type: 'For Time',
        default_movements: [
            { exercise_id: seededExercises.find(e => e.name === 'Deadlift')?.id, reps: '21-15-9' },
            { exercise_id: seededExercises.find(e => e.name === 'Push Up')?.id, reps: '21-15-9' } // Modified HSPU to Push up for standard
        ]
    },
    {
        id: uuidv4(),
        name: 'Annie',
        type: 'For Time',
        default_movements: [
            { exercise_id: seededExercises.find(e => e.name === 'Double Under')?.id, reps: '50-40-30-20-10' },
            { exercise_id: seededExercises.find(e => e.name === 'Sit Up')?.id, reps: '50-40-30-20-10' }
        ]
    }
];

export async function runSeed() {
    console.log('Seeding Exercises...');
    const { error: exercisesErr } = await supabase.from('exercises').insert(seededExercises);
    if (exercisesErr) console.error('Error inserting exercises:', exercisesErr);

    console.log('Seeding Workouts...');
    const { error: workoutsErr } = await supabase.from('workouts').insert(seededWorkouts);
    if (workoutsErr) console.error('Error inserting workouts:', workoutsErr);

    console.log('Seed process complete.');
}

if (typeof require !== 'undefined' && require.main === module) {
    runSeed();
}
