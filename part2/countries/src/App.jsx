import { useState, useEffect } from 'react'
import Country from './components/Country'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import countryService from './services/countries'


const App = () => {
  // states
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])
  const [weather, setWeather] = useState({})
  

  //effects
  useEffect(() => {
    countryService
      .getAll()
      .then((initialData => {
        setCountries(initialData)
        setFilteredCountries(initialData)
      }))
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setFilteredCountries(filteredCountries)
  }, [search, countries])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      countryService
      .getCountryWeather(filteredCountries[0].capital[0])
      .then((res => {
        setWeather(res)
        console.log(weather.current)
      }
      ))
    }
  }, [filteredCountries])

  //methods
  // filter

  return (
    <>
      <Filter search={search} setSearch={setSearch} />
      <br />
      {filteredCountries.length === 1 ? <Country country={filteredCountries[0]} weather={weather} /> : <CountryList countries={filteredCountries} setFilteredCountries={setFilteredCountries} />}
    </>
  )
}

export default App