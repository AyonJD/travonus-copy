import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { loadStorage } from 'src/Utils/func'

const UserCard = () => {
  const user = loadStorage('cura_user')

  return (
    <Card sx={{ backgroundColor: '#7030A0' }}>
      <CardHeader
        title={
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: 23,
              marginTop: 2,
              color: '#fff',
            }}
          >
            User Info
          </Typography>
        }
        subheader={
          <>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: 13,
                marginTop: 2,
                color: '#fff',
              }}
            >
              {`Name: ${user?.name}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: 13, color: '#fff' }}
            >
              {`Role: ${user?.role}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: 13, color: '#fff' }}
            >
              {`ID: ${user?.UserIDCode}`}
            </Typography>
          </>
        }
      />
    </Card>
  )
}

export default UserCard
