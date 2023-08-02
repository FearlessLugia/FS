import React, { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diaryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import Notification from './components/Notification';

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const notifyWith = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryObject: NewDiaryEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment
    };

    createDiary(diaryObject).then(data => {
      setDiaries(diaries.concat(data));

      setNewDate('');
      setNewVisibility('great');
      setNewWeather('sunny');
      setNewComment('');
    }).catch(error => {
      notifyWith(error);
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <Notification message={message}/>
      <form onSubmit={noteCreation}>
        <p>
          date
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </p>

        <p>
          visibility
          great
          <input type="radio" name="visibility" onChange={() => setNewVisibility('great')}/>
          good
          <input type="radio" name="visibility" onChange={() => setNewVisibility('good')}/>
          ok
          <input type="radio" name="visibility" onChange={() => setNewVisibility('ok')}/>
          poor
          <input type="radio" name="visibility" onChange={() => setNewVisibility('poor')}/>
        </p>

        <p>
          weather
          sunny
          <input type="radio" name="weather" onChange={() => setNewWeather('sunny')}/>
          rainy
          <input type="radio" name="weather" onChange={() => setNewWeather('rainy')}/>
          cloudy
          <input type="radio" name="weather" onChange={() => setNewWeather('cloudy')}/>
          stormy
          <input type="radio" name="weather" onChange={() => setNewWeather('stormy')}/>
          windy
          <input type="radio" name="weather" onChange={() => setNewWeather('windy')}/>
        </p>

        <p>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </p>

        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      {diaries.map(note =>
        <div key={note.id}>
          <h4>{note.date}</h4>
          <p>visibility: {note.visibility}</p>
          <p>weather: {note.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;