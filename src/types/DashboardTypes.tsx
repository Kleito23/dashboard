export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
}

export type CityKey = 'guayaquil' | 'quito' | 'manta' | 'cuenca'

export interface CityOption {
  label: string
  latitude: number
  longitude: number
}

export const CITY_OPTIONS: Record<CityKey, CityOption> = {
  guayaquil: {
    label: 'Guayaquil',
    latitude: -2.170998,
    longitude: -79.922359,
  },
  quito: {
    label: 'Quito',
    latitude: -0.180653,
    longitude: -78.467834,
  },
  manta: {
    label: 'Manta',
    latitude: -0.967653,
    longitude: -80.70891,
  },
  cuenca: {
    label: 'Cuenca',
    latitude: -2.900128,
    longitude: -79.005896,
  },
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  wind_speed_10m: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  apparent_temperature: number[]
  wind_speed_10m: number[]
}
