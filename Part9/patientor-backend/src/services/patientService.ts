import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, NonSensitivePatient, Patient, SinglePatient } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientDetails = (singlePatient: SinglePatient): Patient | undefined => {
  return patients.find(p => p.id === singlePatient.id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatientDetails,
  addPatient
};