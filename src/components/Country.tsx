import { CountryDTO } from '../data/DTO'

export function Country({ data }: { data: CountryDTO }) {
  return (
    <div key={data.name}>
      <h4>{data.name}</h4>
      <em>{data.capital}</em>
      <div>{JSON.stringify(data.currencies)}</div>
      <hr />
    </div>
  )
}
