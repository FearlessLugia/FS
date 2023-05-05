import {useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [showSingleCountry, setShowSingleCountry] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log('response.data', response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const countriesToShow = useMemo(() => countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())), [countries, filterValue])

  const handleClick = (country) => {
    setShowSingleCountry(country)
  }

  return (
    <div>
      find countries <input value={filterValue} onChange={handleFilterChange}/>

      {showSingleCountry
        ? <Country country={showSingleCountry}/>
        : countriesToShow.length > 10
          ? <p>Too many matches, specify another filter</p>
          : countriesToShow.length === 1
            ? <Country country={countriesToShow.at(0)}/>
            : (<div>
              {countriesToShow.map(country => (
                <p key={country.cca3}>
                  {country.name.common}
                  <button onClick={() => handleClick(country)}>show</button>
                </p>))}
            </div>)
      }
    </div>
  )
}

export default App