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

const MargeInvoiceTable = ({ clientData }) => {
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

  const manualFields =
    '<p><strong style="color: rgb(0, 176, 240);">CRM Solution | </strong><strong style="color: rgb(112, 48, 160);">Estern Bank Limited | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 108 107 000 1404</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">Bank Asia – MCB Banani - Branch |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 01233054714</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">United Commercial Bank | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 02222 1010 000 11214</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p>'

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      printDiv()
    }
  }, [isLoaded])

  console.log('clientData', clientData)

  const calculateTotalPaidAmount = () => {
    let totalPaidAmount = 0
    clientData?.map((client, index) => {
      if (
        Array.isArray(client?.wrapper?.formData?.serviceArr) &&
        client?.wrapper?.formData?.serviceArr.length > 0
      ) {
        client?.wrapper?.formData?.serviceArr.map(service => {
          switch (service) {
            case 'visa':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.visapaidAmount) || 0
              break
            case 'reservation':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.reservationpaidAmount) || 0
              break
            case 'insurance':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.healthInsurancepaidAmount) ||
                0
              break
            case 'hotel':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.hotelpaidAmount) || 0
              break
            case 'transport':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.localTransportpaidAmount) || 0
              break
            case 'airportMeet':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.airportpaidAmount) || 0
              break
            case 'airAmbulance':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.airAmbulancepaidAmount) || 0
              break
            case 'doctorOPD':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.opdpaidAmount) || 0
              break
            case 'doctorIPD':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.ipdpaidAmount) || 0
              break
            case 'telemedicine':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.telimedeicinepaidAmount) || 0
              break
            case 'treatmentPlan':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.treatmentPlanpaidAmount) || 0
              break
            case 'excursion':
              totalPaidAmount +=
                Number(client?.wrapper?.formData?.excursionpaidAmount) || 0
              break
            default:
              totalPaidAmount = 0
              break
          }
        })
      }
    })
    return totalPaidAmount
  }

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
    <Box sx={{ maxWidth: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card className="invoice_popup" id="download_section">
        {/* <h2 className="brand_name">CURA CMS</h2> */}
        <Box sx={{ width: '25%', margin: 'auto' }}>
          <Image src={logo} alt="cura logo" />
        </Box>
        {/* <h6 className="sub_name">Client Management Solutions</h6> */}
        <div className="office_address">
          <h5>CRM Solution</h5>
          <h5>01323581330</h5>
          <h5>mytravonus@gmail.com</h5>
          <h5>
            Sufi Villa | level 3 | R- 11A | H- 78 | Dhanmondi | Dhaka- 1209
          </h5>
        </div>
        <div className="invoice_header_wrapper">
          <h1 class="invoice_header">INVOICE</h1>
        </div>

        <div className="inv_id_section">
          <div className="invoice_to_left">
            <h3>Invoice to:</h3>
            <h3 className="client_name">
              {clientData[0]?.wrapper?.formData?.clientName
                ?.toLowerCase()
                ?.replace(/\b\w/g, match => match.toUpperCase())}
            </h3>
            {clientData[0]?.wrapper?.formData?.contactNumber && (
              <h5>{clientData[0]?.wrapper?.formData?.contactNumber}</h5>
            )}
            {clientData[0]?.wrapper?.formData?.email && (
              <h5>{clientData[0]?.wrapper?.formData?.email}</h5>
            )}
            {clientData[0]?.wrapper?.formData?.address && (
              <h5>{clientData[0]?.wrapper?.formData?.address}</h5>
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
              <h5>{clientData[0]?.wrapper?.uniqueClientId}</h5>
            </div>
          </div>
        </div>

        <Grid
          sx={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }}
          container
          spacing={5}
        >
          <Grid item xs={12}>
            <TableContainer sx={{ borderRadius: '8px' }}>
              <Table
                className="invoice_table"
                sx={{ minWidth: 800 }}
                aria-label="table in dashboard"
              >
                <TableHead className="invoice_table_head">
                  <TableRow>
                    <TableCell className="table_cell_no_border" align="left">
                      Client
                    </TableCell>
                    <TableCell className="table_cell_no_border" align="left">
                      Services
                    </TableCell>
                    {/* <TableCell className="table_cell_no_border" align="center">
                      Total Amount
                    </TableCell> */}
                    <TableCell className="table_cell_no_border" align="center">
                      Paid Amount(BDT)
                    </TableCell>
                    {/* <TableCell className="table_cell_no_border" align="right">
                      Due Amount
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* wrapper?.formData?.serviceArr?. */}
                  {clientData?.map((client, index) => (
                    <>
                      {client?.wrapper?.formData?.serviceArr?.length >= 1 && (
                        // client?.wrapper?.formData?.serviceArr.includes(
                        //   'interpreter'
                        // ) &&
                        <TableRow>
                          <TableCell align="left">
                            {client?.wrapper?.formData?.clientName}
                          </TableCell>
                          <TableCell align="left">
                            {client?.wrapper?.formData?.serviceArr?.length >= 1
                              ? client?.wrapper?.formData?.serviceArr.map(
                                  service => (
                                    <Typography>
                                      {getServiceLabel(service)}
                                      {getServiceInvoiceComment(service)}
                                    </Typography>
                                  )
                                )
                              : 'No Service Selected'}
                          </TableCell>
                          <TableCell align="center">
                            {/* Total of Paid Amount for all selected services */}
                            {Array.isArray(
                              client?.wrapper?.formData?.serviceArr
                            ) &&
                            client?.wrapper?.formData?.serviceArr.length > 0
                              ? client?.wrapper?.formData?.serviceArr.reduce(
                                  (totalPaidAmount, service) => {
                                    let servicePaidAmount = 0
                                    switch (service) {
                                      case 'visa':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.visapaidAmount
                                          ) || 0
                                        break
                                      case 'reservation':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.reservationpaidAmount
                                          ) || 0
                                        break
                                      case 'insurance':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.healthInsurancepaidAmount
                                          ) || 0
                                        break
                                      case 'hotel':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.hotelpaidAmount
                                          ) || 0
                                        break
                                      case 'transport':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.localTransportpaidAmount
                                          ) || 0
                                        break
                                      case 'airportMeet':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.airportpaidAmount
                                          ) || 0
                                        break
                                      case 'airAmbulance':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.airAmbulancepaidAmount
                                          ) || 0
                                        break
                                      case 'doctorOPD':
                                        servicePaidAmount +=
                                          client?.wrapper?.formData
                                            ?.opdpaidAmount || 0
                                        break
                                      case 'doctorIPD':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.ipdpaidAmount
                                          ) || 0
                                        break
                                      case 'telemedicine':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.telimedeicinepaidAmount
                                          ) || 0
                                        break
                                      case 'treatmentPlan':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.treatmentPlanpaidAmount
                                          ) || 0
                                        break
                                      case 'excursion':
                                        servicePaidAmount +=
                                          Number(
                                            client?.wrapper?.formData
                                              ?.excursionpaidAmount
                                          ) || 0
                                        break
                                      default:
                                        servicePaidAmount = 0
                                        break
                                    }
                                    return (
                                      Number(totalPaidAmount) +
                                      Number(servicePaidAmount)
                                    )
                                  },
                                  0
                                )
                              : 0}
                            &nbsp;BDT
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="invoice_footer">
              <div className="left_footer_section">
                <div>
                  {/* <h5 className="footer_header">Terms & Conditions</h5> */}
                  {/* <p>
                    If it is 30 days from the date of payment, the payment will
                    not be refunded.
                  </p>
                  <p>
                    <strong>Bank Account Details</strong>
                  </p>
                  <p>AB Bank Limited</p> */}
                </div>
              </div>
              <div className="right_footer_section">
                <div className="sub_total_wrapper">
                  {/* <h4 className="sub_total">
                    Total Amount :{' '}
                    {clientData[0]?.wrapper?.formData?.totalPayment}
                  </h4> */}
                  <h4 className="sub_total_m">
                    Subtotal : {calculateTotalPaidAmount()}&nbsp;BDT
                  </h4>
                  {/* <h4 className="sub_total">
                    Due Amount :{' '}
                    {clientData[0]?.wrapper?.formData?.currentlyDue}
                  </h4> */}
                </div>
              </div>
            </div>
            <div className="footer_border"></div>
            <div dangerouslySetInnerHTML={{ __html: manualFields }} />
            <h5 className="footer_header">Thank you for your business</h5>
          </Grid>
        </Grid>
        {/* <div className="footer_border_wrapper">
          <h5 className="authorized_sign">Authorized Sign</h5>
        </div> */}
      </Card>
    </Box>
  )
}

export default MargeInvoiceTable
