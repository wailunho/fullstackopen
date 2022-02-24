import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
  const [weather, setWeather] = useState()
  useEffect(() => {
    console.log(country)
    axios(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`)
      .then(({ data }) => {
        setWeather(data)
      })
  }, [])
  if (country && weather) {
    console.log(weather)
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather"/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
  return (
    <></>
  )
}

const Results = ({ search, results, handleClick }) => {
  if (!search) {
    return (
      <></>
    )
  } else if (10 < results.length) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (1 < results.length && results.length <= 10) {
    return (
      <div>
        {results.map(x => <div key={x.name.common}><span>{x.name.common}</span>
          <button onClick={handleClick(x.name.common)}>show</button>
          <br></br></div>)}
      </div>
    )
  } else if (!results.length) {
    return (
      <></>
    )
  } else if (results.length === 1) {
    const c = results[0]
    const languages = []
    for (let v of Object.values(c.languages)) {
      languages.push(<li key={v}>{v}</li>)
    }
    return (
      <div>
        <h1>{c.name.common}</h1>
        <div>capital {c.capital}</div>
        <div>area {c.area}</div>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img alt="flag" height="150" src={c.flags.png}/>
        <Weather country={c}/>
      </div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios('https://restcountries.com/v3.1/all')
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClickShow = (country) => {
    return () => {
      setSearch(country)
    }
  }

  const results = countries.filter(x => x.name.common.match(new RegExp(search, 'i')))

  return (
    <div>
      find countries <input value={search} onChange={handleChange}/>
      <Results search={search} results={results} handleClick={handleClickShow}/>
    </div>
  )
}

export default App
