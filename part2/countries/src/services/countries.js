import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const baseWeatherURL = 'http://api.weatherapi.com/v1/current.json'
const weatherApiKey = ''

const getAll = () => {
    const request = axios.get(`${baseUrl}all/`)
    return request.then(response => response.data)
}

const getCountryWeather = (capital) => {
    const request = axios.get(`${baseWeatherURL}?key=${weatherApiKey}&q=${capital}`)
    return request.then(response => response.data)
}

export default { getAll, getCountryWeather }