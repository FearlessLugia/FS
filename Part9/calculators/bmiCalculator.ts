import { isNotNumber } from './utils';

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!(!isNotNumber(args[2]) && !isNotNumber(args[3])))
    throw new Error('Provided values were not numbers!');

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) throw new Error('Height should be larger than 0!');
  if (weight <= 0) throw new Error('Weight should be larger than 0!');

  const bmi = 10000 * weight / height / height;
  let result: string;
  if (bmi < 18.5)
    result = 'Light (unhealthy weight)';
  else if (bmi < 24)
    result = 'Normal (healthy weight)';
  else if (bmi < 28)
    result = 'Heavy (unhealthy weight)';
  else
    result = 'Overweight';
  return result;
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}


