import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { useAPI } from '../api/API'
import { CountryDTO } from './DTO'

export function useCountryAPI() {
  const api = useAPI()

  return useMemo(
    () => ({
      getCountries: () =>
        api.requestResource<CountryDTO[]>('/all', {
          params: { fields: 'name;capital;currencies' },
        }),

      getCountryDetails: (countryName: string) => api.requestResource(`/name/${countryName}`),
    }),
    [api]
  )
}

export function useCountries() {
  const { getCountries } = useCountryAPI()
  return useQuery('countries', getCountries)
}
