import { Country } from '../components/Country'
import { useCountries } from '../data/CountryAPI'

export function App() {
  const countries = useCountries()

  return (
    <div>
      <h2>Countries</h2>
      {countries.isFetching && <span>Loading...</span>}

      {countries.data?.map((country) => (
        <Country key={country.name} data={country} />
      ))}
    </div>
  )
}
