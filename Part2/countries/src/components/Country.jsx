import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    main: { temp: 0 },
    weather: [{ icon: '03d' }],
    wind: { speed: 0 }
  })

  const languages = []
  // for (let index in country.languages) {
  //   languages.push({
  //     id: index,
  //     language: country.languages[index]
  //   })
  // }
  Object.keys(country.languages).forEach(key => {
    languages.push({
      id: key,
      language: country.languages[key]
    })
  })

  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital.at(0)}&APPID=${api_key}&units=metric`)
      .then(response => {
        // console.log('response.data', response.data)
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital.join(' ')}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      {languages.map(item => (<li key={item.id}>{item.language}</li>))}

      <p>
        <img src={country.flags.png} width='150px' />
      </p>

      <h2>Weather in {country.capital.at(0)}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width='100px' />
      </p>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Country
