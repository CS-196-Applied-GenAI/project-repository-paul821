import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('App Dashboard', () => {
    it('renders the dashboard, clicks a few equipment toggles, and tracks state accurately', () => {
        render(<App />);

        // By default, no equipment should be selected
        const noEqBtn = screen.getByText('No Equipment');
        expect(noEqBtn).toHaveClass('chip-active');

        // Click Dumbbell
        const dumbbellBtn = screen.getByText('Dumbbell');
        expect(dumbbellBtn).toHaveClass('chip-inactive');

        fireEvent.click(dumbbellBtn);

        // Dumbbell should now be active, No Equipment should be inactive because selectedEquipment length > 0
        expect(dumbbellBtn).toHaveClass('chip-active');
        expect(noEqBtn).toHaveClass('chip-inactive');

        // Click Kettlebell
        const kettlebellBtn = screen.getByText('Kettlebell');
        fireEvent.click(kettlebellBtn);
        expect(kettlebellBtn).toHaveClass('chip-active');

        // De-select Dumbbell
        fireEvent.click(dumbbellBtn);
        expect(dumbbellBtn).toHaveClass('chip-inactive');

        // Internal state is functionally tested by checking the classes applied based on state
    });

    it('mocks a Generate click, displays a workout, then tests Shuffle', async () => {
        // Mock the WorkoutEngine dependency
        vi.mock('./lib/WorkoutEngine', () => {
            return {
                WorkoutEngine: vi.fn().mockImplementation(() => {
                    return {
                        getMatchedWODs: vi.fn().mockResolvedValue([]),
                        generateSmartWorkout: vi.fn().mockResolvedValue({
                            durationMinutes: 15,
                            type: 'AMRAP',
                            movements: [
                                { exercise_id: 'mock-1', reps: 10 }
                            ]
                        })
                    };
                })
            };
        });

        render(<App />);

        // Click generate
        const generateBtn = screen.getByText('Generate Workout');
        fireEvent.click(generateBtn);

        // Wait for results
        const resultHeading = await screen.findByText('Generated Smart Workout');
        expect(resultHeading).toBeInTheDocument();
        expect(screen.getByText('15 Min AMRAP')).toBeInTheDocument();
        expect(screen.getByText('Exercise ID: mock-1')).toBeInTheDocument();

        // Check if Shuffle button appeared
        const shuffleBtn = screen.getByText('Shuffle');
        expect(shuffleBtn).toBeInTheDocument();

        // Click Shuffle
        fireEvent.click(shuffleBtn);

        // Wait for the re-render after shuffle to prevent "act" warning
        await screen.findByText('Generated Smart Workout');
    });
});
