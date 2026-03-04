-- Project WOW: Database Schema Initialization
-- This migration creates the core tables for the Workout of the Week application.

-- Create custom enum types
CREATE TYPE movement_pattern_enum AS ENUM ('push', 'pull', 'squat', 'hinge', 'core');
CREATE TYPE workout_type_enum AS ENUM ('AMRAP', 'For Time', 'EMOM');

-- Create 'exercises' table
-- Stores individual movements with their properties and equipment requirements.
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    movement_pattern movement_pattern_enum NOT NULL,
    equipment_required TEXT[] DEFAULT '{}',
    base_difficulty INT NOT NULL CHECK (base_difficulty BETWEEN 1 AND 10)
);

-- Create 'workouts' table
-- Stores classic/named WODs with their structure and movement references.
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    type workout_type_enum NOT NULL,
    default_movements JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Enable Row Level Security
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon key can SELECT)
CREATE POLICY "Allow public read access on exercises"
    ON exercises FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on workouts"
    ON workouts FOR SELECT
    USING (true);

-- Allow public insert access (for seeding via anon key)
CREATE POLICY "Allow public insert on exercises"
    ON exercises FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public insert on workouts"
    ON workouts FOR INSERT
    WITH CHECK (true);
