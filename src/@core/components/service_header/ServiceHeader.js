import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function ServiceHeader({ icon, title }) {
    return (
        <Grid container xs={12} alignItems="center" justifyContent="center" sx={{ margin: 5, padding: 2, backgroundColor: '#faf0fa', border: 2, borderRadius: '8px' }}>
            <img className='iconImage' src={icon} alt="" />
            <Typography className='visa_color' variant='h4' ml="1rem">
                | {title}
            </Typography>
        </Grid>
    )
}