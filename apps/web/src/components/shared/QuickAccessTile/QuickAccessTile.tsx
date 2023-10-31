import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material'

interface QuickAccessTileProps {
  title: string
  subtitle: string
  icon: React.ReactElement
  onAction: () => void
}

const QuickAccessTile: React.FC<QuickAccessTileProps> = ({
  title,
  subtitle,
  icon,
  onAction,
}) => {
  return (
    <Card
      sx={{
        minWidth: 225,
        minHeight: 225,
        m: 1,
        borderRadius: 3,
      }}
    >
      <CardActionArea
        onClick={onAction}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            color="text.secondary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 1,
              paddingTop: 2,
            }}
          >
            {React.cloneElement(icon, { style: { fontSize: 48 } })}
          </Box>
          <Box sx={{ justifyContent: 'center', mb: 1, paddingTop: 6 }}>
            <Typography
              gutterBottom
              variant="h6"
              noWrap
              component="div"
              color="text.secondary"
              fontWeight={'bold'}
              textAlign={'center'}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={'center'}
            >
              {subtitle}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default QuickAccessTile
