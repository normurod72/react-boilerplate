export type CurrencyDTO = {
  code: string
  name: string
  symbol: string
}

export type CountryDTO = {
  currencies: CurrencyDTO
  name: string
  capital: string
}
