import { createClient } from '@supabase/supabase-js'
import { v5 as uuidv5 } from 'uuid'

// Deterministic UUID namespaces — same name always produces same UUID
const EXERCISE_NS = '7c9e6679-7425-40de-944b-e07fc1f90ae7'
const WORKOUT_NS  = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
const exUUID = (name: string) => uuidv5(name, EXERCISE_NS)
const wodUUID = (name: string) => uuidv5(name, WORKOUT_NS)

// Use service_role key for admin seed operations (bypasses RLS)
// Falls back to anon key for read-only checks
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://iifumpbvwqlhqndknaoq.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tSPCRC26S3PQLwYBQ2DeNQ_W-Uq8Kwj'

const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey)

// ─── Type Definitions ───────────────────────────────────────────────────────

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

// ─── Exercise Definitions ───────────────────────────────────────────────────
// 92 exercises covering all 5 movement patterns, sourced from real CrossFit programming
// Equipment types: Pull Up Bar, Barbell, Weights, Dumbbell, Kettlebell,
//                  Medicine Ball, Plyo Box, Jump Rope, Rings, Rower, Rope

export const seededExercises: SeedExercise[] = [
  // ── PUSH movements (17) ──────────────────────────────────────────────────
  { id: exUUID('Push Up'), name: 'Push Up', movement_pattern: 'push', equipment_required: [], base_difficulty: 3 },
  { id: exUUID('Burpee'), name: 'Burpee', movement_pattern: 'push', equipment_required: [], base_difficulty: 5 },
  { id: exUUID('Handstand Push Up'), name: 'Handstand Push Up', movement_pattern: 'push', equipment_required: [], base_difficulty: 8 },
  { id: exUUID('Strict Press'), name: 'Strict Press', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 5 },
  { id: exUUID('Push Press'), name: 'Push Press', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 6 },
  { id: exUUID('Push Jerk'), name: 'Push Jerk', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 7 },
  { id: exUUID('Thruster'), name: 'Thruster', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('Ring Dip'), name: 'Ring Dip', movement_pattern: 'push', equipment_required: ['Rings'], base_difficulty: 7 },
  { id: exUUID('DB Push Press'), name: 'DB Push Press', movement_pattern: 'push', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: exUUID('DB Thruster'), name: 'DB Thruster', movement_pattern: 'push', equipment_required: ['Dumbbell'], base_difficulty: 6 },
  { id: exUUID('KB Push Press'), name: 'KB Push Press', movement_pattern: 'push', equipment_required: ['Kettlebell'], base_difficulty: 5 },
  { id: exUUID('Wall Walk'), name: 'Wall Walk', movement_pattern: 'push', equipment_required: [], base_difficulty: 7 },
  { id: exUUID('Bench Press'), name: 'Bench Press', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 5 },
  { id: exUUID('Ring Push Up'), name: 'Ring Push Up', movement_pattern: 'push', equipment_required: ['Rings'], base_difficulty: 5 },
  { id: exUUID('KB Thruster'), name: 'KB Thruster', movement_pattern: 'push', equipment_required: ['Kettlebell'], base_difficulty: 6 },
  { id: exUUID('Burpee Box Jump Over'), name: 'Burpee Box Jump Over', movement_pattern: 'push', equipment_required: ['Plyo Box'], base_difficulty: 6 },
  { id: exUUID('Shoulder to Overhead'), name: 'Shoulder to Overhead', movement_pattern: 'push', equipment_required: ['Barbell'], base_difficulty: 7 },

  // ── PULL movements (15) ──────────────────────────────────────────────────
  { id: exUUID('Pull Up'), name: 'Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 5 },
  { id: exUUID('Chest to Bar Pull Up'), name: 'Chest to Bar Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 7 },
  { id: exUUID('Bar Muscle Up'), name: 'Bar Muscle Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 9 },
  { id: exUUID('Ring Muscle Up'), name: 'Ring Muscle Up', movement_pattern: 'pull', equipment_required: ['Rings'], base_difficulty: 9 },
  { id: exUUID('Ring Row'), name: 'Ring Row', movement_pattern: 'pull', equipment_required: ['Rings'], base_difficulty: 3 },
  { id: exUUID('DB Renegade Row'), name: 'DB Renegade Row', movement_pattern: 'pull', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: exUUID('Barbell Row'), name: 'Barbell Row', movement_pattern: 'pull', equipment_required: ['Barbell'], base_difficulty: 5 },
  { id: exUUID('Rope Climb'), name: 'Rope Climb', movement_pattern: 'pull', equipment_required: ['Rope'], base_difficulty: 7 },
  { id: exUUID('Rowing'), name: 'Rowing', movement_pattern: 'pull', equipment_required: ['Rower'], base_difficulty: 4 },
  { id: exUUID('Sumo Deadlift High Pull'), name: 'Sumo Deadlift High Pull', movement_pattern: 'pull', equipment_required: ['Barbell'], base_difficulty: 6 },
  { id: exUUID('Jumping Pull Up'), name: 'Jumping Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 3 },
  { id: exUUID('Strict Pull Up'), name: 'Strict Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 6 },
  { id: exUUID('L-Pull Up'), name: 'L-Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 8 },
  { id: exUUID('Calorie Row'), name: 'Calorie Row', movement_pattern: 'pull', equipment_required: ['Rower'], base_difficulty: 4 },
  { id: exUUID('Burpee Pull Up'), name: 'Burpee Pull Up', movement_pattern: 'pull', equipment_required: ['Pull Up Bar'], base_difficulty: 7 },

  // ── SQUAT movements (18) ─────────────────────────────────────────────────
  { id: exUUID('Air Squat'), name: 'Air Squat', movement_pattern: 'squat', equipment_required: [], base_difficulty: 2 },
  { id: exUUID('Back Squat'), name: 'Back Squat', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 6 },
  { id: exUUID('Front Squat'), name: 'Front Squat', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 7 },
  { id: exUUID('Overhead Squat'), name: 'Overhead Squat', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('Pistol Squat'), name: 'Pistol Squat', movement_pattern: 'squat', equipment_required: [], base_difficulty: 8 },
  { id: exUUID('Box Jump'), name: 'Box Jump', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 4 },
  { id: exUUID('Wall Ball'), name: 'Wall Ball', movement_pattern: 'squat', equipment_required: ['Medicine Ball'], base_difficulty: 5 },
  { id: exUUID('Goblet Squat'), name: 'Goblet Squat', movement_pattern: 'squat', equipment_required: ['Kettlebell'], base_difficulty: 4 },
  { id: exUUID('DB Front Rack Lunge'), name: 'DB Front Rack Lunge', movement_pattern: 'squat', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: exUUID('Lunge'), name: 'Lunge', movement_pattern: 'squat', equipment_required: [], base_difficulty: 3 },
  { id: exUUID('Step Up'), name: 'Step Up', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 3 },
  { id: exUUID('Squat Clean'), name: 'Squat Clean', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('Squat Snatch'), name: 'Squat Snatch', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 9 },
  { id: exUUID('DB Squat Clean'), name: 'DB Squat Clean', movement_pattern: 'squat', equipment_required: ['Dumbbell'], base_difficulty: 6 },
  { id: exUUID('Overhead Walking Lunge'), name: 'Overhead Walking Lunge', movement_pattern: 'squat', equipment_required: ['Barbell'], base_difficulty: 6 },
  // New squat exercises
  { id: exUUID('Walking Lunge'), name: 'Walking Lunge', movement_pattern: 'squat', equipment_required: [], base_difficulty: 3 },
  { id: exUUID('DB Walking Lunge'), name: 'DB Walking Lunge', movement_pattern: 'squat', equipment_required: ['Dumbbell'], base_difficulty: 4 },
  { id: exUUID('Box Step Up'), name: 'Box Step Up', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 2 },

  // ── HINGE movements (15) ─────────────────────────────────────────────────
  { id: exUUID('Deadlift'), name: 'Deadlift', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 6 },
  { id: exUUID('Clean'), name: 'Clean', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('Power Clean'), name: 'Power Clean', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 7 },
  { id: exUUID('Snatch'), name: 'Snatch', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 9 },
  { id: exUUID('Power Snatch'), name: 'Power Snatch', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('KB Swing'), name: 'KB Swing', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 4 },
  { id: exUUID('KB Snatch'), name: 'KB Snatch', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 6 },
  { id: exUUID('KB Clean'), name: 'KB Clean', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 5 },
  { id: exUUID('DB Snatch'), name: 'DB Snatch', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 5 },
  { id: exUUID('DB Clean and Jerk'), name: 'DB Clean and Jerk', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 6 },
  { id: exUUID('Clean and Jerk'), name: 'Clean and Jerk', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 8 },
  { id: exUUID('Hang Power Clean'), name: 'Hang Power Clean', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 7 },
  { id: exUUID('Hang Power Snatch'), name: 'Hang Power Snatch', movement_pattern: 'hinge', equipment_required: ['Barbell'], base_difficulty: 7 },
  { id: exUUID('DB Hang Clean to Overhead'), name: 'DB Hang Clean to Overhead', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 6 },
  { id: exUUID('DB Deadlift'), name: 'DB Deadlift', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 4 },
  { id: exUUID('DB Hang Clean'), name: 'DB Hang Clean', movement_pattern: 'hinge', equipment_required: ['Dumbbell'], base_difficulty: 5 },

  // ── CORE movements (15) ──────────────────────────────────────────────────
  { id: exUUID('Sit Up'), name: 'Sit Up', movement_pattern: 'core', equipment_required: [], base_difficulty: 2 },
  { id: exUUID('Toes to Bar'), name: 'Toes to Bar', movement_pattern: 'core', equipment_required: ['Pull Up Bar'], base_difficulty: 6 },
  { id: exUUID('V-Up'), name: 'V-Up', movement_pattern: 'core', equipment_required: [], base_difficulty: 4 },
  { id: exUUID('Hollow Hold'), name: 'Hollow Hold', movement_pattern: 'core', equipment_required: [], base_difficulty: 4 },
  { id: exUUID('Plank'), name: 'Plank', movement_pattern: 'core', equipment_required: [], base_difficulty: 2 },
  { id: exUUID('L-Sit'), name: 'L-Sit', movement_pattern: 'core', equipment_required: [], base_difficulty: 7 },
  { id: exUUID('Double Under'), name: 'Double Under', movement_pattern: 'core', equipment_required: ['Jump Rope'], base_difficulty: 5 },
  { id: exUUID('Single Under'), name: 'Single Under', movement_pattern: 'core', equipment_required: ['Jump Rope'], base_difficulty: 2 },
  { id: exUUID('Medicine Ball Clean'), name: 'Medicine Ball Clean', movement_pattern: 'core', equipment_required: ['Medicine Ball'], base_difficulty: 4 },
  { id: exUUID('Turkish Get Up'), name: 'Turkish Get Up', movement_pattern: 'core', equipment_required: ['Kettlebell'], base_difficulty: 7 },
  { id: exUUID('Russian Twist'), name: 'Russian Twist', movement_pattern: 'core', equipment_required: [], base_difficulty: 3 },
  { id: exUUID('Running'), name: 'Running', movement_pattern: 'core', equipment_required: [], base_difficulty: 2 },
  { id: exUUID('Knees to Elbows'), name: 'Knees to Elbows', movement_pattern: 'core', equipment_required: ['Pull Up Bar'], base_difficulty: 5 },
  { id: exUUID('Weighted Sit Up'), name: 'Weighted Sit Up', movement_pattern: 'core', equipment_required: ['Plate'], base_difficulty: 3 },

  // ── Additional exercises for equipment coverage ─────────────────────────────
  { id: exUUID('Plate Ground to Overhead'), name: 'Plate Ground to Overhead', movement_pattern: 'push', equipment_required: ['Plate'], base_difficulty: 4 },
  { id: exUUID('Overhead Plate Lunge'), name: 'Overhead Plate Lunge', movement_pattern: 'squat', equipment_required: ['Plate'], base_difficulty: 4 },
  // Medicine Ball additions
  { id: exUUID('Med Ball Slam'), name: 'Med Ball Slam', movement_pattern: 'hinge', equipment_required: ['Medicine Ball'], base_difficulty: 4 },
  { id: exUUID('Med Ball Sit Up'), name: 'Med Ball Sit Up', movement_pattern: 'core', equipment_required: ['Medicine Ball'], base_difficulty: 3 },
  { id: exUUID('Med Ball Overhead Lunge'), name: 'Med Ball Overhead Lunge', movement_pattern: 'squat', equipment_required: ['Medicine Ball'], base_difficulty: 4 },
  // Plyo Box additions
  { id: exUUID('Box Jump Over'), name: 'Box Jump Over', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 5 },
  { id: exUUID('Lateral Box Jump'), name: 'Lateral Box Jump', movement_pattern: 'squat', equipment_required: ['Plyo Box'], base_difficulty: 5 },
  { id: exUUID('Box Dip'), name: 'Box Dip', movement_pattern: 'push', equipment_required: ['Plyo Box'], base_difficulty: 3 },
  // Kettlebell additions
  { id: exUUID('KB Overhead Squat'), name: 'KB Overhead Squat', movement_pattern: 'squat', equipment_required: ['Kettlebell'], base_difficulty: 6 },
  { id: exUUID('KB Deadlift'), name: 'KB Deadlift', movement_pattern: 'hinge', equipment_required: ['Kettlebell'], base_difficulty: 3 },
  { id: exUUID('KB Overhead Lunge'), name: 'KB Overhead Lunge', movement_pattern: 'squat', equipment_required: ['Kettlebell'], base_difficulty: 5 },
  { id: exUUID('KB Row'), name: 'KB Row', movement_pattern: 'pull', equipment_required: ['Kettlebell'], base_difficulty: 4 },
]

// Helper to find exercise ID by name — uses deterministic UUID directly
function exId(name: string): string {
  // Verify the exercise exists in our definitions
  const exercise = seededExercises.find(e => e.name === name)
  if (!exercise) throw new Error(`Exercise not found: ${name}`)
  return exUUID(name)
}

// ─── WOD Definitions ────────────────────────────────────────────────────────
// 230 workouts sourced from: crossfit.com, CrossFit Games/Open archives,
// WODwell.com, r/crossfit compilations, and community programming
//
// Categories: Girls (22), Heroes (17), Open (6), Other Benchmarks (6), Community (6),
//             Single-Equipment (10), Expanded Bodyweight (6+21), Expanded Pull Up Bar (4+16),
//             Expanded Dumbbell (6+18), Weights/Plate (4), Expanded Kettlebell (+26),
//             Expanded Barbell+Weights (+21), Expanded Medicine Ball (+13),
//             Expanded Plyo Box (+14), Expanded Jump Rope (+14)

export const seededWorkouts: SeedWorkout[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GIRLS WODs — The original CrossFit benchmark workouts (est. 2003)
  // Source: crossfit.com/essentials/crossfit-15-benchmarks, WODwell.com
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Cindy — AMRAP 20 min bodyweight triplet
  {
    id: wodUUID('Cindy'),
    name: 'Cindy',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 5 },
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
    ],
  },
  // Fran — The most iconic CrossFit couplet
  {
    id: wodUUID('Fran'),
    name: 'Fran',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Thruster'), reps: '21-15-9' },
      { exercise_id: exId('Pull Up'), reps: '21-15-9' },
    ],
  },
  // Helen — 3 rounds: run, KB swings, pull-ups
  {
    id: wodUUID('Helen'),
    name: 'Helen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('KB Swing'), reps: 21 },
      { exercise_id: exId('Pull Up'), reps: 12 },
    ],
  },
  // Diane — Heavy deadlifts + HSPU
  {
    id: wodUUID('Diane'),
    name: 'Diane',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: '21-15-9' },
      { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
    ],
  },
  // Annie — Double-unders + sit-ups descending ladder
  {
    id: wodUUID('Annie'),
    name: 'Annie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Double Under'), reps: '50-40-30-20-10' },
      { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
    ],
  },
  // Grace — 30 clean and jerks for time (135/95 lb)
  {
    id: wodUUID('Grace'),
    name: 'Grace',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Clean and Jerk'), reps: 30 },
    ],
  },
  // Isabel — 30 snatches for time (135/95 lb)
  {
    id: wodUUID('Isabel'),
    name: 'Isabel',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Snatch'), reps: 30 },
    ],
  },
  // Jackie — Row/thruster/pull-up sprint
  {
    id: wodUUID('Jackie'),
    name: 'Jackie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Rowing'), reps: 1000 },
      { exercise_id: exId('Thruster'), reps: 50 },
      { exercise_id: exId('Pull Up'), reps: 30 },
    ],
  },
  // Karen — 150 wall balls for time (20/14 lb)
  {
    id: wodUUID('Karen'),
    name: 'Karen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Wall Ball'), reps: 150 },
    ],
  },
  // Mary — AMRAP 20 min: HSPU/pistols/pull-ups, high-skill bodyweight
  {
    id: wodUUID('Mary'),
    name: 'Mary',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Handstand Push Up'), reps: 5 },
      { exercise_id: exId('Pistol Squat'), reps: 10 },
      { exercise_id: exId('Pull Up'), reps: 15 },
    ],
  },
  // Angie — 100 of everything, pure bodyweight grinder
  {
    id: wodUUID('Angie'),
    name: 'Angie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 100 },
      { exercise_id: exId('Push Up'), reps: 100 },
      { exercise_id: exId('Sit Up'), reps: 100 },
      { exercise_id: exId('Air Squat'), reps: 100 },
    ],
  },
  // Amanda — Ring muscle-ups + squat snatches, high-skill couplet (9-7-5)
  {
    id: wodUUID('Amanda'),
    name: 'Amanda',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Ring Muscle Up'), reps: '9-7-5' },
      { exercise_id: exId('Squat Snatch'), reps: '9-7-5' },
    ],
  },
  // Barbara — 5 rounds with 3 min rest: pull-ups/push-ups/sit-ups/squats
  {
    id: wodUUID('Barbara'),
    name: 'Barbara',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 20 },
      { exercise_id: exId('Push Up'), reps: 30 },
      { exercise_id: exId('Sit Up'), reps: 40 },
      { exercise_id: exId('Air Squat'), reps: 50 },
    ],
  },
  // Chelsea — EMOM 30 min: Cindy's disciplined sister
  {
    id: wodUUID('Chelsea'),
    name: 'Chelsea',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 5 },
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
    ],
  },
  // Elizabeth — Squat cleans + ring dips, heavy barbell/gymnastics combo (21-15-9)
  {
    id: wodUUID('Elizabeth'),
    name: 'Elizabeth',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Squat Clean'), reps: '21-15-9' },
      { exercise_id: exId('Ring Dip'), reps: '21-15-9' },
    ],
  },
  // Eva — 5 rounds: 800m run, KB swings, pull-ups — brutal endurance test
  {
    id: wodUUID('Eva'),
    name: 'Eva',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 800 },
      { exercise_id: exId('KB Swing'), reps: 30 },
      { exercise_id: exId('Pull Up'), reps: 30 },
    ],
  },
  // Gwen — Clean & jerk touch-and-go sets (15-12-9, scored for load)
  {
    id: wodUUID('Gwen'),
    name: 'Gwen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Clean and Jerk'), reps: '15-12-9' },
    ],
  },
  // Kelly — 5 rounds: run/box jumps/wall balls, capacity tester
  {
    id: wodUUID('Kelly'),
    name: 'Kelly',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Box Jump'), reps: 30 },
      { exercise_id: exId('Wall Ball'), reps: 30 },
    ],
  },
  // Linda (Three Bars of Death) — Descending ladder of 3 barbell lifts
  {
    id: wodUUID('Linda'),
    name: 'Linda',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: '10-9-8-7-6-5-4-3-2-1' },
      { exercise_id: exId('Bench Press'), reps: '10-9-8-7-6-5-4-3-2-1' },
      { exercise_id: exId('Squat Clean'), reps: '10-9-8-7-6-5-4-3-2-1' },
    ],
  },
  // Lynne — 5 rounds: max-rep bench press (BW) + max-rep pull-ups
  {
    id: wodUUID('Lynne'),
    name: 'Lynne',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Bench Press'), reps: 'max' },
      { exercise_id: exId('Pull Up'), reps: 'max' },
    ],
  },
  // Nancy — 5 rounds: 400m run + 15 overhead squats (95/65 lb)
  {
    id: wodUUID('Nancy'),
    name: 'Nancy',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Overhead Squat'), reps: 15 },
    ],
  },
  // Nicole — AMRAP 20 min: 400m run, then max-rep pull-ups
  {
    id: wodUUID('Nicole'),
    name: 'Nicole',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Pull Up'), reps: 'max' },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HERO WODs — Honoring fallen service members & first responders
  // Source: crossfit.com/heroes, WODwell.com, fittesttravel.com
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Murph — The most iconic Hero WOD, honoring Lt. Michael Murphy
  {
    id: wodUUID('Murph'),
    name: 'Murph',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 1600 },
      { exercise_id: exId('Pull Up'), reps: 100 },
      { exercise_id: exId('Push Up'), reps: 200 },
      { exercise_id: exId('Air Squat'), reps: 300 },
      { exercise_id: exId('Running'), reps: 1600 },
    ],
  },
  // DT — 5 rounds: deadlift/hang power clean/push jerk, all at 155/105 lb
  {
    id: wodUUID('DT'),
    name: 'DT',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: 12 },
      { exercise_id: exId('Hang Power Clean'), reps: 9 },
      { exercise_id: exId('Push Jerk'), reps: 6 },
    ],
  },
  // Nate — AMRAP 20: muscle-ups, HSPU, KB swings (2 pood)
  {
    id: wodUUID('Nate'),
    name: 'Nate',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Ring Muscle Up'), reps: 2 },
      { exercise_id: exId('Handstand Push Up'), reps: 4 },
      { exercise_id: exId('KB Swing'), reps: 8 },
    ],
  },
  // Randy — 75 power snatches for time (75/55 lb)
  {
    id: wodUUID('Randy'),
    name: 'Randy',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Power Snatch'), reps: 75 },
    ],
  },
  // JT — 21-15-9 of three pressing movements
  {
    id: wodUUID('JT'),
    name: 'JT',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
      { exercise_id: exId('Ring Dip'), reps: '21-15-9' },
      { exercise_id: exId('Push Up'), reps: '21-15-9' },
    ],
  },
  // Jack — AMRAP 20: push press, KB swings, box jumps
  {
    id: wodUUID('Jack'),
    name: 'Jack',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Push Press'), reps: 10 },
      { exercise_id: exId('KB Swing'), reps: 10 },
      { exercise_id: exId('Box Jump'), reps: 10 },
    ],
  },
  // Danny — AMRAP 20: box jumps, push presses, pull-ups
  {
    id: wodUUID('Danny'),
    name: 'Danny',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Box Jump'), reps: 30 },
      { exercise_id: exId('Push Press'), reps: 20 },
      { exercise_id: exId('Pull Up'), reps: 30 },
    ],
  },
  // Badger — 3 rounds: squat cleans, pull-ups, running (95/65 lb)
  {
    id: wodUUID('Badger'),
    name: 'Badger',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Squat Clean'), reps: 30 },
      { exercise_id: exId('Pull Up'), reps: 30 },
      { exercise_id: exId('Running'), reps: 800 },
    ],
  },
  // Bradshaw — 10 rounds: HSPU, deadlifts, pull-ups, double-unders (225/155 lb)
  {
    id: wodUUID('Bradshaw'),
    name: 'Bradshaw',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Handstand Push Up'), reps: 3 },
      { exercise_id: exId('Deadlift'), reps: 6 },
      { exercise_id: exId('Pull Up'), reps: 12 },
      { exercise_id: exId('Double Under'), reps: 24 },
    ],
  },
  // Hansen — 5 rounds: KB swings (2 pood), burpees, sit-ups
  {
    id: wodUUID('Hansen'),
    name: 'Hansen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('KB Swing'), reps: 30 },
      { exercise_id: exId('Burpee'), reps: 30 },
      { exercise_id: exId('Sit Up'), reps: 30 },
    ],
  },
  // Roy — 5 rounds: deadlifts (225/155), box jumps, pull-ups
  {
    id: wodUUID('Roy'),
    name: 'Roy',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: 15 },
      { exercise_id: exId('Box Jump'), reps: 20 },
      { exercise_id: exId('Pull Up'), reps: 25 },
    ],
  },
  // The Seven — 7 rounds of 7 different movements, 7 reps each
  {
    id: wodUUID('The Seven'),
    name: 'The Seven',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Handstand Push Up'), reps: 7 },
      { exercise_id: exId('Thruster'), reps: 7 },
      { exercise_id: exId('Knees to Elbows'), reps: 7 },
      { exercise_id: exId('Deadlift'), reps: 7 },
      { exercise_id: exId('Burpee'), reps: 7 },
      { exercise_id: exId('KB Swing'), reps: 7 },
      { exercise_id: exId('Pull Up'), reps: 7 },
    ],
  },
  // Loredo — 6 rounds bodyweight hero WOD, very accessible
  {
    id: wodUUID('Loredo'),
    name: 'Loredo',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Air Squat'), reps: 24 },
      { exercise_id: exId('Push Up'), reps: 24 },
      { exercise_id: exId('Walking Lunge'), reps: 24 },
      { exercise_id: exId('Running'), reps: 400 },
    ],
  },
  // Michael — 3 rounds: run, V-ups, sit-ups
  {
    id: wodUUID('Michael'),
    name: 'Michael',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 800 },
      { exercise_id: exId('V-Up'), reps: 50 },
      { exercise_id: exId('Sit Up'), reps: 50 },
    ],
  },
  // Holleyman — 30 rounds: wall balls, HSPU, power clean (225/155 lb)
  {
    id: wodUUID('Holleyman'),
    name: 'Holleyman',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Wall Ball'), reps: 5 },
      { exercise_id: exId('Handstand Push Up'), reps: 3 },
      { exercise_id: exId('Power Clean'), reps: 1 },
    ],
  },
  // Hope — Same format as Fight Gone Bad: 3 rounds, 1 min per station
  {
    id: wodUUID('Hope'),
    name: 'Hope',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Power Snatch'), reps: 'max' },
      { exercise_id: exId('Box Jump'), reps: 'max' },
      { exercise_id: exId('Thruster'), reps: 'max' },
      { exercise_id: exId('Chest to Bar Pull Up'), reps: 'max' },
      { exercise_id: exId('Burpee'), reps: 'max' },
    ],
  },
  // McGhee — AMRAP 30 min: deadlifts (275/185), push-ups, box jumps
  {
    id: wodUUID('McGhee'),
    name: 'McGhee',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Deadlift'), reps: 5 },
      { exercise_id: exId('Push Up'), reps: 13 },
      { exercise_id: exId('Box Jump'), reps: 9 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CROSSFIT OPEN WODs — From the annual CrossFit Open competition
  // Source: games.crossfit.com/workouts/open
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Open 24.1 — DB snatches + burpees over DB, 21-15-9 (50/35 lb DB)
  {
    id: wodUUID('Open 24.1'),
    name: 'Open 24.1',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Snatch'), reps: '21-15-9' },
      { exercise_id: exId('Burpee'), reps: '21-15-9' },
    ],
  },
  // Open 24.2 — AMRAP 20: row, deadlifts (185/125), double-unders
  {
    id: wodUUID('Open 24.2'),
    name: 'Open 24.2',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Rowing'), reps: 300 },
      { exercise_id: exId('Deadlift'), reps: 10 },
      { exercise_id: exId('Double Under'), reps: 50 },
    ],
  },
  // Open 24.3 — Two parts: 5x(10 thrusters + 10 C2B), then 5x(7 thrusters + 7 BMU)
  {
    id: wodUUID('Open 24.3'),
    name: 'Open 24.3',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Thruster'), reps: '10x5' },
      { exercise_id: exId('Chest to Bar Pull Up'), reps: '10x5' },
      { exercise_id: exId('Thruster'), reps: '7x5' },
      { exercise_id: exId('Bar Muscle Up'), reps: '7x5' },
    ],
  },
  // Open 25.1 — AMRAP 15: ascending ladder burpees + DB HCTO, plus 30ft lunges
  {
    id: wodUUID('Open 25.1'),
    name: 'Open 25.1',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Burpee'), reps: '3+3/rd' },
      { exercise_id: exId('DB Hang Clean to Overhead'), reps: '3+3/rd' },
      { exercise_id: exId('Lunge'), reps: 30 },
    ],
  },
  // Open 25.2 — For Time (12 min cap): pulling progression + DU + thrusters
  {
    id: wodUUID('Open 25.2'),
    name: 'Open 25.2',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 21 },
      { exercise_id: exId('Double Under'), reps: 42 },
      { exercise_id: exId('Thruster'), reps: 21 },
      { exercise_id: exId('Chest to Bar Pull Up'), reps: 18 },
      { exercise_id: exId('Double Under'), reps: 36 },
      { exercise_id: exId('Thruster'), reps: 18 },
      { exercise_id: exId('Bar Muscle Up'), reps: 15 },
      { exercise_id: exId('Double Under'), reps: 30 },
      { exercise_id: exId('Thruster'), reps: 15 },
    ],
  },
  // Open 25.3 — For Time (20 min cap): wall walks, calorie row, barbell complex
  {
    id: wodUUID('Open 25.3'),
    name: 'Open 25.3',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Wall Walk'), reps: 5 },
      { exercise_id: exId('Calorie Row'), reps: 50 },
      { exercise_id: exId('Wall Walk'), reps: 5 },
      { exercise_id: exId('Deadlift'), reps: 25 },
      { exercise_id: exId('Wall Walk'), reps: 5 },
      { exercise_id: exId('Clean'), reps: 25 },
      { exercise_id: exId('Wall Walk'), reps: 5 },
      { exercise_id: exId('Snatch'), reps: 25 },
      { exercise_id: exId('Wall Walk'), reps: 5 },
      { exercise_id: exId('Calorie Row'), reps: 50 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // OTHER BENCHMARKS — Community staples beyond Girls & Heroes
  // Source: WODwell.com, crossfit.com, Garage Gym Revisited
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Fight Gone Bad — 3 rounds, 1 min per station, max reps (score = total reps)
  {
    id: wodUUID('Fight Gone Bad'),
    name: 'Fight Gone Bad',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Wall Ball'), reps: 'max' },
      { exercise_id: exId('Sumo Deadlift High Pull'), reps: 'max' },
      { exercise_id: exId('Box Jump'), reps: 'max' },
      { exercise_id: exId('Push Press'), reps: 'max' },
      { exercise_id: exId('Calorie Row'), reps: 'max' },
    ],
  },
  // Filthy Fifty — The ultimate chipper: 50 reps of 10 exercises
  {
    id: wodUUID('Filthy Fifty'),
    name: 'Filthy Fifty',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Box Jump'), reps: 50 },
      { exercise_id: exId('Jumping Pull Up'), reps: 50 },
      { exercise_id: exId('KB Swing'), reps: 50 },
      { exercise_id: exId('Walking Lunge'), reps: 50 },
      { exercise_id: exId('Knees to Elbows'), reps: 50 },
      { exercise_id: exId('Push Press'), reps: 50 },
      { exercise_id: exId('Sit Up'), reps: 50 },
      { exercise_id: exId('Wall Ball'), reps: 50 },
      { exercise_id: exId('Burpee'), reps: 50 },
      { exercise_id: exId('Double Under'), reps: 50 },
    ],
  },
  // Death By Pull-ups — EMOM: add 1 pull-up each minute until failure
  {
    id: wodUUID('Death By Pull-ups'),
    name: 'Death By Pull-ups',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: '+1/min' },
    ],
  },
  // Tabata Something Else — Tabata intervals (20s on/10s off) x 8 per movement
  {
    id: wodUUID('Tabata Something Else'),
    name: 'Tabata Something Else',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 'max' },
      { exercise_id: exId('Push Up'), reps: 'max' },
      { exercise_id: exId('Sit Up'), reps: 'max' },
      { exercise_id: exId('Air Squat'), reps: 'max' },
    ],
  },
  // Baseline — The classic CrossFit fitness test
  {
    id: wodUUID('Baseline'),
    name: 'Baseline',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Rowing'), reps: 500 },
      { exercise_id: exId('Air Squat'), reps: 40 },
      { exercise_id: exId('Sit Up'), reps: 30 },
      { exercise_id: exId('Push Up'), reps: 20 },
      { exercise_id: exId('Pull Up'), reps: 10 },
    ],
  },
  // Nasty Girls — 3 rounds: squats, ring muscle-ups, hang power cleans (135/95)
  {
    id: wodUUID('Nasty Girls'),
    name: 'Nasty Girls',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Air Squat'), reps: 50 },
      { exercise_id: exId('Ring Muscle Up'), reps: 7 },
      { exercise_id: exId('Hang Power Clean'), reps: 10 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // COMMUNITY / PROGRAMMING WODs — Popular WODs from CrossFit boxes worldwide
  // Source: r/crossfit, WODwell.com, BOXROX, WODprep
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Kalsu — 100 thrusters (135/95) with 5 burpees EMOM
  {
    id: wodUUID('Kalsu'),
    name: 'Kalsu',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Thruster'), reps: 100 },
      { exercise_id: exId('Burpee'), reps: 5 },
    ],
  },
  // Hotshots 19 — 6 rounds honoring the Granite Mountain Hotshots
  {
    id: wodUUID('Hotshots 19'),
    name: 'Hotshots 19',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Air Squat'), reps: 30 },
      { exercise_id: exId('Power Clean'), reps: 19 },
      { exercise_id: exId('Strict Pull Up'), reps: 7 },
      { exercise_id: exId('Running'), reps: 400 },
    ],
  },
  // Rahoi — AMRAP 12: box jumps, thrusters, burpees
  {
    id: wodUUID('Rahoi'),
    name: 'Rahoi',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Box Jump'), reps: 12 },
      { exercise_id: exId('Thruster'), reps: 6 },
      { exercise_id: exId('Burpee'), reps: 6 },
    ],
  },
  // DG — AMRAP 10: toes-to-bar, DB thrusters, DB walking lunges (35/25 lb)
  {
    id: wodUUID('DG'),
    name: 'DG',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Toes to Bar'), reps: 8 },
      { exercise_id: exId('DB Thruster'), reps: 8 },
      { exercise_id: exId('DB Walking Lunge'), reps: 12 },
    ],
  },
  // Coe — 10 rounds: thrusters (95/65) + ring push-ups
  {
    id: wodUUID('Coe'),
    name: 'Coe',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Thruster'), reps: 10 },
      { exercise_id: exId('Ring Push Up'), reps: 10 },
    ],
  },
  // Chad — 1000 box step-ups (20 in) with 20/14 lb vest
  {
    id: wodUUID('Chad'),
    name: 'Chad',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Box Step Up'), reps: 1000 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SINGLE-EQUIPMENT WODs — Fill gaps for users with limited equipment
  // These are widely-recognized variants and community staples
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── DUMBBELL-ONLY WODs ──

  // DB Fran — The classic Fran adapted for dumbbells (21-15-9)
  {
    id: wodUUID('DB Fran'),
    name: 'DB Fran',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Thruster'), reps: '21-15-9' },
      { exercise_id: exId('Burpee'), reps: '21-15-9' },
    ],
  },
  // DB Grace — 30 DB clean and jerks for time (50/35 lb)
  {
    id: wodUUID('DB Grace'),
    name: 'DB Grace',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Clean and Jerk'), reps: 30 },
    ],
  },
  // Hammer — 5 rounds AMRAP 2: DB Squat Cleans + Push Ups + Air Squats (DB + bodyweight)
  {
    id: wodUUID('Hammer'),
    name: 'Hammer',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('DB Squat Clean'), reps: 3 },
      { exercise_id: exId('Push Up'), reps: 6 },
      { exercise_id: exId('Air Squat'), reps: 9 },
    ],
  },
  // DB Man Maker — AMRAP: DB Renegade Row, DB Squat Clean, DB Push Press (full DB complex)
  {
    id: wodUUID('DB Man Maker'),
    name: 'DB Man Maker',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('DB Renegade Row'), reps: 8 },
      { exercise_id: exId('DB Squat Clean'), reps: 8 },
      { exercise_id: exId('DB Push Press'), reps: 8 },
    ],
  },

  // ── KETTLEBELL-ONLY WODs ──

  // KB Fran — Kettlebell Fran variant (21-15-9)
  {
    id: wodUUID('KB Fran'),
    name: 'KB Fran',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('KB Thruster'), reps: '21-15-9' },
      { exercise_id: exId('Burpee'), reps: '21-15-9' },
    ],
  },
  // KB Complex — For Time: swings, cleans, snatches, goblet squats (all KB)
  {
    id: wodUUID('KB Complex'),
    name: 'KB Complex',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('KB Swing'), reps: 20 },
      { exercise_id: exId('KB Clean'), reps: 15 },
      { exercise_id: exId('KB Snatch'), reps: 10 },
      { exercise_id: exId('Goblet Squat'), reps: 15 },
    ],
  },
  // Simple & Sinister — The Pavel Tsatsouline classic: swings + get-ups
  {
    id: wodUUID('Simple & Sinister'),
    name: 'Simple & Sinister',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('KB Swing'), reps: 100 },
      { exercise_id: exId('Turkish Get Up'), reps: 10 },
    ],
  },

  // ── PULL UP BAR-ONLY WODs ──

  // G.I. Jane — 100 burpee pull-ups for time, famous bodyweight benchmark
  {
    id: wodUUID('G.I. Jane'),
    name: 'G.I. Jane',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Burpee Pull Up'), reps: 100 },
    ],
  },

  // ── MEDICINE BALL-ONLY WODs ──

  // Wall Ball Cindy — Cindy variant replacing pull-ups with wall balls
  {
    id: wodUUID('Wall Ball Cindy'),
    name: 'Wall Ball Cindy',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Wall Ball'), reps: 10 },
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
    ],
  },

  // ── BODYWEIGHT-ONLY WODs ──

  // Death By Burpees — EMOM: add 1 burpee each minute until failure
  {
    id: wodUUID('Death By Burpees'),
    name: 'Death By Burpees',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Burpee'), reps: '+1/min' },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED BODYWEIGHT WODs — More variety for no-equipment training
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Invisible Fran — Bodyweight version of Fran (21-15-9)
  {
    id: wodUUID('Invisible Fran'),
    name: 'Invisible Fran',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Burpee'), reps: '21-15-9' },
      { exercise_id: exId('Air Squat'), reps: '21-15-9' },
    ],
  },
  // Prison Break — 5 rounds of burpees, squats, walking lunges
  {
    id: wodUUID('Prison Break'),
    name: 'Prison Break',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Burpee'), reps: 20 },
      { exercise_id: exId('Air Squat'), reps: 30 },
      { exercise_id: exId('Walking Lunge'), reps: 20 },
    ],
  },
  // Bodyweight Burnout — AMRAP 20 min: classic bodyweight quad
  {
    id: wodUUID('Bodyweight Burnout'),
    name: 'Bodyweight Burnout',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
      { exercise_id: exId('Sit Up'), reps: 10 },
      { exercise_id: exId('Burpee'), reps: 5 },
    ],
  },
  // Death By Push Ups — EMOM: add 1 push-up each minute until failure
  {
    id: wodUUID('Death By Push Ups'),
    name: 'Death By Push Ups',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Push Up'), reps: '+1/min' },
    ],
  },
  // The Running WOD — Run + bodyweight stations
  {
    id: wodUUID('The Running WOD'),
    name: 'The Running WOD',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Air Squat'), reps: 50 },
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Walking Lunge'), reps: 50 },
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Burpee'), reps: 50 },
    ],
  },
  // 150 Burpees — The simple but brutal benchmark
  {
    id: wodUUID('150 Burpees'),
    name: '150 Burpees',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Burpee'), reps: 150 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED PULL UP BAR WODs — More variety for bar-only training
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Death By Toes to Bar — EMOM: add 1 T2B each minute until failure
  {
    id: wodUUID('Death By Toes to Bar'),
    name: 'Death By Toes to Bar',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Toes to Bar'), reps: '+1/min' },
    ],
  },
  // Strict Cindy — Cindy with strict pull-ups (harder, slower)
  {
    id: wodUUID('Strict Cindy'),
    name: 'Strict Cindy',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Strict Pull Up'), reps: 5 },
      { exercise_id: exId('Push Up'), reps: 10 },
      { exercise_id: exId('Air Squat'), reps: 15 },
    ],
  },
  // Kipping Frenzy — 150 bar reps for time: pull-ups, T2B, K2E
  {
    id: wodUUID('Kipping Frenzy'),
    name: 'Kipping Frenzy',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Pull Up'), reps: 50 },
      { exercise_id: exId('Toes to Bar'), reps: 50 },
      { exercise_id: exId('Knees to Elbows'), reps: 50 },
    ],
  },
  // T2B Annie — Annie variant with toes-to-bar instead of double-unders
  {
    id: wodUUID('T2B Annie'),
    name: 'T2B Annie',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Toes to Bar'), reps: '50-40-30-20-10' },
      { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED DUMBBELL WODs — More variety for dumbbell-only training
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // DB DT — 5 rounds: DB deadlift, DB hang clean, DB push press
  {
    id: wodUUID('DB DT'),
    name: 'DB DT',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Deadlift'), reps: 12 },
      { exercise_id: exId('DB Hang Clean'), reps: 9 },
      { exercise_id: exId('DB Push Press'), reps: 6 },
    ],
  },
  // DB Diane — DB deadlifts + HSPU (21-15-9)
  {
    id: wodUUID('DB Diane'),
    name: 'DB Diane',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Deadlift'), reps: '21-15-9' },
      { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
    ],
  },
  // DB Helen — Run, DB snatch, burpees (3 rounds)
  {
    id: wodUUID('DB Helen'),
    name: 'DB Helen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('DB Snatch'), reps: 21 },
      { exercise_id: exId('Burpee'), reps: 12 },
    ],
  },
  // Macho Man DB — EMOM: DB squat clean + DB front rack lunge + DB push press
  {
    id: wodUUID('Macho Man DB'),
    name: 'Macho Man DB',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('DB Squat Clean'), reps: 3 },
      { exercise_id: exId('DB Front Rack Lunge'), reps: 6 },
      { exercise_id: exId('DB Push Press'), reps: 3 },
    ],
  },
  // DB Murph — Murph with dumbbells: run, rows, push-ups, lunges, run
  {
    id: wodUUID('DB Murph'),
    name: 'DB Murph',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 800 },
      { exercise_id: exId('DB Renegade Row'), reps: 50 },
      { exercise_id: exId('Push Up'), reps: 100 },
      { exercise_id: exId('DB Walking Lunge'), reps: 50 },
      { exercise_id: exId('Running'), reps: 800 },
    ],
  },
  // Devil Press WOD — DB snatch + burpee couplet (21-15-9)
  {
    id: wodUUID('Devil Press WOD'),
    name: 'Devil Press WOD',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('DB Snatch'), reps: '21-15-9' },
      { exercise_id: exId('Burpee'), reps: '21-15-9' },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // WEIGHTS (PLATE) WODs — For users with weight plates but no barbell
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Plate Grinder — 5 rounds: plate ground-to-overhead, weighted sit-ups, overhead plate lunges
  {
    id: wodUUID('Plate Grinder'),
    name: 'Plate Grinder',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Plate Ground to Overhead'), reps: 15 },
      { exercise_id: exId('Weighted Sit Up'), reps: 20 },
      { exercise_id: exId('Overhead Plate Lunge'), reps: 15 },
    ],
  },
  // Plate Burner — AMRAP: plate GTO + weighted sit-ups + overhead plate lunges
  {
    id: wodUUID('Plate Burner'),
    name: 'Plate Burner',
    type: 'AMRAP',
    default_movements: [
      { exercise_id: exId('Plate Ground to Overhead'), reps: 10 },
      { exercise_id: exId('Weighted Sit Up'), reps: 10 },
      { exercise_id: exId('Overhead Plate Lunge'), reps: 10 },
    ],
  },
  // Heavy Plate Helen — Run + plate GTO + burpees (3 rounds)
  {
    id: wodUUID('Heavy Plate Helen'),
    name: 'Heavy Plate Helen',
    type: 'For Time',
    default_movements: [
      { exercise_id: exId('Running'), reps: 400 },
      { exercise_id: exId('Plate Ground to Overhead'), reps: 21 },
      { exercise_id: exId('Burpee'), reps: 12 },
    ],
  },
  // Plate Complex — EMOM: plate GTO + overhead plate lunges + weighted sit-ups
  {
    id: wodUUID('Plate Complex'),
    name: 'Plate Complex',
    type: 'EMOM',
    default_movements: [
      { exercise_id: exId('Plate Ground to Overhead'), reps: 5 },
      { exercise_id: exId('Overhead Plate Lunge'), reps: 10 },
      { exercise_id: exId('Weighted Sit Up'), reps: 10 },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED NO EQUIPMENT / BODYWEIGHT WODs (+21, total 30)
  // Target: 30 WODs for users with zero equipment
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Hotel WOD — The classic travel/hotel room chipper
  { id: wodUUID('Hotel WOD'), name: 'Hotel WOD', type: 'For Time', default_movements: [
    { exercise_id: exId('Burpee'), reps: 50 },
    { exercise_id: exId('Push Up'), reps: 100 },
    { exercise_id: exId('Air Squat'), reps: 150 },
    { exercise_id: exId('Sit Up'), reps: 200 },
  ]},
  // Grease the Groove — EMOM bodyweight triplet
  { id: wodUUID('Grease the Groove'), name: 'Grease the Groove', type: 'EMOM', default_movements: [
    { exercise_id: exId('Burpee'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Air Squat'), reps: 15 },
  ]},
  // The Quarantine — AMRAP bodyweight + core
  { id: wodUUID('The Quarantine'), name: 'The Quarantine', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Burpee'), reps: 5 },
    { exercise_id: exId('V-Up'), reps: 10 },
    { exercise_id: exId('Air Squat'), reps: 15 },
  ]},
  // Pistol Annie — Pistol squats + sit-ups descending ladder
  { id: wodUUID('Pistol Annie'), name: 'Pistol Annie', type: 'For Time', default_movements: [
    { exercise_id: exId('Pistol Squat'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // Bodyweight DT — The DT format with bodyweight movements
  { id: wodUUID('Bodyweight DT'), name: 'Bodyweight DT', type: 'For Time', default_movements: [
    { exercise_id: exId('Burpee'), reps: 12 },
    { exercise_id: exId('Walking Lunge'), reps: 9 },
    { exercise_id: exId('Handstand Push Up'), reps: 6 },
  ]},
  // The Mile — Run + bodyweight station chipper
  { id: wodUUID('The Mile'), name: 'The Mile', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Push Up'), reps: 40 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Air Squat'), reps: 40 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Sit Up'), reps: 40 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Burpee'), reps: 40 },
  ]},
  // Deck of Cards — AMRAP simple bodyweight quad
  { id: wodUUID('Deck of Cards'), name: 'Deck of Cards', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Air Squat'), reps: 10 },
    { exercise_id: exId('Sit Up'), reps: 10 },
    { exercise_id: exId('Lunge'), reps: 10 },
  ]},
  // Core Chipper — Descending core + lower body grinder
  { id: wodUUID('Core Chipper'), name: 'Core Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Sit Up'), reps: 100 },
    { exercise_id: exId('Russian Twist'), reps: 80 },
    { exercise_id: exId('V-Up'), reps: 60 },
    { exercise_id: exId('Walking Lunge'), reps: 40 },
  ]},
  // BW Century — 100 reps of 4 bodyweight movements
  { id: wodUUID('BW Century'), name: 'BW Century', type: 'For Time', default_movements: [
    { exercise_id: exId('Air Squat'), reps: 100 },
    { exercise_id: exId('Push Up'), reps: 100 },
    { exercise_id: exId('Walking Lunge'), reps: 100 },
    { exercise_id: exId('Sit Up'), reps: 100 },
  ]},
  // The Warm Up — Quick AMRAP bodyweight triplet
  { id: wodUUID('The Warm Up'), name: 'The Warm Up', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Air Squat'), reps: 10 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Sit Up'), reps: 10 },
  ]},
  // Midline Madness — EMOM core-focused
  { id: wodUUID('Midline Madness'), name: 'Midline Madness', type: 'EMOM', default_movements: [
    { exercise_id: exId('Sit Up'), reps: 15 },
    { exercise_id: exId('V-Up'), reps: 10 },
    { exercise_id: exId('Burpee'), reps: 5 },
  ]},
  // The Gymnast — AMRAP high-skill bodyweight
  { id: wodUUID('The Gymnast'), name: 'The Gymnast', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Handstand Push Up'), reps: 3 },
    { exercise_id: exId('Pistol Squat'), reps: 6 },
    { exercise_id: exId('V-Up'), reps: 9 },
  ]},
  // Tabata Bodyweight — Tabata-style max-rep bodyweight
  { id: wodUUID('Tabata Bodyweight'), name: 'Tabata Bodyweight', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Push Up'), reps: 'max' },
    { exercise_id: exId('Air Squat'), reps: 'max' },
    { exercise_id: exId('Sit Up'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // BW Baseline — Bodyweight fitness test
  { id: wodUUID('BW Baseline'), name: 'BW Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Air Squat'), reps: 40 },
    { exercise_id: exId('Sit Up'), reps: 30 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Burpee'), reps: 10 },
  ]},
  // Upside Down — HSPU + squat couplet 21-15-9
  { id: wodUUID('Upside Down'), name: 'Upside Down', type: 'For Time', default_movements: [
    { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
    { exercise_id: exId('Air Squat'), reps: '21-15-9' },
  ]},
  // Lunge Marathon — Pure volume lunge grinder
  { id: wodUUID('Lunge Marathon'), name: 'Lunge Marathon', type: 'For Time', default_movements: [
    { exercise_id: exId('Walking Lunge'), reps: 400 },
  ]},
  // Three Amigos — AMRAP burpee/push-up/lunge triplet
  { id: wodUUID('Three Amigos'), name: 'Three Amigos', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Burpee'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Walking Lunge'), reps: 15 },
  ]},
  // Run and Gun — Long run + bodyweight couplet
  { id: wodUUID('Run and Gun'), name: 'Run and Gun', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 800 },
    { exercise_id: exId('Burpee'), reps: 50 },
    { exercise_id: exId('Running'), reps: 800 },
    { exercise_id: exId('Push Up'), reps: 100 },
  ]},
  // Prison Yard — EMOM alternating squat/push
  { id: wodUUID('Prison Yard'), name: 'Prison Yard', type: 'EMOM', default_movements: [
    { exercise_id: exId('Air Squat'), reps: 15 },
    { exercise_id: exId('Push Up'), reps: 10 },
  ]},
  // The 300 — 300 total reps chipper
  { id: wodUUID('The 300'), name: 'The 300', type: 'For Time', default_movements: [
    { exercise_id: exId('Air Squat'), reps: 50 },
    { exercise_id: exId('Push Up'), reps: 50 },
    { exercise_id: exId('Burpee'), reps: 50 },
    { exercise_id: exId('Sit Up'), reps: 50 },
    { exercise_id: exId('Walking Lunge'), reps: 50 },
    { exercise_id: exId('V-Up'), reps: 50 },
  ]},
  // Bodyweight Frenzy — 21-15-9 burpee/push-up couplet
  { id: wodUUID('Bodyweight Frenzy'), name: 'Bodyweight Frenzy', type: 'For Time', default_movements: [
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
    { exercise_id: exId('Push Up'), reps: '21-15-9' },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED PULL UP BAR WODs (+16, total 30)
  // Target: 30 WODs for users with a pull-up bar
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Bar Complex — Pull-up + T2B couplet 21-15-9
  { id: wodUUID('Bar Complex'), name: 'Bar Complex', type: 'For Time', default_movements: [
    { exercise_id: exId('Pull Up'), reps: '21-15-9' },
    { exercise_id: exId('Toes to Bar'), reps: '21-15-9' },
  ]},
  // Muscle Up Madness — 30 bar muscle-ups for time
  { id: wodUUID('Muscle Up Madness'), name: 'Muscle Up Madness', type: 'For Time', default_movements: [
    { exercise_id: exId('Bar Muscle Up'), reps: 30 },
  ]},
  // The Standard — AMRAP pull-up/push-up/squat with higher reps
  { id: wodUUID('The Standard'), name: 'The Standard', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Pull Up'), reps: 10 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Air Squat'), reps: 30 },
  ]},
  // T2B Chipper — Toes-to-bar + bodyweight chipper
  { id: wodUUID('T2B Chipper'), name: 'T2B Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Toes to Bar'), reps: 50 },
    { exercise_id: exId('Air Squat'), reps: 50 },
    { exercise_id: exId('Push Up'), reps: 50 },
    { exercise_id: exId('Toes to Bar'), reps: 50 },
  ]},
  // Bar Storm — EMOM pull/core/conditioning
  { id: wodUUID('Bar Storm'), name: 'Bar Storm', type: 'EMOM', default_movements: [
    { exercise_id: exId('Pull Up'), reps: 5 },
    { exercise_id: exId('Toes to Bar'), reps: 5 },
    { exercise_id: exId('Burpee'), reps: 5 },
  ]},
  // Strict Mary — Mary with strict pull-ups
  { id: wodUUID('Strict Mary'), name: 'Strict Mary', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Handstand Push Up'), reps: 5 },
    { exercise_id: exId('Pistol Squat'), reps: 10 },
    { exercise_id: exId('Strict Pull Up'), reps: 15 },
  ]},
  // Death By Bar Muscle Up — EMOM ascending bar MU
  { id: wodUUID('Death By Bar Muscle Up'), name: 'Death By Bar Muscle Up', type: 'EMOM', default_movements: [
    { exercise_id: exId('Bar Muscle Up'), reps: '+1/min' },
  ]},
  // Jumping Jack — 100 jumping pull-ups + 100 squats
  { id: wodUUID('Jumping Jack'), name: 'Jumping Jack', type: 'For Time', default_movements: [
    { exercise_id: exId('Jumping Pull Up'), reps: 100 },
    { exercise_id: exId('Air Squat'), reps: 100 },
  ]},
  // Pull Up Christine — AMRAP run + burpee pull-ups
  { id: wodUUID('Pull Up Christine'), name: 'Pull Up Christine', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Burpee Pull Up'), reps: 15 },
  ]},
  // K2E Ladder — Knees-to-elbows + sit-ups descending
  { id: wodUUID('K2E Ladder'), name: 'K2E Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('Knees to Elbows'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // Bar Burner — C2B + push-up couplet 21-15-9
  { id: wodUUID('Bar Burner'), name: 'Bar Burner', type: 'For Time', default_movements: [
    { exercise_id: exId('Chest to Bar Pull Up'), reps: '21-15-9' },
    { exercise_id: exId('Push Up'), reps: '21-15-9' },
  ]},
  // Gymnastics Grind — AMRAP high-skill bar + bodyweight
  { id: wodUUID('Gymnastics Grind'), name: 'Gymnastics Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Bar Muscle Up'), reps: 3 },
    { exercise_id: exId('Handstand Push Up'), reps: 6 },
    { exercise_id: exId('Air Squat'), reps: 9 },
  ]},
  // L-Pull Up WOD — EMOM L-pull-ups + V-ups
  { id: wodUUID('L-Pull Up WOD'), name: 'L-Pull Up WOD', type: 'EMOM', default_movements: [
    { exercise_id: exId('L-Pull Up'), reps: 5 },
    { exercise_id: exId('V-Up'), reps: 10 },
  ]},
  // Cindy Plus — Cindy with C2B instead of pull-ups
  { id: wodUUID('Cindy Plus'), name: 'Cindy Plus', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Chest to Bar Pull Up'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Air Squat'), reps: 15 },
  ]},
  // The Hang — 30 reps each of three bar movements
  { id: wodUUID('The Hang'), name: 'The Hang', type: 'For Time', default_movements: [
    { exercise_id: exId('Toes to Bar'), reps: 30 },
    { exercise_id: exId('Knees to Elbows'), reps: 30 },
    { exercise_id: exId('Pull Up'), reps: 30 },
  ]},
  // Half Murph — Scaled Murph with half the reps
  { id: wodUUID('Half Murph'), name: 'Half Murph', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 800 },
    { exercise_id: exId('Pull Up'), reps: 50 },
    { exercise_id: exId('Push Up'), reps: 100 },
    { exercise_id: exId('Air Squat'), reps: 150 },
    { exercise_id: exId('Running'), reps: 800 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED DUMBBELL WODs (+18, total 30)
  // Target: 30 WODs for users with dumbbells
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // DB Isabel — 30 DB snatches for time
  { id: wodUUID('DB Isabel'), name: 'DB Isabel', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Snatch'), reps: 30 },
  ]},
  // DB Kalsu — 100 DB thrusters with 5 burpees EMOM
  { id: wodUUID('DB Kalsu'), name: 'DB Kalsu', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Thruster'), reps: 100 },
    { exercise_id: exId('Burpee'), reps: 5 },
  ]},
  // DB Baseline — DB fitness test
  { id: wodUUID('DB Baseline'), name: 'DB Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('DB Deadlift'), reps: 40 },
    { exercise_id: exId('DB Push Press'), reps: 30 },
    { exercise_id: exId('DB Squat Clean'), reps: 20 },
    { exercise_id: exId('DB Snatch'), reps: 10 },
  ]},
  // DB Chipper — Descending DB chipper
  { id: wodUUID('DB Chipper'), name: 'DB Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Walking Lunge'), reps: 50 },
    { exercise_id: exId('DB Push Press'), reps: 40 },
    { exercise_id: exId('DB Deadlift'), reps: 30 },
    { exercise_id: exId('DB Snatch'), reps: 20 },
    { exercise_id: exId('Burpee'), reps: 10 },
  ]},
  // DB Linda — Descending ladder of 3 DB lifts
  { id: wodUUID('DB Linda'), name: 'DB Linda', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Deadlift'), reps: '10-9-8-7-6-5-4-3-2-1' },
    { exercise_id: exId('DB Push Press'), reps: '10-9-8-7-6-5-4-3-2-1' },
    { exercise_id: exId('DB Squat Clean'), reps: '10-9-8-7-6-5-4-3-2-1' },
  ]},
  // DB EMOM — EMOM DB complex
  { id: wodUUID('DB EMOM'), name: 'DB EMOM', type: 'EMOM', default_movements: [
    { exercise_id: exId('DB Squat Clean'), reps: 3 },
    { exercise_id: exId('DB Front Rack Lunge'), reps: 6 },
    { exercise_id: exId('DB Push Press'), reps: 3 },
  ]},
  // DB Grind — AMRAP DB triplet
  { id: wodUUID('DB Grind'), name: 'DB Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('DB Renegade Row'), reps: 10 },
    { exercise_id: exId('DB Deadlift'), reps: 10 },
    { exercise_id: exId('DB Push Press'), reps: 10 },
  ]},
  // DB Complex — 21-15-9 DB clean + press
  { id: wodUUID('DB Complex'), name: 'DB Complex', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Hang Clean'), reps: '21-15-9' },
    { exercise_id: exId('DB Push Press'), reps: '21-15-9' },
  ]},
  // DB Cindy — AMRAP Cindy with DB row
  { id: wodUUID('DB Cindy'), name: 'DB Cindy', type: 'AMRAP', default_movements: [
    { exercise_id: exId('DB Renegade Row'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('DB Front Rack Lunge'), reps: 15 },
  ]},
  // DB Nasty Girls — 3 rounds: squats, DB snatches, DB squat cleans
  { id: wodUUID('DB Nasty Girls'), name: 'DB Nasty Girls', type: 'For Time', default_movements: [
    { exercise_id: exId('Air Squat'), reps: 50 },
    { exercise_id: exId('DB Snatch'), reps: 21 },
    { exercise_id: exId('DB Squat Clean'), reps: 10 },
  ]},
  // DB Running Man — Run + DB station triplet
  { id: wodUUID('DB Running Man'), name: 'DB Running Man', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('DB Thruster'), reps: 21 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('DB Snatch'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('DB Squat Clean'), reps: 9 },
  ]},
  // DB AMRAP 12 — AMRAP 12 min DB + bodyweight
  { id: wodUUID('DB AMRAP 12'), name: 'DB AMRAP 12', type: 'AMRAP', default_movements: [
    { exercise_id: exId('DB Deadlift'), reps: 8 },
    { exercise_id: exId('Burpee'), reps: 8 },
    { exercise_id: exId('DB Walking Lunge'), reps: 16 },
  ]},
  // DB Couplet — DB thruster + burpee 21-15-9
  { id: wodUUID('DB Couplet'), name: 'DB Couplet', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Thruster'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // DB Tabata — Tabata-style max-rep DB movements
  { id: wodUUID('DB Tabata'), name: 'DB Tabata', type: 'AMRAP', default_movements: [
    { exercise_id: exId('DB Push Press'), reps: 'max' },
    { exercise_id: exId('DB Front Rack Lunge'), reps: 'max' },
    { exercise_id: exId('DB Renegade Row'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // DB Ladder — 21-15-9 DB HCTO + push-ups
  { id: wodUUID('DB Ladder'), name: 'DB Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Hang Clean to Overhead'), reps: '21-15-9' },
    { exercise_id: exId('Push Up'), reps: '21-15-9' },
  ]},
  // DB Nancy — Run + DB front rack lunges
  { id: wodUUID('DB Nancy'), name: 'DB Nancy', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('DB Front Rack Lunge'), reps: 15 },
  ]},
  // DB Fight Gone Bad — Max-rep DB station rotation
  { id: wodUUID('DB Fight Gone Bad'), name: 'DB Fight Gone Bad', type: 'AMRAP', default_movements: [
    { exercise_id: exId('DB Push Press'), reps: 'max' },
    { exercise_id: exId('DB Deadlift'), reps: 'max' },
    { exercise_id: exId('DB Squat Clean'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // DB Randy — 75 DB snatches for time
  { id: wodUUID('DB Randy'), name: 'DB Randy', type: 'For Time', default_movements: [
    { exercise_id: exId('DB Snatch'), reps: 75 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED KETTLEBELL WODs (+26, total 30)
  // Target: 30 WODs for users with a kettlebell
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // KB Helen — Run, KB swings, burpees
  { id: wodUUID('KB Helen'), name: 'KB Helen', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('KB Swing'), reps: 21 },
    { exercise_id: exId('Burpee'), reps: 12 },
  ]},
  // KB DT — 5-round KB complex: deadlift/clean/press
  { id: wodUUID('KB DT'), name: 'KB DT', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Deadlift'), reps: 12 },
    { exercise_id: exId('KB Clean'), reps: 9 },
    { exercise_id: exId('KB Push Press'), reps: 6 },
  ]},
  // KB Diane — KB deadlifts + HSPU 21-15-9
  { id: wodUUID('KB Diane'), name: 'KB Diane', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Deadlift'), reps: '21-15-9' },
    { exercise_id: exId('Handstand Push Up'), reps: '21-15-9' },
  ]},
  // KB Isabel — 30 KB snatches for time
  { id: wodUUID('KB Isabel'), name: 'KB Isabel', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Snatch'), reps: 30 },
  ]},
  // KB Cindy — AMRAP KB row/push-up/goblet squat
  { id: wodUUID('KB Cindy'), name: 'KB Cindy', type: 'AMRAP', default_movements: [
    { exercise_id: exId('KB Row'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Goblet Squat'), reps: 15 },
  ]},
  // KB Linda — Descending ladder of 3 KB lifts
  { id: wodUUID('KB Linda'), name: 'KB Linda', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Deadlift'), reps: '10-9-8-7-6-5-4-3-2-1' },
    { exercise_id: exId('KB Push Press'), reps: '10-9-8-7-6-5-4-3-2-1' },
    { exercise_id: exId('Goblet Squat'), reps: '10-9-8-7-6-5-4-3-2-1' },
  ]},
  // KB EMOM — EMOM KB clean/lunge/press complex
  { id: wodUUID('KB EMOM'), name: 'KB EMOM', type: 'EMOM', default_movements: [
    { exercise_id: exId('KB Clean'), reps: 3 },
    { exercise_id: exId('KB Overhead Lunge'), reps: 6 },
    { exercise_id: exId('KB Push Press'), reps: 3 },
  ]},
  // KB Chipper — Descending KB chipper
  { id: wodUUID('KB Chipper'), name: 'KB Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 50 },
    { exercise_id: exId('Goblet Squat'), reps: 40 },
    { exercise_id: exId('KB Snatch'), reps: 30 },
    { exercise_id: exId('KB Push Press'), reps: 20 },
    { exercise_id: exId('Burpee'), reps: 10 },
  ]},
  // KB Grind — AMRAP KB swing/burpee/goblet squat
  { id: wodUUID('KB Grind'), name: 'KB Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 15 },
    { exercise_id: exId('Burpee'), reps: 10 },
    { exercise_id: exId('Goblet Squat'), reps: 15 },
  ]},
  // TGU 50 — 50 Turkish get-ups for time
  { id: wodUUID('TGU 50'), name: 'TGU 50', type: 'For Time', default_movements: [
    { exercise_id: exId('Turkish Get Up'), reps: 50 },
  ]},
  // Armor — The Dan John classic: EMOM clean/press/squat
  { id: wodUUID('Armor'), name: 'Armor', type: 'EMOM', default_movements: [
    { exercise_id: exId('KB Clean'), reps: 2 },
    { exercise_id: exId('KB Push Press'), reps: 1 },
    { exercise_id: exId('Goblet Squat'), reps: 3 },
  ]},
  // KB Nancy — Run + KB overhead squats
  { id: wodUUID('KB Nancy'), name: 'KB Nancy', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('KB Overhead Squat'), reps: 15 },
  ]},
  // KB Baseline — KB fitness test
  { id: wodUUID('KB Baseline'), name: 'KB Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('KB Swing'), reps: 40 },
    { exercise_id: exId('Sit Up'), reps: 30 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Goblet Squat'), reps: 10 },
  ]},
  // KB Tabata — Tabata-style max-rep KB movements
  { id: wodUUID('KB Tabata'), name: 'KB Tabata', type: 'AMRAP', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 'max' },
    { exercise_id: exId('Goblet Squat'), reps: 'max' },
    { exercise_id: exId('KB Snatch'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // KB 300 — 300 total KB + bodyweight reps
  { id: wodUUID('KB 300'), name: 'KB 300', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 50 },
    { exercise_id: exId('Goblet Squat'), reps: 50 },
    { exercise_id: exId('KB Snatch'), reps: 50 },
    { exercise_id: exId('KB Push Press'), reps: 50 },
    { exercise_id: exId('KB Clean'), reps: 50 },
    { exercise_id: exId('Burpee'), reps: 50 },
  ]},
  // KB Couplet — KB thruster + burpee 21-15-9
  { id: wodUUID('KB Couplet'), name: 'KB Couplet', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Thruster'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // KB Running Man — Run + KB station triplet
  { id: wodUUID('KB Running Man'), name: 'KB Running Man', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('KB Swing'), reps: 21 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('KB Snatch'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Goblet Squat'), reps: 9 },
  ]},
  // Death By KB Swing — EMOM ascending KB swings
  { id: wodUUID('Death By KB Swing'), name: 'Death By KB Swing', type: 'EMOM', default_movements: [
    { exercise_id: exId('KB Swing'), reps: '+1/min' },
  ]},
  // KB Ladder — KB swing + snatch 21-15-9
  { id: wodUUID('KB Ladder'), name: 'KB Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Swing'), reps: '21-15-9' },
    { exercise_id: exId('KB Snatch'), reps: '21-15-9' },
  ]},
  // KB Devil — KB snatch + burpee 21-15-9
  { id: wodUUID('KB Devil'), name: 'KB Devil', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Snatch'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // KB Warm Up — AMRAP quick KB triplet
  { id: wodUUID('KB Warm Up'), name: 'KB Warm Up', type: 'AMRAP', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 10 },
    { exercise_id: exId('Goblet Squat'), reps: 10 },
    { exercise_id: exId('KB Snatch'), reps: 10 },
  ]},
  // KB Murph — Murph with KB movements
  { id: wodUUID('KB Murph'), name: 'KB Murph', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 800 },
    { exercise_id: exId('KB Row'), reps: 50 },
    { exercise_id: exId('Push Up'), reps: 100 },
    { exercise_id: exId('Goblet Squat'), reps: 150 },
    { exercise_id: exId('Running'), reps: 800 },
  ]},
  // KB Power Hour — EMOM KB swings + push-ups
  { id: wodUUID('KB Power Hour'), name: 'KB Power Hour', type: 'EMOM', default_movements: [
    { exercise_id: exId('KB Swing'), reps: 10 },
    { exercise_id: exId('Push Up'), reps: 10 },
  ]},
  // KB Overhead Nightmare — KB OHS + OH lunge 21-15-9
  { id: wodUUID('KB Overhead Nightmare'), name: 'KB Overhead Nightmare', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Overhead Squat'), reps: '21-15-9' },
    { exercise_id: exId('KB Overhead Lunge'), reps: '21-15-9' },
  ]},
  // KB Core — TGU + sit-up + KB swing + V-up
  { id: wodUUID('KB Core'), name: 'KB Core', type: 'For Time', default_movements: [
    { exercise_id: exId('Turkish Get Up'), reps: 10 },
    { exercise_id: exId('Sit Up'), reps: 50 },
    { exercise_id: exId('KB Swing'), reps: 30 },
    { exercise_id: exId('V-Up'), reps: 50 },
  ]},
  // Kettlebell Kalsu — 100 KB thrusters with 5 burpees EMOM
  { id: wodUUID('Kettlebell Kalsu'), name: 'Kettlebell Kalsu', type: 'For Time', default_movements: [
    { exercise_id: exId('KB Thruster'), reps: 100 },
    { exercise_id: exId('Burpee'), reps: 5 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED BARBELL + WEIGHTS WODs (+21, total 30)
  // Target: 30 WODs for users with barbell + weight plates
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Barbell Chipper — 5-station descending barbell chipper
  { id: wodUUID('Barbell Chipper'), name: 'Barbell Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Deadlift'), reps: 50 },
    { exercise_id: exId('Squat Clean'), reps: 40 },
    { exercise_id: exId('Thruster'), reps: 30 },
    { exercise_id: exId('Snatch'), reps: 20 },
    { exercise_id: exId('Clean and Jerk'), reps: 10 },
  ]},
  // Clean Ladder — Power clean + front squat 21-15-9
  { id: wodUUID('Clean Ladder'), name: 'Clean Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('Power Clean'), reps: '21-15-9' },
    { exercise_id: exId('Front Squat'), reps: '21-15-9' },
  ]},
  // Snatch Complex — Power snatch + OHS 21-15-9
  { id: wodUUID('Snatch Complex'), name: 'Snatch Complex', type: 'For Time', default_movements: [
    { exercise_id: exId('Power Snatch'), reps: '21-15-9' },
    { exercise_id: exId('Overhead Squat'), reps: '21-15-9' },
  ]},
  // Strength WOD — Deadlift + push press 21-15-9
  { id: wodUUID('Strength WOD'), name: 'Strength WOD', type: 'For Time', default_movements: [
    { exercise_id: exId('Deadlift'), reps: '21-15-9' },
    { exercise_id: exId('Push Press'), reps: '21-15-9' },
  ]},
  // The Chief — AMRAP power clean/push press/squat
  { id: wodUUID('The Chief'), name: 'The Chief', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Power Clean'), reps: 3 },
    { exercise_id: exId('Push Press'), reps: 6 },
    { exercise_id: exId('Air Squat'), reps: 9 },
  ]},
  // Macho Man — EMOM barbell complex: clean/front squat/jerk
  { id: wodUUID('Macho Man'), name: 'Macho Man', type: 'EMOM', default_movements: [
    { exercise_id: exId('Power Clean'), reps: 3 },
    { exercise_id: exId('Front Squat'), reps: 3 },
    { exercise_id: exId('Push Jerk'), reps: 3 },
  ]},
  // Barbell Fran — Thruster + burpee 21-15-9
  { id: wodUUID('Barbell Fran'), name: 'Barbell Fran', type: 'For Time', default_movements: [
    { exercise_id: exId('Thruster'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // The Grinder — AMRAP deadlift/HPC/push jerk
  { id: wodUUID('The Grinder'), name: 'The Grinder', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Deadlift'), reps: 5 },
    { exercise_id: exId('Hang Power Clean'), reps: 5 },
    { exercise_id: exId('Push Jerk'), reps: 5 },
  ]},
  // Barbell Helen — Run + power clean + push-ups
  { id: wodUUID('Barbell Helen'), name: 'Barbell Helen', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Power Clean'), reps: 21 },
    { exercise_id: exId('Push Up'), reps: 12 },
  ]},
  // Squat Day — Back squat + air squat 21-15-9
  { id: wodUUID('Squat Day'), name: 'Squat Day', type: 'For Time', default_movements: [
    { exercise_id: exId('Back Squat'), reps: '21-15-9' },
    { exercise_id: exId('Air Squat'), reps: '21-15-9' },
  ]},
  // Olympic Chipper — 30 reps each of 3 olympic lifts
  { id: wodUUID('Olympic Chipper'), name: 'Olympic Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Power Snatch'), reps: 30 },
    { exercise_id: exId('Power Clean'), reps: 30 },
    { exercise_id: exId('Push Jerk'), reps: 30 },
  ]},
  // Barbell Baseline — Barbell fitness test
  { id: wodUUID('Barbell Baseline'), name: 'Barbell Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Deadlift'), reps: 40 },
    { exercise_id: exId('Push Press'), reps: 30 },
    { exercise_id: exId('Front Squat'), reps: 20 },
    { exercise_id: exId('Thruster'), reps: 10 },
  ]},
  // Power Hour — EMOM power clean + push-ups
  { id: wodUUID('Power Hour'), name: 'Power Hour', type: 'EMOM', default_movements: [
    { exercise_id: exId('Power Clean'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
  ]},
  // Snatch Sprint — Power snatch + burpee grinder
  { id: wodUUID('Snatch Sprint'), name: 'Snatch Sprint', type: 'For Time', default_movements: [
    { exercise_id: exId('Power Snatch'), reps: 30 },
    { exercise_id: exId('Burpee'), reps: 30 },
  ]},
  // OHS Annie — Overhead squat + sit-up descending ladder
  { id: wodUUID('OHS Annie'), name: 'OHS Annie', type: 'For Time', default_movements: [
    { exercise_id: exId('Overhead Squat'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // Front Squat Frenzy — Front squat + burpee 21-15-9
  { id: wodUUID('Front Squat Frenzy'), name: 'Front Squat Frenzy', type: 'For Time', default_movements: [
    { exercise_id: exId('Front Squat'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // Barbell Mile — Run + barbell station chipper
  { id: wodUUID('Barbell Mile'), name: 'Barbell Mile', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Deadlift'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Thruster'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Power Clean'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Push Press'), reps: 15 },
  ]},
  // The Complex — EMOM barbell complex
  { id: wodUUID('The Complex'), name: 'The Complex', type: 'EMOM', default_movements: [
    { exercise_id: exId('Deadlift'), reps: 3 },
    { exercise_id: exId('Hang Power Clean'), reps: 3 },
    { exercise_id: exId('Front Squat'), reps: 3 },
    { exercise_id: exId('Push Jerk'), reps: 3 },
  ]},
  // SDHP Ladder — Sumo deadlift HP + push-up 21-15-9
  { id: wodUUID('SDHP Ladder'), name: 'SDHP Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('Sumo Deadlift High Pull'), reps: '21-15-9' },
    { exercise_id: exId('Push Up'), reps: '21-15-9' },
  ]},
  // Deadlift Century — 100 deadlifts for time
  { id: wodUUID('Deadlift Century'), name: 'Deadlift Century', type: 'For Time', default_movements: [
    { exercise_id: exId('Deadlift'), reps: 100 },
  ]},
  // Barbell Barbara — Push press + burpee + sit-up + squat
  { id: wodUUID('Barbell Barbara'), name: 'Barbell Barbara', type: 'For Time', default_movements: [
    { exercise_id: exId('Push Press'), reps: 20 },
    { exercise_id: exId('Burpee'), reps: 30 },
    { exercise_id: exId('Sit Up'), reps: 40 },
    { exercise_id: exId('Air Squat'), reps: 50 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED MEDICINE BALL WODs (+13, total 15)
  // Target: 15 WODs for users with a medicine ball
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Wall Ball Fran — Wall ball + burpee 21-15-9
  { id: wodUUID('Wall Ball Fran'), name: 'Wall Ball Fran', type: 'For Time', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: '21-15-9' },
    { exercise_id: exId('Burpee'), reps: '21-15-9' },
  ]},
  // MB Chipper — Med ball 4-station chipper
  { id: wodUUID('MB Chipper'), name: 'MB Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: 50 },
    { exercise_id: exId('Medicine Ball Clean'), reps: 40 },
    { exercise_id: exId('Med Ball Slam'), reps: 30 },
    { exercise_id: exId('Med Ball Sit Up'), reps: 20 },
  ]},
  // MB EMOM — EMOM wall ball + slam + push-up
  { id: wodUUID('MB EMOM'), name: 'MB EMOM', type: 'EMOM', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: 15 },
    { exercise_id: exId('Med Ball Slam'), reps: 10 },
    { exercise_id: exId('Push Up'), reps: 10 },
  ]},
  // MB DT — Med ball DT complex
  { id: wodUUID('MB DT'), name: 'MB DT', type: 'For Time', default_movements: [
    { exercise_id: exId('Med Ball Slam'), reps: 12 },
    { exercise_id: exId('Medicine Ball Clean'), reps: 9 },
    { exercise_id: exId('Wall Ball'), reps: 6 },
  ]},
  // MB Annie — Wall ball + sit-up descending ladder
  { id: wodUUID('MB Annie'), name: 'MB Annie', type: 'For Time', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // MB Grind — AMRAP wall ball/slam/lunge
  { id: wodUUID('MB Grind'), name: 'MB Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: 10 },
    { exercise_id: exId('Med Ball Slam'), reps: 10 },
    { exercise_id: exId('Med Ball Overhead Lunge'), reps: 10 },
  ]},
  // MB Running Man — Run + wall ball + burpee
  { id: wodUUID('MB Running Man'), name: 'MB Running Man', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Wall Ball'), reps: 21 },
    { exercise_id: exId('Burpee'), reps: 12 },
  ]},
  // Death By Wall Ball — EMOM ascending wall balls
  { id: wodUUID('Death By Wall Ball'), name: 'Death By Wall Ball', type: 'EMOM', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: '+1/min' },
  ]},
  // MB Grace — 30 med ball cleans for time
  { id: wodUUID('MB Grace'), name: 'MB Grace', type: 'For Time', default_movements: [
    { exercise_id: exId('Medicine Ball Clean'), reps: 30 },
  ]},
  // MB Baseline — Med ball fitness test
  { id: wodUUID('MB Baseline'), name: 'MB Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Wall Ball'), reps: 40 },
    { exercise_id: exId('Med Ball Sit Up'), reps: 30 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Med Ball Slam'), reps: 10 },
  ]},
  // MB Ladder — Wall ball + slam 21-15-9
  { id: wodUUID('MB Ladder'), name: 'MB Ladder', type: 'For Time', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: '21-15-9' },
    { exercise_id: exId('Med Ball Slam'), reps: '21-15-9' },
  ]},
  // MB Tabata — Tabata-style max-rep med ball
  { id: wodUUID('MB Tabata'), name: 'MB Tabata', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Wall Ball'), reps: 'max' },
    { exercise_id: exId('Med Ball Slam'), reps: 'max' },
    { exercise_id: exId('Medicine Ball Clean'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // MB Core — Med ball core + wall ball grinder
  { id: wodUUID('MB Core'), name: 'MB Core', type: 'For Time', default_movements: [
    { exercise_id: exId('Med Ball Sit Up'), reps: 50 },
    { exercise_id: exId('Wall Ball'), reps: 50 },
    { exercise_id: exId('Med Ball Overhead Lunge'), reps: 50 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED PLYO BOX WODs (+14, total 15)
  // Target: 15 WODs for users with a plyo box
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Box Fran — Box jump + push-up 21-15-9
  { id: wodUUID('Box Fran'), name: 'Box Fran', type: 'For Time', default_movements: [
    { exercise_id: exId('Box Jump'), reps: '21-15-9' },
    { exercise_id: exId('Push Up'), reps: '21-15-9' },
  ]},
  // Box Chipper — 5-station box chipper
  { id: wodUUID('Box Chipper'), name: 'Box Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Box Jump'), reps: 50 },
    { exercise_id: exId('Box Dip'), reps: 40 },
    { exercise_id: exId('Step Up'), reps: 30 },
    { exercise_id: exId('Box Jump Over'), reps: 20 },
    { exercise_id: exId('Burpee'), reps: 10 },
  ]},
  // Box EMOM — EMOM box jump + push-up + sit-up
  { id: wodUUID('Box EMOM'), name: 'Box EMOM', type: 'EMOM', default_movements: [
    { exercise_id: exId('Box Jump'), reps: 10 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Sit Up'), reps: 10 },
  ]},
  // Box DT — Box step-up + jump + dip complex
  { id: wodUUID('Box DT'), name: 'Box DT', type: 'For Time', default_movements: [
    { exercise_id: exId('Box Step Up'), reps: 12 },
    { exercise_id: exId('Box Jump'), reps: 9 },
    { exercise_id: exId('Box Dip'), reps: 6 },
  ]},
  // Box Helen — Run + box jump + push-up
  { id: wodUUID('Box Helen'), name: 'Box Helen', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Box Jump'), reps: 21 },
    { exercise_id: exId('Push Up'), reps: 12 },
  ]},
  // Box Grind — AMRAP box jump + BBJO + squat
  { id: wodUUID('Box Grind'), name: 'Box Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Box Jump'), reps: 10 },
    { exercise_id: exId('Burpee Box Jump Over'), reps: 10 },
    { exercise_id: exId('Air Squat'), reps: 10 },
  ]},
  // Box Annie — Box jump + sit-up descending ladder
  { id: wodUUID('Box Annie'), name: 'Box Annie', type: 'For Time', default_movements: [
    { exercise_id: exId('Box Jump'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // Death By Box Jump — EMOM ascending box jumps
  { id: wodUUID('Death By Box Jump'), name: 'Death By Box Jump', type: 'EMOM', default_movements: [
    { exercise_id: exId('Box Jump'), reps: '+1/min' },
  ]},
  // Box Baseline — Box fitness test
  { id: wodUUID('Box Baseline'), name: 'Box Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Box Jump'), reps: 40 },
    { exercise_id: exId('Step Up'), reps: 30 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Sit Up'), reps: 10 },
  ]},
  // Lateral Madness — Lateral box jump + burpee couplet
  { id: wodUUID('Lateral Madness'), name: 'Lateral Madness', type: 'For Time', default_movements: [
    { exercise_id: exId('Lateral Box Jump'), reps: 50 },
    { exercise_id: exId('Burpee'), reps: 50 },
  ]},
  // Step Up Century — 100 step-ups + 100 push-ups
  { id: wodUUID('Step Up Century'), name: 'Step Up Century', type: 'For Time', default_movements: [
    { exercise_id: exId('Box Step Up'), reps: 100 },
    { exercise_id: exId('Push Up'), reps: 100 },
  ]},
  // Box Tabata — Tabata-style max-rep box movements
  { id: wodUUID('Box Tabata'), name: 'Box Tabata', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Box Jump'), reps: 'max' },
    { exercise_id: exId('Box Dip'), reps: 'max' },
    { exercise_id: exId('Step Up'), reps: 'max' },
    { exercise_id: exId('Burpee'), reps: 'max' },
  ]},
  // Box Run — Run + box station triplet
  { id: wodUUID('Box Run'), name: 'Box Run', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Burpee Box Jump Over'), reps: 15 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Box Jump'), reps: 20 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Box Step Up'), reps: 25 },
  ]},
  // Box Cindy — AMRAP box dip + push-up + box jump
  { id: wodUUID('Box Cindy'), name: 'Box Cindy', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Box Dip'), reps: 5 },
    { exercise_id: exId('Push Up'), reps: 10 },
    { exercise_id: exId('Box Jump'), reps: 15 },
  ]},

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPANDED JUMP ROPE WODs (+14, total 15)
  // Target: 15 WODs for users with a jump rope
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // DU Hell — 500 double-unders for time
  { id: wodUUID('DU Hell'), name: 'DU Hell', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: 500 },
  ]},
  // DU Annie Plus — DU + sit-up descending ladder (bigger)
  { id: wodUUID('DU Annie Plus'), name: 'DU Annie Plus', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: '100-80-60-40-20' },
    { exercise_id: exId('Sit Up'), reps: '50-40-30-20-10' },
  ]},
  // DU Chipper — DU + push-up + DU + sit-up
  { id: wodUUID('DU Chipper'), name: 'DU Chipper', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: 100 },
    { exercise_id: exId('Push Up'), reps: 50 },
    { exercise_id: exId('Double Under'), reps: 100 },
    { exercise_id: exId('Sit Up'), reps: 50 },
  ]},
  // DU EMOM — EMOM double-unders + burpees
  { id: wodUUID('DU EMOM'), name: 'DU EMOM', type: 'EMOM', default_movements: [
    { exercise_id: exId('Double Under'), reps: 30 },
    { exercise_id: exId('Burpee'), reps: 5 },
  ]},
  // Jump Rope Baseline — Jump rope fitness test
  { id: wodUUID('Jump Rope Baseline'), name: 'Jump Rope Baseline', type: 'For Time', default_movements: [
    { exercise_id: exId('Single Under'), reps: 200 },
    { exercise_id: exId('Air Squat'), reps: 40 },
    { exercise_id: exId('Sit Up'), reps: 30 },
    { exercise_id: exId('Push Up'), reps: 20 },
    { exercise_id: exId('Double Under'), reps: 100 },
  ]},
  // DU and Run — Run + DU alternating
  { id: wodUUID('DU and Run'), name: 'DU and Run', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Double Under'), reps: 50 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Double Under'), reps: 50 },
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Double Under'), reps: 50 },
  ]},
  // DU Couplet — DU + push-up descending ladder
  { id: wodUUID('DU Couplet'), name: 'DU Couplet', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: '50-40-30-20-10' },
    { exercise_id: exId('Push Up'), reps: '50-40-30-20-10' },
  ]},
  // DU Grind — AMRAP DU + squat + push-up
  { id: wodUUID('DU Grind'), name: 'DU Grind', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Double Under'), reps: 50 },
    { exercise_id: exId('Air Squat'), reps: 20 },
    { exercise_id: exId('Push Up'), reps: 15 },
  ]},
  // DU Tabata — Tabata-style max-rep DU + bodyweight
  { id: wodUUID('DU Tabata'), name: 'DU Tabata', type: 'AMRAP', default_movements: [
    { exercise_id: exId('Double Under'), reps: 'max' },
    { exercise_id: exId('Push Up'), reps: 'max' },
    { exercise_id: exId('Sit Up'), reps: 'max' },
    { exercise_id: exId('Air Squat'), reps: 'max' },
  ]},
  // DU 300 — DU + push-up + DU + sit-up alternating
  { id: wodUUID('DU 300'), name: 'DU 300', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: 100 },
    { exercise_id: exId('Push Up'), reps: 50 },
    { exercise_id: exId('Double Under'), reps: 100 },
    { exercise_id: exId('Sit Up'), reps: 50 },
  ]},
  // Rope Burner — 500 single-unders + 50 burpees
  { id: wodUUID('Rope Burner'), name: 'Rope Burner', type: 'For Time', default_movements: [
    { exercise_id: exId('Single Under'), reps: 500 },
    { exercise_id: exId('Burpee'), reps: 50 },
  ]},
  // DU Linda — Descending DU + burpee ladder
  { id: wodUUID('DU Linda'), name: 'DU Linda', type: 'For Time', default_movements: [
    { exercise_id: exId('Double Under'), reps: 100 },
    { exercise_id: exId('Burpee'), reps: 50 },
    { exercise_id: exId('Double Under'), reps: 80 },
    { exercise_id: exId('Burpee'), reps: 40 },
    { exercise_id: exId('Double Under'), reps: 60 },
    { exercise_id: exId('Burpee'), reps: 30 },
  ]},
  // Death By Double Under — EMOM ascending double-unders
  { id: wodUUID('Death By Double Under'), name: 'Death By Double Under', type: 'EMOM', default_movements: [
    { exercise_id: exId('Double Under'), reps: '+2/min' },
  ]},
  // Jump Rope Helen — Run + DU + burpee
  { id: wodUUID('Jump Rope Helen'), name: 'Jump Rope Helen', type: 'For Time', default_movements: [
    { exercise_id: exId('Running'), reps: 400 },
    { exercise_id: exId('Double Under'), reps: 50 },
    { exercise_id: exId('Burpee'), reps: 12 },
  ]},
]

