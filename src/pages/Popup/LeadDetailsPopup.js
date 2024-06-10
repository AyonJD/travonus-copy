import React from 'react';
import { ImCross } from 'react-icons/im';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const LeadDetailsPopup = ({ setOpenPopup, data }) => {

    return (
        <div className=''>
            <div className="main_popup">
                <ImCross onClick={() => {
                    setOpenPopup(false);
                    // setReservation(false);
                }} className='cross_icon' />
                <div className="margin_top">
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography className='primary_color' variant='body2' sx={{ fontWeight: 600, display: "block", textAlign: "center", fontSize: 20 }}>
                                Lead Description
                            </Typography>
                        </Grid>


                    </Grid>
                    <Divider sx={{ marginBottom: 5 }} />
                    <Grid container spacing={2} >
                        <Grid item xs={12} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: "center" }}>
                                {data?.wrapper?.lead_details}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default LeadDetailsPopup;