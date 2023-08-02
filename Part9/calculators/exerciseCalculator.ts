import { isNotNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ExerciseValues {
  dailyHours: number[],
  target: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (!(args.slice(2, -1).map(a => !isNotNumber(a)) && !isNotNumber(args.at(-1))))
    throw new Error('Provided values were not numbers!');

  return {
    dailyHours: args.slice(2, -1).map(a => Number(a)),
    target: Number(args.at(-1))
  };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  if (dailyHours.some(h => h < 0)) throw new Error('dailyHour should be at least 0!');
  if (target < 0) throw new Error('target should be at least 0!');

  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(d => d > 0).length;
  const average = dailyHours.reduce((s, p) => s + p) / periodLength;
  const rating = average > target
    ? 3 : average / target >= 0.8
      ? 2
      : 1;
  const ratingDescription = average > target
    ? 'good job'
    : average / target >= 0.8
      ? 'not too bad but could be better'
      : 'need improvement';

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success: average >= target,
    rating,
    ratingDescription
  };
};

try {
  const {dailyHours, target} = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}