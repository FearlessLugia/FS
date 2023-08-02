import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
//
// const qs = require('qs')
// app.setting('query parser', (str) => qs.parse(str, { /* custom options */}))

app.get('/bmi', (req, res) => {
  // console.log('req.query', req.query)

  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.status(400).send({error: 'malformatted parameters'});
  } else {
    const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi
    });
  }
});

app.post('/web_exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || !req.body[`daily_exercises`] || !req.body.target) {
    res.status(400).send({error: 'parameters missing'});
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    if (req.body[`daily_exercises`].some((h: any) => isNotNumber(h)) || isNotNumber(req.body.target)) {
      res.status(400).send({error: 'malformatted parameters'});
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      const result = calculateExercises(req.body[`daily_exercises`], req.body.target);
      res.send(result);
    }
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});