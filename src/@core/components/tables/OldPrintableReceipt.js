import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { generateUniqueChar } from 'src/Utils/func'

const PrintableReceipt = ({ clientData, serviceFromStorage }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const serviceArray = [
    'visa',
    'reservation',
    'insurance',
    'hotel',
    'transport',
    'airportMeet',
    'airAmbulance',
    'doctorOPD',
    'doctorIPD',
    'telemedicine',
    'treatmentPlan',
    'excursion',
  ]

  /**
   * This function prints the contents of a specific HTML element and restores the original contents
   * of the page after printing.
   */
  const printDiv = () => {
    if (typeof window !== 'undefined') {
      let printContents = document.getElementById('download_section').innerHTML
      let originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      printDiv()
    }
  }, [isLoaded])

  return (
    <>
      <Card className="invoice_popup" id="download_section">
        <h1 className="invoice_header">Money Receipt</h1>
        <div className="inv_id_section">
          {/* <Grid item xs={12} sm={6}> */}
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: 18, color: '#000' }}
          >
            Money Receipt ID : {generateUniqueChar()}
          </Typography>
          {/* </Grid>
                    <Grid item xs={12} sm={6}> */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: '#000',
              textAlign: 'right',
            }}
          >
            Date: {new Date().toLocaleDateString('en-US')}
          </Typography>
          {/* </Grid> */}
        </div>

        <Grid
          sx={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }}
          container
          spacing={5}
        >
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: '#000',
                flexBasis: '30%',
              }}
            >
              Client Name :
            </Typography>
            <Typography
              className="invoice_span"
              variant="body2"
              sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}
            >
              <small>{clientData?.wrapper?.formData?.clientName}</small>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: '#000',
                flexBasis: '30%',
              }}
            >
              Client Phone :
            </Typography>
            <Typography
              className="invoice_span"
              variant="body2"
              sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}
            >
              <small>{clientData?.wrapper?.formData?.contactNumber}</small>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: '#000',
                flexBasis: '30%',
              }}
            >
              Client Mail:
            </Typography>
            <Typography
              className="invoice_span"
              variant="body2"
              sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}
            >
              <small>{clientData?.wrapper?.formData?.email}</small>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: '#000',
                flexBasis: '30%',
              }}
            >
              Client Address :
            </Typography>
            <Typography
              className="invoice_span"
              variant="body2"
              sx={{ fontSize: 18, color: '#000', flexGrow: 1 }}
            >
              {clientData?.wrapper?.formData?.address}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }}
          container
          spacing={5}
        >
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                <TableHead sx={{ background: '#eeeef8' }}>
                  <TableRow>
                    <TableCell align="left">Serial</TableCell>
                    <TableCell align="center">Service Name</TableCell>
                    <TableCell align="center">Service Amount</TableCell>
                    <TableCell align="center">Paid Amount</TableCell>
                    <TableCell align="right">Due Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientData?.wrapper?.formData?.serviceArr?.map(
                    (service, index) => {
                      if (service === serviceFromStorage) {
                        return (
                          <TableRow>
                            <TableCell align="left">
                              <Typography>{index + 1}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {service.charAt(0).toUpperCase() +
                                  service.slice(1)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {service === 'visa' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.visaPaymentAmount}
                                {service === 'reservation' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.reservationPaymentAmount}
                                {service === 'insurance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsurancePaymentAmount}
                                {service === 'hotel' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.hotelPaymentAmount}
                                {service === 'transport' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportPaymentAmount}
                                {service === 'airportMeet' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airportPaymentAmount}
                                {service === 'airAmbulance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulancePaymentAmount}
                                {service === 'doctorOPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.opdPaymentAmount}
                                {service === 'doctorIPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.ipdPaymentAmount}
                                {service === 'telemedicine' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicinePaymentAmount}
                                {service === 'treatmentPlan' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanPaymentAmount}
                                {service === 'excursion' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.excursionPaymentAmount}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {service === 'visa' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.visapaidAmount}
                                {service === 'reservation' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.reservationpaidAmount}
                                {service === 'insurance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsurancepaidAmount}
                                {service === 'hotel' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.hotelpaidAmount}
                                {service === 'transport' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportpaidAmount}
                                {service === 'airportMeet' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airportpaidAmount}
                                {service === 'airAmbulance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulancepaidAmount}
                                {service === 'doctorOPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.opdpaidAmount}
                                {service === 'doctorIPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.ipdpaidAmount}
                                {service === 'telemedicine' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicinepaidAmount}
                                {service === 'treatmentPlan' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanpaidAmount}
                                {service === 'excursion' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.excursionpaidAmount}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {service === 'visa' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.visaDueAmount}
                                {service === 'reservation' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.reservationDueAmount}
                                {service === 'insurance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsuranceDueAmount}
                                {service === 'hotel' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.hotelDueAmount}
                                {service === 'transport' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportDueAmount}
                                {service === 'airportMeet' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airportDueAmount}
                                {service === 'airAmbulance' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulanceDueAmount}
                                {service === 'doctorOPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.opdDueAmount}
                                {service === 'doctorIPD' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData?.ipdDueAmount}
                                {service === 'telemedicine' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicineDueAmount}
                                {service === 'treatmentPlan' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanDueAmount}
                                {service === 'excursion' &&
                                  service === serviceFromStorage &&
                                  clientData?.wrapper?.formData
                                    ?.excursionDueAmount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table
                sx={{ minWidth: 800, borderBottom: 0 }}
                aria-label="table in dashboard"
              >
                <>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>
                        Total Amount :{' '}
                        {clientData?.wrapper?.formData?.totalPayment}
                      </Typography>
                      <Typography>
                        Paid Amount : {clientData?.wrapper?.formData?.totalPaid}
                      </Typography>
                      <Typography>
                        Due Amount :{' '}
                        {clientData?.wrapper?.formData?.currentlyDue}
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
  )
}

export default PrintableReceipt
