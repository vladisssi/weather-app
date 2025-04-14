import { Button, TextField } from '@mui/material'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  onSubmit: (city: string) => void
}

export default function WeatherForm({ children, onSubmit }: Props) {
  const [title, setTitle] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    onSubmit(title)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter city"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{ padding: '10px 0' }}
          disabled={!title.trim()}
        >
          Get Weather
        </Button>
      </form>

      {children}
    </div>
  )
}