// ─── Seed Runner ─────────────────────────────────────────────────────────────
// Strategy with service_role key (bypasses RLS):
//   Full upsert — insert new rows, update existing ones
// Fallback with anon key (SELECT + INSERT only):
//   Insert new rows, skip existing (ignoreDuplicates)

async function runSeed() {
  const useServiceRole = !!serviceRoleKey
  console.log(`🔑 Using ${useServiceRole ? 'service_role key (full upsert)' : 'anon key (insert-only)'}`)

  console.log('🌱 Phase 1: Seeding exercises...')

  const { error: exError } = await supabase.from('exercises').upsert(seededExercises, {
    onConflict: 'name',
    ignoreDuplicates: !useServiceRole,  // UPDATE if service_role, skip if anon
  })
  if (exError) {
    console.error('❌ Failed to seed exercises:', exError.message)
    process.exit(1)
  }

  // Fetch ALL exercises from DB to get actual UUIDs
  const { data: dbExercises, error: fetchError } = await supabase
    .from('exercises')
    .select('id, name')
  if (fetchError || !dbExercises) {
    console.error('❌ Failed to fetch exercises:', fetchError?.message)
    process.exit(1)
  }
  const dbExMap = new Map(dbExercises.map(e => [e.name, e.id]))
  console.log(`✅ ${dbExercises.length} exercises in database (${seededExercises.length} defined)`)

  // Phase 2: Rebuild workouts with ACTUAL DB exercise IDs
  console.log('🌱 Phase 2: Seeding workouts...')

  const workoutsForDB = seededWorkouts.map(w => {
    const remappedMovements = w.default_movements.map(m => {
      const exerciseName = seededExercises.find(e => e.id === m.exercise_id)?.name
      if (!exerciseName) {
        throw new Error(`Cannot find exercise for ID ${m.exercise_id} in workout ${w.name}`)
      }
      const dbId = dbExMap.get(exerciseName)
      if (!dbId) {
        throw new Error(`Exercise "${exerciseName}" not found in database for workout ${w.name}`)
      }
      return { exercise_id: dbId, reps: m.reps }
    })
    return { ...w, default_movements: remappedMovements }
  })

  const { error: wodError } = await supabase.from('workouts').upsert(workoutsForDB, {
    onConflict: 'name',
    ignoreDuplicates: !useServiceRole,  // UPDATE if service_role, skip if anon
  })
  if (wodError) {
    console.error('❌ Failed to seed workouts:', wodError.message)
    process.exit(1)
  }

  // Verify final counts
  const { count: exCount } = await supabase.from('exercises').select('*', { count: 'exact', head: true })
  const { count: wodCount } = await supabase.from('workouts').select('*', { count: 'exact', head: true })

  console.log(`✅ ${wodCount} workouts in database (${seededWorkouts.length} defined)`)

  console.log('\n🎉 Seeding complete!')
  console.log(`   Exercises: ${exCount}`)
  console.log(`   Workouts:  ${wodCount}`)
  console.log('\n   Categories:')
  console.log('   ├── Girls WODs:             22')
  console.log('   ├── Hero WODs:              17')
  console.log('   ├── Open WODs:               6')
  console.log('   ├── Other Benchmarks:        6')
  console.log('   ├── Community WODs:          6')
  console.log('   ├── Single-Equipment:       10')
  console.log('   ├── Expanded Bodyweight:    27')
  console.log('   ├── Expanded Pull Up Bar:   20')
  console.log('   ├── Expanded Dumbbell:      24')
  console.log('   ├── Weights/Plate:           4')
  console.log('   ├── Expanded Kettlebell:    26')
  console.log('   ├── Expanded Barbell+Wt:    21')
  console.log('   ├── Expanded Med Ball:      13')
  console.log('   ├── Expanded Plyo Box:      14')
  console.log('   └── Expanded Jump Rope:     14')
}

// Run if executed directly
runSeed()
