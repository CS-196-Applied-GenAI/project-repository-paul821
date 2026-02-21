import { useState } from 'react';
import type { GeneratedTimeBlock, Workout } from './lib/WorkoutEngine';
import { WorkoutEngine } from './lib/WorkoutEngine';

const engine = new WorkoutEngine();

const EQUIPMENT_OPTIONS = [
  'Pull Up Bar',
  'Barbell',
  'Dumbbell',
  'Kettlebell',
  'Medicine Ball',
  'Plyo Box',
  'Jump Rope',
  'Rings',
  'Rower'
];

export default function App() {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [result, setResult] = useState<Workout[] | GeneratedTimeBlock | null>(null);

  const toggleEquipment = (eq: string) => {
    setSelectedEquipment(prev =>
      prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]
    );
  };

  const handleGenerate = async () => {
    try {
      const wods = await engine.getMatchedWODs(selectedEquipment);
      if (wods.length > 0) {
        const randomWod = wods[Math.floor(Math.random() * wods.length)];
        setResult([randomWod]);
      } else {
        const generated = await engine.generateSmartWorkout(15, selectedEquipment);
        setResult(generated);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = () => {
    if (!result) return;

    let textToCopy = '';
    if (Array.isArray(result) && result.length > 0) {
      textToCopy = `Workout: ${result[0].name}\nType: ${result[0].type}\n`;
      result[0].default_movements.forEach(m => {
        textToCopy += `- ID ${m.exercise_id}: ${m.reps} reps\n`;
      });
    } else if (!Array.isArray(result) && result) {
      textToCopy = `Smart Workout: ${result.durationMinutes} Min ${result.type}\n`;
      result.movements.forEach((m: any) => {
        textToCopy += `- ID ${m.exercise_id}: ${m.reps} reps\n`;
      });
    }

    navigator.clipboard.writeText(textToCopy);
    alert('Workout copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Project WOW</h1>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Available Equipment</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Equipment Options">
            <button
              onClick={() => setSelectedEquipment([])}
              className={`chip ${selectedEquipment.length === 0 ? 'chip-active' : 'chip-inactive'}`}
            >
              No Equipment
            </button>
            {EQUIPMENT_OPTIONS.map(eq => (
              <button
                key={eq}
                onClick={() => toggleEquipment(eq)}
                className={`chip ${selectedEquipment.includes(eq) ? 'chip-active' : 'chip-inactive'}`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <button
            onClick={handleGenerate}
            className="btn btn-primary flex-1 py-3 text-base sm:text-lg"
          >
            Generate Workout
          </button>
          {result && (
            <button
              onClick={handleGenerate}
              className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex-1 py-3 text-base sm:text-lg"
            >
              Shuffle
            </button>
          )}
        </div>

        {result && (
          <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
            <div className="flex justify-between flex-wrap items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Results</h2>
              <button onClick={handleCopy} className="text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded font-medium transition-colors">
                Copy to Clipboard
              </button>
            </div>

            {Array.isArray(result) ? (
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-lg sm:text-xl">Classic WOD Match</h3>
                {result.length > 0 ? (
                  <ul className="space-y-4">
                    {result.map(wod => (
                      <li key={wod.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                          <div className="font-bold text-xl sm:text-2xl text-gray-900">{wod.name}</div>
                          <span className="self-start sm:self-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold">{wod.type}</span>
                        </div>
                        <ul className="space-y-2 mt-4">
                          {wod.default_movements.map((m, i) => (
                            <li key={i} className="flex justify-between text-gray-700 border-b pb-1 last:border-0 text-sm sm:text-base">
                              <span>Exercise ID: {m.exercise_id}</span>
                              <span className="font-medium">{m.reps} reps</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-lg sm:text-xl">Generated Smart Workout</h3>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl sm:text-2xl font-bold">{result.durationMinutes} Min {result.type}</span>
                  </div>
                  <ul className="space-y-2">
                    {result.movements.map((m: any, i: number) => (
                      <li key={i} className="flex justify-between text-gray-700 border-b pb-1 last:border-0 text-sm sm:text-base">
                        <span>Exercise ID: {m.exercise_id}</span>
                        <span className="font-medium">{m.reps} reps</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
