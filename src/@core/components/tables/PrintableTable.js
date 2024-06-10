import {
  Box,
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
import Image from 'next/image'
import logo from 'public/travonus.svg'
import React, { useEffect, useState } from 'react'

const PrintableTable = ({ clientData, manualFields }) => {
  const [isLoaded, setIsLoaded] = useState(false)

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

  const getServiceLabel = service => {
    switch (service) {
      case 'visa':
        return 'Visa'
      case 'reservation':
        return 'Ticketing'
      case 'insurance':
        return 'Health Insurance'
      case 'hotel':
        return 'Hotel'
      case 'transport':
        return 'Local Transport'
      case 'airportMeet':
        return 'Airport Meet & Greet'
      case 'airAmbulance':
        return 'Air Ambulance'
      case 'doctorOPD':
        return "Doctor's appointment (OPD)"
      case 'doctorIPD':
        return "Doctor's appointment (IPD)"
      case 'telemedicine':
        return 'Telemedicine'
      case 'treatmentPlan':
        return 'Treatment Plan & Cost estimation'
      case 'excursion':
        return 'Requirement for 5 Years Elite Family Excursion Program'
      case 'interpreter':
        return null
      default:
        return null
    }
  }

  const getServiceInvoiceComment = service => {
    return clientData?.wrapper?.formData?.[`${service}InvoiceComment`]
      ? `(${clientData.wrapper.formData[`${service}InvoiceComment`]})`
      : null
  }

  return (
    <Box sx={{ maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card className="invoice_popup" id="download_section">
        {/* <h2 className="brand_name">CURA CMS</h2> */}
        <Box sx={{ width: '25%', margin: 'auto' }}>
          <Image src={logo} alt="cura logo" />
        </Box>
        {/* <h6 className="sub_name">Client Management Solutions</h6> */}
        <div className="office_address">
          <h5>{manualFields?.name}</h5>
          <h5>{manualFields?.phone}</h5>
          <h5>{manualFields?.email}</h5>
          <h5>{manualFields?.address}</h5>
        </div>
        <div className="invoice_header_wrapper">
          <h1 class="invoice_header">INVOICE</h1>
        </div>

        <div className="inv_id_section">
          <div className="invoice_to_left">
            <h3>Invoice to:</h3>
            <h3 className="client_name">
              {clientData?.wrapper?.formData?.clientName
                ?.toLowerCase()
                ?.replace(/\b\w/g, match => match.toUpperCase())}
            </h3>
            {clientData?.wrapper?.formData?.contactNumber && (
              <h5>{clientData?.wrapper?.formData?.contactNumber}</h5>
            )}
            {clientData?.wrapper?.formData?.email && (
              <h5>{clientData?.wrapper?.formData?.email}</h5>
            )}
            {clientData?.wrapper?.formData?.address && (
              <h5>{clientData?.wrapper?.formData?.address}</h5>
            )}
          </div>

          <div className="invoice_id_section_right">
            <div className="invoice_id">
              <h3 className="invoice_id_header">Date: </h3>
              <h5 className="invoice_date">
                {new Date().toLocaleDateString('en-US')}
              </h5>
            </div>
            <div className="invoice_id invoice_id_top">
              <h3 className="invoice_id_header">Invoice ID: </h3>
              <h5>{clientData?.wrapper?.uniqueClientId}</h5>
            </div>
          </div>
        </div>

        <Grid
          sx={{ marginBottom: 15, paddingLeft: 5, paddingRight: 5 }}
          container
          spacing={5}
        >
          <Grid item xs={12}>
            <TableContainer sx={{ borderRadius: '6px' }}>
              <Table
                className="invoice_table"
                sx={{ minWidth: 900 }}
                aria-label="table in dashboard"
              >
                <TableHead className="invoice_table_head" id="inv_head">
                  <TableRow>
                    <TableCell className="table_cell_no_border" align="left">
                      Serial
                    </TableCell>
                    <TableCell className="table_cell_no_border" align="left">
                      Service Name
                    </TableCell>
                    <TableCell
                      className="table_cell_no_border no_wrap"
                      align="center"
                    >
                      Service Amount(BDT)
                    </TableCell>
                    <TableCell
                      className="table_cell_no_border no_wrap"
                      align="center"
                    >
                      Paid Amount(BDT)
                    </TableCell>
                    <TableCell
                      className="table_cell_no_border no_wrap"
                      align="right"
                    >
                      Due Amount(BDT)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientData?.wrapper?.formData?.serviceArr?.map(
                    (service, index) => (
                      <>
                        {service !== 'interpreter' && (
                          <TableRow>
                            <TableCell align="left">
                              <Typography>{index + 1}</Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography>
                                {getServiceLabel(service)}
                                {getServiceInvoiceComment(service)}
                              </Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Typography>
                                {service === 'visa' &&
                                  clientData?.wrapper?.formData
                                    ?.visaPaymentAmount}
                                {service === 'reservation' &&
                                  clientData?.wrapper?.formData
                                    ?.reservationPaymentAmount}
                                {service === 'insurance' &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsurancePaymentAmount}
                                {service === 'hotel' &&
                                  clientData?.wrapper?.formData
                                    ?.hotelPaymentAmount}
                                {service === 'transport' &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportPaymentAmount}
                                {service === 'airportMeet' &&
                                  clientData?.wrapper?.formData
                                    ?.airportPaymentAmount}
                                {service === 'airAmbulance' &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulancePaymentAmount}
                                {service === 'doctorOPD' &&
                                  clientData?.wrapper?.formData
                                    ?.opdPaymentAmount}
                                {service === 'doctorIPD' &&
                                  clientData?.wrapper?.formData
                                    ?.ipdPaymentAmount}
                                {service === 'telemedicine' &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicinePaymentAmount}
                                {service === 'treatmentPlan' &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanPaymentAmount}
                                {service === 'excursion' &&
                                  clientData?.wrapper?.formData
                                    ?.excursionPaymentAmount}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {service === 'visa' &&
                                  clientData?.wrapper?.formData?.visapaidAmount}
                                {service === 'reservation' &&
                                  clientData?.wrapper?.formData
                                    ?.reservationpaidAmount}
                                {service === 'insurance' &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsurancepaidAmount}
                                {service === 'hotel' &&
                                  clientData?.wrapper?.formData
                                    ?.hotelpaidAmount}
                                {service === 'transport' &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportpaidAmount}
                                {service === 'airportMeet' &&
                                  clientData?.wrapper?.formData
                                    ?.airportpaidAmount}
                                {service === 'airAmbulance' &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulancepaidAmount}
                                {service === 'doctorOPD' &&
                                  clientData?.wrapper?.formData?.opdpaidAmount}
                                {service === 'doctorIPD' &&
                                  clientData?.wrapper?.formData?.ipdpaidAmount}
                                {service === 'telemedicine' &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicinepaidAmount}
                                {service === 'treatmentPlan' &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanpaidAmount}
                                {service === 'excursion' &&
                                  clientData?.wrapper?.formData
                                    ?.excursionpaidAmount}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {service === 'visa' &&
                                  clientData?.wrapper?.formData?.visaDueAmount}
                                {service === 'reservation' &&
                                  clientData?.wrapper?.formData
                                    ?.reservationDueAmount}
                                {service === 'insurance' &&
                                  clientData?.wrapper?.formData
                                    ?.healthInsuranceDueAmount}
                                {service === 'hotel' &&
                                  clientData?.wrapper?.formData?.hotelDueAmount}
                                {service === 'transport' &&
                                  clientData?.wrapper?.formData
                                    ?.localTransportDueAmount}
                                {service === 'airportMeet' &&
                                  clientData?.wrapper?.formData
                                    ?.airportDueAmount}
                                {service === 'airAmbulance' &&
                                  clientData?.wrapper?.formData
                                    ?.airAmbulanceDueAmount}
                                {service === 'doctorOPD' &&
                                  clientData?.wrapper?.formData?.opdDueAmount}
                                {service === 'doctorIPD' &&
                                  clientData?.wrapper?.formData?.ipdDueAmount}
                                {service === 'telemedicine' &&
                                  clientData?.wrapper?.formData
                                    ?.telimedeicineDueAmount}
                                {service === 'treatmentPlan' &&
                                  clientData?.wrapper?.formData
                                    ?.treatmentPlanDueAmount}
                                {service === 'excursion' &&
                                  clientData?.wrapper?.formData
                                    ?.excursionDueAmount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="invoice_footer">
              <div className="left_footer_section">
                <div>
                  {/* <h5 className="footer_header">Terms & Conditions</h5> */}
                </div>
              </div>
              <div className="right_footer_section">
                <div className="sub_total_wrapper">
                  <h4 className="sub_total_m">
                    Total Amount : {clientData?.wrapper?.formData?.totalPayment}{' '}
                    BDT
                  </h4>
                  <h4 className="sub_total_m">
                    Paid Amount : {clientData?.wrapper?.formData?.totalPaid} BDT
                  </h4>
                  <h4 className="sub_total_m">
                    Due Amount : {clientData?.wrapper?.formData?.currentlyDue}{' '}
                    BDT
                  </h4>
                </div>
              </div>
            </div>
            <div className='footer_border'></div>
            <div dangerouslySetInnerHTML={{ __html: manualFields?.terms }} />
            <div className="footer_header">Thank you for your business</div>
          </Grid>
        </Grid>
        {/* <div className="footer_border_wrapper">
          <h5 className="authorized_sign">Authorized Sign</h5>
        </div> */}
      </Card>
    </Box>
  )
}

export default PrintableTable
