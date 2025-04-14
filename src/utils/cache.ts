import { WeatherData } from '../types/WeatherData'

const CACHE_KEY_VALUE = 'weather_'
const TTL = 5 * 60 * 1000

type Entry = {
  data: WeatherData
  timestamp: number
}

export function setCachedWeather(city: string, data: WeatherData) {
  const entry: Entry = {
    data,
    timestamp: Date.now(),
  }

  const key = CACHE_KEY_VALUE + city.toLowerCase()
  localStorage.setItem(key, JSON.stringify(entry))
}

export function getCachedWeather(city: string) {
  const key = CACHE_KEY_VALUE + city.toLowerCase()
  const cached = localStorage.getItem(key)

  if (!cached) return null

  try {
    const parsed: Entry = JSON.parse(cached)
    const now = Date.now()

    if (now - parsed.timestamp < TTL) {
      return parsed.data
    }

    localStorage.removeItem(key)
    return null
  } catch (error) {
    console.error('Failed to parse cached weather data:', error)
    localStorage.removeItem(key)
    return null
  }
}
