const CountryList = ({ countries, setFilteredCountries }) => 
    countries.length > 10 ? 
        'Too many matches. Please be more specific' 
        : countries.map(country => 
            <p key={country.name.common}>{country.name.common}
                <button onClick={() => setFilteredCountries([countries[0]])} >Show</button>
            </p>
        )

export default CountryList