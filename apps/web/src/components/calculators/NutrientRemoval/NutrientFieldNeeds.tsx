import React from 'react'
import { Typography, Button } from '@mui/material'
import { AddOutlined, RemoveOutlined } from '@mui/icons-material'

const FieldNeeds: React.FC<{ fieldNeedsData: any }> = ({ fieldNeedsData }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {Object.keys(fieldNeedsData).map((fieldNeed: any) => {
        return (
          <div style={{ flex: '25%' }}>
            <Typography
              key={fieldNeed.id}
              textAlign={'center'}
              display={'flex'}
              justifyContent={'space-around'}
              width={'70%'}
              margin={'auto'}
            >
              <div
                style={{ fontWeight: 700, width: '100%', textAlign: 'right' }}
              >
                {fieldNeed} :
              </div>
              <div style={{ width: '50%', textAlign: 'right' }}>
                {fieldNeedsData[fieldNeed]}
              </div>
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

interface NutrientFieldNeedsProps {
  fieldNeeds: any
}

export const NutrientFieldNeeds: React.FC<NutrientFieldNeedsProps> = ({
  fieldNeeds,
}) => {
  const [expanded, setExpanded] = React.useState<Boolean>(false)

  const slicedFieldNeeds = Object.fromEntries(
    Object.entries(fieldNeeds).slice(0, 4),
  )

  return (
    <div>
      <Typography color="text.primary" fontWeight={700} textAlign={'center'}>
        Field Needs <span style={{ fontStyle: 'italic' }}>(lbs/acre)</span>
      </Typography>
      <FieldNeeds fieldNeedsData={expanded ? fieldNeeds : slicedFieldNeeds} />
      {expanded ? (
        <Button
          style={{ margin: 'auto', display: 'block' }}
          onClick={() => setExpanded(false)}
        >
          <RemoveOutlined /> View Less Nutrients
        </Button>
      ) : (
        <Button
          style={{ margin: 'auto', display: 'block' }}
          onClick={() => setExpanded(true)}
        >
          <AddOutlined /> Show More Nutrients
        </Button>
      )}
    </div>
  )
}
