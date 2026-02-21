-- Migration: 00001_project_wow_init.sql
-- Description: Initialize the Project WOW database schema.

-- Create enums
CREATE TYPE movement_pattern_enum AS ENUM ('push', 'pull', 'squat', 'hinge', 'core');
CREATE TYPE workout_type_enum AS ENUM ('AMRAP', 'For Time', 'EMOM');

-- Create 'exercises' table
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    movement_pattern movement_pattern_enum NOT NULL,
    equipment_required TEXT[] DEFAULT '{}',
    base_difficulty INT NOT NULL
);

-- Create 'workouts' table
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type workout_type_enum NOT NULL,
    default_movements JSONB NOT NULL DEFAULT '[]'::jsonb
);
