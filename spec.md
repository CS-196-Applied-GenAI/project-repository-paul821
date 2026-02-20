# Project WOW: Workout of the Week
**Version:** 1.0  
**Project Goal:** A web-based application that eliminates "analysis paralysis" by generating randomized CrossFit workouts based on specific user constraints.

---

## 1. User Interface (UI) & Experience
### 1.1 Single-Screen Dashboard
The app will feature a clean, mobile-optimized single-screen interface where users toggle all preferences before generating.
* **Filters:**
    * **Time Duration:** 30, 45, 60 minutes.
    * **Workout Area:** Upper Body, Lower Body, Overall.
    * **Equipment:** Home (Bodyweight), Minimal Gym (Dumbbells/Kettlebells), Commercial Gym (Full access).
    * **Objective:** Strength, Hypertrophy, Cardio.
    * **Skills Toggle:** Include/Exclude Olympic Lifting and Gymnastics.
    * **Experience Level:** Beginner, Intermediate, Advanced (used for intensity scaling).

### 1.2 Core Actions
* **"Generate WOW" Button:** Triggers the selection logic.
* **"Shuffle" Button:** Instantly re-rolls a new workout using the same active filters.
* **Output Display:** Shows Workout Name (if classic), list of movements/reps, Goal Time, and a Stimulus Note.

---

## 2. Technical Logic (The "Engine")
### 2.1 The Selection Hierarchy
When a user hits "Generate," the app follows this priority:
1.  **Phase 1: Database Match.** Search the pre-defined database for established/classic WODs matching all filters.
2.  **Phase 2: Smart Stacker (The Fallback).** If no classic WOD matches, the engine builds a workout using the **Template Logic** (Section 2.2).
3.  **Phase 3: Filter Relaxation.** If constraints are too tight to build a workout, the app "relaxes" the most restrictive filter (e.g., Duration or Area) to provide the closest match.

### 2.2 Template Logic (The "Smart Stacker")
Custom workouts must follow the structure of established programming:
* **30 Min:** Warm-up (7m) -> Main WOD (20m) -> Cool-down (3m).
* **45 Min:** Warm-up (10m) -> Strength/Skill (15m) -> Main WOD (15m) -> Accessory (5m).
* **60 Min:** Warm-up (12m) -> Strength/Skill (20m) -> Main WOD (20m) -> Accessory (8m).

### 2.3 Intensity & Equipment Scaling
* **Intensity Maintenance:** If a movement is swapped (e.g., Barbell to Dumbbell), the app must adjust reps/volume to maintain the original "Power Output" or time-domain stimulus.
* **Balanced Movement Rule:** For "Overall" workouts, the algorithm must ensure a distribution of Push, Pull, Squat, and Hinge movements.

---

## 3. Data Structure
### 3.1 Exercise Metadata
Every exercise in the library must be tagged with:
* **Modality:** Metabolic Conditioning (M), Gymnastics (G), Weightlifting (W).
* **Body Area:** Upper, Lower, Core.
* **Equipment Required:** Barbell, DB, Rack, etc.
* **Substitution ID:** Links to similar movements for equipment swaps.

### 3.2 Workout Metadata
Classic WOD entries include:
* **Source:** (e.g., "The Girls," "Hero WODs").
* **Stimulus Note:** Description of intended feel.
* **Goal Time:** Target completion time.

---

## 4. Tech Stack Recommendations
* **Frontend:** React or Vue.js (for reactive UI and state management).
* **Database:** Supabase or Firebase (to store the movement/WOD library).
* **Deployment:** Vercel or Netlify for fast, mobile-responsive web hosting.
