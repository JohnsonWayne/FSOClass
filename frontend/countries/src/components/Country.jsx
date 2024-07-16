const Country = ({ country, weather }) => {
    const { temp_f, wind_mph, wind_dir } = weather

return (
    <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Population {country.population}</p>
        <h2>Languages</h2>
        <ul>
        {[country.languages].map((language) => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width='200px' />
        <h2>Weather in {country.capital[0]}</h2>
        <p><strong>Temperature: </strong>{temp_f}</p>
        
        <p><strong>Wind: </strong>{wind_mph} mph {wind_dir}</p>

    </>
  )
}

export default Country