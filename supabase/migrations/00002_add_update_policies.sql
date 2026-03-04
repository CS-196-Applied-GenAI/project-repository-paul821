-- Add UPDATE RLS policies so the seed script can refresh existing rows
-- (Original migration only had SELECT + INSERT)

CREATE POLICY "Allow public update on exercises"
    ON exercises FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public update on workouts"
    ON workouts FOR UPDATE
    USING (true)
    WITH CHECK (true);
