import { Entry, Gender, NewPatient, SinglePatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isEntry = (param: any): param is Entry => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   return Object.values(Entry).includes(param);
// };

// const parseEntries = (entries: unknown): Entry[] => {
//   if (!isEntry(entry)) {
//     throw new Error('Incorrect or missing entry: ' + entry);
//   }
//   switch (entries)
//   return entry;
// };


export const toNewPatient = (object: unknown): NewPatient => {

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object
    && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // entries: parseEntries(object.entries)
      entries: object.entries as Entry[]
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toSinglePatient = (object: unknown): SinglePatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('id' in object) {
    const singlePatient: SinglePatient = {
      id: parseId(object.id)
    };

    return singlePatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};