import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('Dashboard UI State', () => {
  it('renders the dashboard with equipment toggles and generate button', () => {
    render(<App />)

    expect(screen.getByText('WOW')).toBeInTheDocument()
    expect(screen.getByText('No Equipment')).toBeInTheDocument()
    expect(screen.getByText('Dumbbell')).toBeInTheDocument()
    expect(screen.getByText('Kettlebell')).toBeInTheDocument()
    expect(screen.getByText('Barbell')).toBeInTheDocument()
    expect(screen.getByText('Generate Workout')).toBeInTheDocument()
  })

  it('shows No Equipment as active by default', () => {
    render(<App />)

    const noEquipBtn = screen.getByText('No Equipment').closest('button')!
    expect(noEquipBtn).toHaveClass('chip-active')
  })

  it('toggles equipment chips on click and deactivates No Equipment', () => {
    render(<App />)

    const noEquipBtn = screen.getByText('No Equipment').closest('button')!
    const dumbbellBtn = screen.getByText('Dumbbell').closest('button')!

    // Initially: No Equipment is active, Dumbbell is inactive
    expect(noEquipBtn).toHaveClass('chip-active')
    expect(dumbbellBtn).toHaveClass('chip-inactive')

    // Click Dumbbell — should become active, No Equipment becomes inactive
    fireEvent.click(dumbbellBtn)
    expect(dumbbellBtn).toHaveClass('chip-active')
    expect(noEquipBtn).toHaveClass('chip-inactive')
  })

  it('can select multiple equipment items', () => {
    render(<App />)

    const dumbbellBtn = screen.getByText('Dumbbell').closest('button')!
    const kettlebellBtn = screen.getByText('Kettlebell').closest('button')!

    fireEvent.click(dumbbellBtn)
    fireEvent.click(kettlebellBtn)

    expect(dumbbellBtn).toHaveClass('chip-active')
    expect(kettlebellBtn).toHaveClass('chip-active')
  })

  it('deselects equipment on second click', () => {
    render(<App />)

    const dumbbellBtn = screen.getByText('Dumbbell').closest('button')!

    // Click to select
    fireEvent.click(dumbbellBtn)
    expect(dumbbellBtn).toHaveClass('chip-active')

    // Click again to deselect
    fireEvent.click(dumbbellBtn)
    expect(dumbbellBtn).toHaveClass('chip-inactive')

    // No Equipment should return to active
    const noEquipBtn = screen.getByText('No Equipment').closest('button')!
    expect(noEquipBtn).toHaveClass('chip-active')
  })

  it('clicking No Equipment clears all equipment selections', () => {
    render(<App />)

    const noEquipBtn = screen.getByText('No Equipment').closest('button')!
    const dumbbellBtn = screen.getByText('Dumbbell').closest('button')!
    const kettlebellBtn = screen.getByText('Kettlebell').closest('button')!

    // Select some equipment
    fireEvent.click(dumbbellBtn)
    fireEvent.click(kettlebellBtn)
    expect(dumbbellBtn).toHaveClass('chip-active')
    expect(kettlebellBtn).toHaveClass('chip-active')

    // Click No Equipment to clear all
    fireEvent.click(noEquipBtn)
    expect(noEquipBtn).toHaveClass('chip-active')
    expect(dumbbellBtn).toHaveClass('chip-inactive')
    expect(kettlebellBtn).toHaveClass('chip-inactive')
  })
})

describe('Integration: Generate & Shuffle', () => {
  it('renders a generated smart workout when Generate is clicked', async () => {
    // Mock the WorkoutEngine module for component isolation
    vi.doMock('./lib/WorkoutEngine', () => ({
      WorkoutEngine: vi.fn().mockImplementation(() => ({
        getMatchedWODs: vi.fn().mockResolvedValue({ wods: [], isBodyweightFallback: false }),
        generateSmartWorkout: vi.fn().mockResolvedValue({
          durationMinutes: 15,
          type: 'EMOM',
          movements: [
            { exercise_id: 'mock-1', name: 'Push Up', reps: 15 },
            { exercise_id: 'mock-2', name: 'Pull Up', reps: 25 },
            { exercise_id: 'mock-3', name: 'Air Squat', reps: 10 },
          ],
        }),
      })),
    }))

    // Re-import App to pick up the mock
    const { default: MockedApp } = await import('./App')
    render(<MockedApp />)

    fireEvent.click(screen.getByText('Generate Workout'))

    // Wait for async generation to complete
    await waitFor(() => {
      expect(screen.getByText('Generated Smart Workout')).toBeInTheDocument()
    })

    expect(screen.getByText('15 Min EMOM')).toBeInTheDocument()
    expect(screen.getByText('Push Up')).toBeInTheDocument()
    expect(screen.getByText('Pull Up')).toBeInTheDocument()
    expect(screen.getByText('Air Squat')).toBeInTheDocument()

    // Shuffle button should appear after generation
    expect(screen.getByText('↻ Shuffle')).toBeInTheDocument()

    vi.doUnmock('./lib/WorkoutEngine')
  })

  it('renders a classic WOD when matched WODs are found', async () => {
    vi.doMock('./lib/WorkoutEngine', () => ({
      WorkoutEngine: vi.fn().mockImplementation(() => ({
        getMatchedWODs: vi.fn().mockResolvedValue({
          wods: [
            {
              id: 'wod-1',
              name: 'Cindy',
              type: 'AMRAP',
              default_movements: [
                { exercise_id: 'ex-1', reps: 5 },
                { exercise_id: 'ex-2', reps: 10 },
                { exercise_id: 'ex-3', reps: 15 },
              ],
            },
          ],
          isBodyweightFallback: false,
        }),
        generateSmartWorkout: vi.fn(),
      })),
    }))

    const { default: MockedApp } = await import('./App')
    render(<MockedApp />)

    fireEvent.click(screen.getByText('Generate Workout'))

    await waitFor(() => {
      expect(screen.getByText('Classic WOD')).toBeInTheDocument()
    })

    expect(screen.getByText('Cindy')).toBeInTheDocument()

    vi.doUnmock('./lib/WorkoutEngine')
  })
})
