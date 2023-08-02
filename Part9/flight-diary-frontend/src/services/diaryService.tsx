import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createDiary = (object: NewDiaryEntry): Promise<DiaryEntry> => {
  const request = axios.post<DiaryEntry>(baseUrl, object);
  return new Promise((resolve, reject) => {
    request
      .then(response => resolve(response.data))
      .catch((error) => {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
          return reject(error.response?.data);
        } else {
          return reject(error);
        }
      });
  });
};