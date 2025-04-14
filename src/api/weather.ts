import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const axiosWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getWeatherByCityApi = async (city: string) => {
  const response = await axiosWeather.get('', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'en',
    },
  })

  return response.data
}
