import WeatherCard from './components/WeatherCard'
import WeatherForm from './components/WeatherForm'
import { Typography } from '@mui/material'
import { getWeatherByCityApi } from './api/weather'
import { useState } from 'react'
import { WeatherData } from './types/WeatherData'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { getCachedWeather, setCachedWeather } from './utils/cache'

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getWeatherByCity(city: string) {
    setIsLoading(true)
    try {
      const cached = getCachedWeather(city)
      if (cached) {
        setWeatherData(cached)
        toast.info(`Loaded from cache`)
        return
      }

      const weather = await getWeatherByCityApi(city)

      setWeatherData(weather)
      setCachedWeather(city, weather)
      toast.success(`Weather for ${weather.name} loaded!`)
    } catch {
      toast.error(`City not found or API error`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        marginTop: 75,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Weather App
      </Typography>
      <WeatherForm onSubmit={getWeatherByCity}>
        {isLoading ? (
          <CircularProgress style={{ marginTop: 20 }} />
        ) : (
          weatherData && <WeatherCard weatherData={weatherData} />
        )}
      </WeatherForm>
    </div>
  )
}

export default WeatherApp
