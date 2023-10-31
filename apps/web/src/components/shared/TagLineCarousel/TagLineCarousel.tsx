import React, { useState, useEffect } from 'react'
import { Typography, Fade, Box } from '@mui/material'

const taglines = [
  'Empowering Ag Retailers with Data-driven Insights',
  'Streamlining Ag Retail with Smart Solutions',
  'Harnessing Technology for Ag Retail Success',
  'Innovating Ag Retail for the Future',
  'Modern Tools for Progressive Ag Retailers',
]

const TaglineCarousel = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % taglines.length)
    }, 3000) // Change the tagline every 3 seconds

    return () => {
      clearInterval(timer) // Cleanup on unmount
    }
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '200px', // set a minimum height to ensure box size
        alignContent: 'center',
        verticalAlign: 'center',
        paddingTop: 10,
      }}
    >
      {taglines.map((tagline, i) => (
        <Fade in={i === index} timeout={1000} key={i}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              position: 'absolute',
              width: '100%',
            }}
          >
            {tagline}
          </Typography>
        </Fade>
      ))}
    </Box>
  )
}

export default TaglineCarousel
