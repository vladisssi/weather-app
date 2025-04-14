import { Card, CardContent, Typography } from '@mui/material'
import { WeatherData } from '../types/WeatherData'
import { capitalizeWords } from '../utils/textUtils'

type Props = {
  weatherData: WeatherData | null
}

const WeatherCard = ({ weatherData }: Props) => {
  const lastUpdated = weatherData
    ? new Date(weatherData.dt * 1000).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: 'short',
      })
    : ''

  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h6">{weatherData?.name}</Typography>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          alt="weather"
          style={{ width: 50 }}
        />
        <Typography variant="h4">
          {Math.round(weatherData?.main.temp || 0)}°C
        </Typography>
        <Typography variant="body1">
          {capitalizeWords(weatherData?.weather[0].description || '')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated: {lastUpdated}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
