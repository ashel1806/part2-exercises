import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Weather = ({ countryWeather }) => {
  const [weather, setNewWeather] = useState([]);

  const params = {
    access_key: 'cca84e02afde5cd081007c2b9e5a2be8',
    query: countryWeather.name
  }
  
  const {arg1, arg2} = params;

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        // console.log(response.data)
        setNewWeather([response.data.current])
      })
  },[arg1, arg2])

  return (
    weather.map(w => 
      <div key={params.query}>
        <h2>Weather in {params.query}</h2>
        <p>
          <strong>temperature: </strong>
          {w.temperature}
        </p>
        <img src={`${w.weather_icons[0]}`} alt="tem"/>
        <p>
          <strong>wind: </strong>
          {w.wind_speed} mph direction {w.wind_dir}
        </p>
      </div>
    )
    )
}

const Country = ({ title, event} ) => {
  return(
  <div>
    <span>{title}</span>
    <button onClick={event}>
      show
    </button>
  </div>
  )
}

const Countries = ({ name, country }) => {
  const [show, setShow] = useState(true);

  return (
    show 
      ? <Country 
          title={name} 
          event={() => setShow(!show)}
        />
      : <ShowCountry 
          key={country.numericCode}
          country={country}
        />
  )
}

const ShowCountry = ({country}) => {
  const countryObject = {
    name: country.name,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    languages: country.languages
  }
  
  // console.log(country.cFlag);
  return (
    <div>
      <h1>{countryObject.name}</h1>
      <p>capital: {countryObject.capital}</p>
      <p>population: {countryObject.population}</p>
      <h2>Languages</h2>
      <ul>
        {countryObject.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={`${countryObject.flag}`} height="200" alt={country.cName}/>
      <Weather countryWeather={countryObject} />  
    </div>

  )
}

const App = () => {
  const [countries, setNewCountries] = useState([]);
  const [searchCountry, setNewSearch] = useState("");
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log(response.data)
        setNewCountries(response.data)
      })
  }, [])
  
  let filteredCountries = searchCountry === ""
    ? []
    : countries.filter(country => 
        country.name.toLowerCase()
          .indexOf(searchCountry.toLocaleLowerCase()) !== -1)
  
  const handleSearchCountrie = (e) => {
    // console.log(e.target.value);
    setNewSearch(e.target.value)
  }

  return (
    <div>
      find countries{" "}
      <input 
        value={searchCountry}
        onChange={handleSearchCountrie}
      />
      <div>
        {filteredCountries.length > 10 
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1
            ? filteredCountries.map(country => 
                <ShowCountry 
                  key={country.numericCode}
                  country={country}
                />)
            : filteredCountries.map(country => 
                <Countries
                  key={country.numericCode} 
                  name={country.name}
                  country={country}
                />)
        }
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
