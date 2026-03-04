# Project WOW: TDD Development Prompts

This document contains a sequence of prompts designed for a code-generation LLM to implement **Project WOW** incrementally. Each step follows a Test-Driven Development (TDD) approach, ensuring all logic is verified before moving to the next phase.

---

## Milestone 1: Data & Schema

### Prompt 1.1: Supabase Initialization & Schema
**Context:** We are building a fitness application that generates workouts based on available equipment. We are using Supabase for the backend. [cite: plan.md]
**Task:** `Create a SQL migration file to initialize the 'Project WOW' database. Define two tables:
1. 'exercises': id (uuid), name (text), movement_pattern (enum: push, pull, squat, hinge, core), equipment_required (text array), and base_difficulty (int).
2. 'workouts': id (uuid), name (text), type (enum: AMRAP, For Time, EMOM), and default_movements (jsonb).
Provide a TypeScript configuration for the Supabase client. Finally, write a Vitest unit test that verifies a SQL query for filtering exercises based on a user's 'available equipment' array (e.g., if a user has 'Dumbbell', return all exercises where equipment_required is empty or contains 'Dumbbell').`

### Prompt 1.2: Data Seeding & Verification
**Context:** The schema is ready. We need a robust dataset to test our generation logic. [cite: plan.md]
**Task:** `Write a TypeScript seed script for the Supabase tables created in the previous step. 
1. Seed the 'exercises' table with 20 distinct movements covering all movement_patterns. 
2. Seed the 'workouts' table with 5 classic CrossFit WODs (e.g., 'Cindy', 'Fran') using the IDs of the seeded exercises. 
Extend the Vitest suite to include a 'Seeding Integrity' test that ensures exactly 20 exercises exist and that every classic WOD has valid exercise references in its jsonb column.`

---

## Milestone 2: Logic Engine

### Prompt 2.1: Phase 1 & 2 - Matcher and Stacker
**Context:** We have our data. Now we need the "Brain" of the app. [cite: plan.md]
**Task:** `Implement a 'WorkoutEngine' class in TypeScript. 
1. Phase 1 (Classic WOD Matcher): A method 'getMatchedWODs' that takes 'availableEquipment' as an argument and returns classic WODs from the DB that the user can perform. 
2. Phase 2 (Template Stacker): A method 'generateTimeBlock' that takes a 'duration' (minutes) and creates a workout structure (e.g., a 10-minute AMRAP template). 
Write a Vitest test for 'WorkoutEngine' that mocks the Supabase client. The test should verify that the Matcher correctly filters out a workout if a required piece of equipment is missing.`

### Prompt 2.2: Phase 3 - Balanced Movement Rule
**Context:** Randomly selected exercises lead to poor workouts. We need balance. [cite: plan.md]
**Task:** `Update the 'WorkoutEngine' class to include a 'Balanced Movement Rule'. When generating a custom workout, the engine must ensure a distribution of movement patterns (e.g., one Push, one Pull, and one Squat). 
Write a unit test called 'test_smart_distribution' that generates a 3-movement workout and asserts that it contains exactly one 'push', one 'pull', and one 'squat/hinge' movement. Ensure this logic integrates with the equipment filtering from the previous step.`

---

## Milestone 3: Frontend & Interaction

### Prompt 3.1: React Dashboard & UI State
**Context:** The logic is tested. Now we need a user interface. [cite: plan.md]
**Task:** `Build a React dashboard component using Tailwind CSS. 
1. Create a set of toggle chips for equipment (e.g., 'No Equipment', 'Dumbbell', 'Kettlebell').
2. Create a 'Generate' button and a display area for the workout results.
3. Map the UI state (selected equipment) to the 'WorkoutEngine' inputs. 
Write a Vitest-DOM test that renders the dashboard, clicks a few equipment toggles, and verifies that the component's internal state reflects those selections accurately.`

### Prompt 3.2: Integration & The Shuffle Logic
**Context:** We need to connect the UI to the engine and allow for quick iterations. [cite: plan.md]
**Task:** `Wire the 'Generate' button to the 'WorkoutEngine'. When clicked, it should display either a matched Classic WOD or a generated Smart Workout. 
Implement a 'Shuffle' button logic: clicking shuffle should re-run the 'generate' logic using the same filters but selecting different valid exercises. 
Write an Integrated Test (using Playwright or Vitest) that mocks a 'Generate' click and verifies that the resulting workout is rendered on the screen and respects the equipment filters set in the UI.`

---

## Milestone 4: Advanced Features & Deploy

### Prompt 4.1: Filter Relaxation & Scaling
**Context:** Sometimes the user's equipment is too limited. We need "smart" fallbacks. [cite: plan.md]
**Task:** `Implement 'Phase 3: Filter Relaxation' logic. If no classic WOD matches the user's equipment, the engine should find the 'Closest Match' and display which equipment is missing. 
Add a 'Rep-Volume Scaling' utility: if a user substitutes a barbell for a lighter dumbbell, increase the prescribed reps by 20%. 
Add unit tests for the scaling function to ensure it handles various equipment weight classes and returns the correct integer rep counts.`

### Prompt 4.2: Mobile Polish & Vercel Deployment
**Context:** The app is functional. It needs to look good on a phone and be live. [cite: plan.md]
**Task:** `Apply a mobile-first UI polish to the React Dashboard. Ensure the equipment grid is responsive and the workout card is easy to read on small screens. 
Add a 'Copy to Clipboard' feature for the generated workout text. 
Finally, provide the configuration files (e.g., vercel.json) and a deployment checklist to push the React frontend and Supabase configurations to Vercel. Ensure all environment variables are documented.`
