import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const OldInvoiceCopy = ({ clientData }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * This function prints the contents of a specific HTML element and restores the original contents
     * of the page after printing.
     */
    const printDiv = () => {
        if (typeof window !== 'undefined') {
            let printContents = document.getElementById('download_section').innerHTML;
            let originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            printDiv();
        }
    }, [isLoaded]);

    return (
        <>
            <Card className='invoice_popup' id="download_section">
                <h2 className='brand_name'>CURA CMS</h2>
                <div className="invoice_header_wrapper">

                    <h1 class="invoice_header">INVOICE</h1>
                </div>

                <div className='inv_id_section'>
                    {/* <Grid item xs={12} sm={6}> */}
                    <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000' }}>
                        Invoice ID : {clientData?.wrapper?.uniqueClientId}
                    </Typography>
                    {/* </Grid>
                    <Grid item xs={12} sm={6}> */}
                    <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000', textAlign: 'right' }}>
                        Date: {new Date().toLocaleDateString('en-US')}
                    </Typography>
                    {/* </Grid> */}
                </ div >

                <Grid sx={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }} container spacing={5}>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000', flexBasis: '30%' }}>
                            Client Name :
                        </Typography>
                        <Typography className='invoice_span' variant='body2' sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}>
                            <small>{clientData?.wrapper?.formData?.clientName}</small>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000', flexBasis: '30%' }}>
                            Client Phone :
                        </Typography>
                        <Typography className='invoice_span' variant='body2' sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}>
                            <small>{clientData?.wrapper?.formData?.contactNumber}</small>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000', flexBasis: '30%' }}>
                            Client Mail:
                        </Typography>
                        <Typography className='invoice_span' variant='body2' sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}>
                            <small>{clientData?.wrapper?.formData?.email}</small>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 18, color: '#000', flexBasis: '30%' }}>
                            Client Address :
                        </Typography>
                        <Typography className='invoice_span' variant='body2' sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}>
                            {clientData?.wrapper?.formData?.address}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }} container spacing={5}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Serial</TableCell>
                                        <TableCell align='center'>Service Name</TableCell>
                                        <TableCell align='center'>Service Amount</TableCell>
                                        <TableCell align='center'>Paid Amount</TableCell>
                                        <TableCell align='right'>Due Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        clientData?.wrapper?.formData?.serviceArr?.map((service, index) => (
                                            <TableRow>
                                                <TableCell align='left'>
                                                    <Typography>{index + 1}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography>{service.charAt(0).toUpperCase() + service.slice(1)}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography>
                                                        {
                                                            service === 'visa' && clientData?.wrapper?.formData?.visaPaymentAmount
                                                        }
                                                        {
                                                            service === 'reservation' && clientData?.wrapper?.formData?.reservationPaymentAmount
                                                        }
                                                        {
                                                            service === 'insurance' && clientData?.wrapper?.formData?.healthInsurancePaymentAmount
                                                        }
                                                        {
                                                            service === 'hotel' && clientData?.wrapper?.formData?.hotelPaymentAmount
                                                        }
                                                        {
                                                            service === 'transport' && clientData?.wrapper?.formData?.localTransportPaymentAmount
                                                        }
                                                        {
                                                            service === 'airportMeet' && clientData?.wrapper?.formData?.airportPaymentAmount
                                                        }
                                                        {
                                                            service === 'airAmbulance' && clientData?.wrapper?.formData?.airAmbulancePaymentAmount
                                                        }
                                                        {
                                                            service === 'doctorOPD' && clientData?.wrapper?.formData?.opdPaymentAmount
                                                        }
                                                        {
                                                            service === 'doctorIPD' && clientData?.wrapper?.formData?.ipdPaymentAmount
                                                        }
                                                        {
                                                            service === 'telemedicine' && clientData?.wrapper?.formData?.telimedeicinePaymentAmount
                                                        }
                                                        {
                                                            service === 'treatmentPlan' && clientData?.wrapper?.formData?.treatmentPlanPaymentAmount
                                                        }
                                                        {
                                                            service === 'excursion' && clientData?.wrapper?.formData?.excursionPaymentAmount
                                                        }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography>
                                                        {
                                                            service === 'visa' && clientData?.wrapper?.formData?.visapaidAmount
                                                        }
                                                        {
                                                            service === 'reservation' && clientData?.wrapper?.formData?.reservationpaidAmount
                                                        }
                                                        {
                                                            service === 'insurance' && clientData?.wrapper?.formData?.healthInsurancepaidAmount
                                                        }
                                                        {
                                                            service === 'hotel' && clientData?.wrapper?.formData?.hotelpaidAmount
                                                        }
                                                        {
                                                            service === 'transport' && clientData?.wrapper?.formData?.localTransportpaidAmount
                                                        }
                                                        {
                                                            service === 'airportMeet' && clientData?.wrapper?.formData?.airportpaidAmount
                                                        }
                                                        {
                                                            service === 'airAmbulance' && clientData?.wrapper?.formData?.airAmbulancepaidAmount
                                                        }
                                                        {
                                                            service === 'doctorOPD' && clientData?.wrapper?.formData?.opdpaidAmount
                                                        }
                                                        {
                                                            service === 'doctorIPD' && clientData?.wrapper?.formData?.ipdpaidAmount
                                                        }
                                                        {
                                                            service === 'telemedicine' && clientData?.wrapper?.formData?.telimedeicinepaidAmount
                                                        }
                                                        {
                                                            service === 'treatmentPlan' && clientData?.wrapper?.formData?.treatmentPlanpaidAmount
                                                        }
                                                        {
                                                            service === 'excursion' && clientData?.wrapper?.formData?.excursionpaidAmount
                                                        }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Typography>
                                                        {
                                                            service === 'visa' && clientData?.wrapper?.formData?.visaDueAmount
                                                        }
                                                        {
                                                            service === 'reservation' && clientData?.wrapper?.formData?.reservationDueAmount
                                                        }
                                                        {
                                                            service === 'insurance' && clientData?.wrapper?.formData?.healthInsuranceDueAmount
                                                        }
                                                        {
                                                            service === 'hotel' && clientData?.wrapper?.formData?.hotelDueAmount
                                                        }
                                                        {
                                                            service === 'transport' && clientData?.wrapper?.formData?.localTransportDueAmount
                                                        }
                                                        {
                                                            service === 'airportMeet' && clientData?.wrapper?.formData?.airportDueAmount
                                                        }
                                                        {
                                                            service === 'airAmbulance' && clientData?.wrapper?.formData?.airAmbulanceDueAmount
                                                        }
                                                        {
                                                            service === 'doctorOPD' && clientData?.wrapper?.formData?.opdDueAmount
                                                        }
                                                        {
                                                            service === 'doctorIPD' && clientData?.wrapper?.formData?.ipdDueAmount
                                                        }
                                                        {
                                                            service === 'telemedicine' && clientData?.wrapper?.formData?.telimedeicineDueAmount
                                                        }
                                                        {
                                                            service === 'treatmentPlan' && clientData?.wrapper?.formData?.treatmentPlanDueAmount
                                                        }
                                                        {
                                                            service === 'excursion' && clientData?.wrapper?.formData?.excursionDueAmount
                                                        }
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer>
                            <Table sx={{ minWidth: 800, borderBottom: 0 }} aria-label='table in dashboard'>
                                <>
                                    <TableRow>
                                        <TableCell align='right'>
                                            <Typography>
                                                Total Amount : {clientData?.wrapper?.formData?.totalPayment}
                                            </Typography>
                                            <Typography>
                                                Paid Amount : {clientData?.wrapper?.formData?.totalPaid}
                                            </Typography>
                                            <Typography>
                                                Due Amount : {clientData?.wrapper?.formData?.currentlyDue}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default OldInvoiceCopy;