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
} from '@mui/material'
import Image from 'next/image'
import logo from 'public/travonus.svg'
import React, { useEffect, useState } from 'react'

const PrintableReceipt = ({ receiptData, addedData, orgData }) => {
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

  const subTotal = addedData.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  )

  return (
    <Box sx={{ maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card className="invoice_popup" id="download_section">
        {/* <h2 className="receipt_brand_name">CURA CMS</h2> */}
        <Box sx={{ width: '25%', margin: 'auto' }}>
          <Image src={logo} alt="cura logo" />
        </Box>
        {/* <h6 className="sub_name receipt_sub_name">
          Client Management Solutions
        </h6> */}
        <div className="office_address">
          <h5>{orgData?.name}</h5>
          <h5>{orgData?.phone}</h5>
          <h5>{orgData?.email}</h5>
          <h5>{orgData?.address}</h5>
        </div>

        <div className="receipt_id_section">
          <div className="receipt_id_wrapper">
            <h3 className="receipt_id_header">Money Receipt ID: </h3>
            <h5>&nbsp;{receiptData[0].receiptId}</h5>
          </div>
          <h3 className="receipt_text">Receipt</h3>
          <div className="receipt_id_wrapper">
            <h3 className="receipt_id_header receipt_date">Date</h3>
            <h5 className="invoice_date">
              {new Date().toLocaleDateString('en-US')}
            </h5>
          </div>
        </div>

        <div className="relative">
          <Grid
            sx={{ paddingLeft: 10, paddingRight: 10 }}
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
                  <TableHead className="invoice_table_head receipt_table_head">
                    <TableRow>
                      <TableCell className="table_cell_no_border" align="left">
                        Serial
                      </TableCell>
                      <TableCell className="table_cell_no_border" align="left">
                        Service Name
                      </TableCell>
                      <TableCell
                        className="table_cell_no_border"
                        align="center"
                      >
                        Paid Amount(BDT)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedData.map((row, index) => (
                      <>
                        {row !== 'interpreter' && (
                          <TableRow
                            id="receipt_table"
                            key={index}
                            // sx={{
                            //   '&:last-child td, &:last-child th': { border: 0 },
                            //   backgroundColor: '#fff',
                            // }}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">
                              {/* {row.name} */}
                              {row.name === 'visa'
                                ? 'Visa'
                                : row.name === 'reservation'
                                ? 'Ticketing'
                                : row.name === 'insurance'
                                ? 'Health Insurance'
                                : row.name === 'hotel'
                                ? 'Hotel'
                                : row.name === 'transport'
                                ? 'Local Transport'
                                : row.name === 'airportMeet'
                                ? 'Airport Meet & Greet'
                                : row.name === 'airAmbulance'
                                ? 'Air Ambulance'
                                : row.name === 'doctorOPD'
                                ? "Doctor's appointment (OPD)"
                                : row.name === 'doctorIPD'
                                ? "Doctor's appointment (IPD)"
                                : row.name === 'telemedicine'
                                ? 'Telemedicine'
                                : row.name === 'treatmentPlan'
                                ? 'Treatment Plan & Cost estimation'
                                : row.name === 'excursion'
                                ? 'Requirement for 5 Years Elite Family Excursion Program'
                                : row.name === 'interpreter'
                                ? null
                                : null}
                            </TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <div className="receipt_footer">
            <Box>
              <h5>Received with thanks from {receiptData[0].clientName}</h5>
              {orgData?.terms && (
                <div
                  className="receipt_terms"
                  dangerouslySetInnerHTML={{ __html: orgData?.terms }}
                />
              )}
            </Box>
            <div className="right_footer_section right_footer_section_receipt">
              <div className="sub_total_wrapper ">
                <h4 className="sub_total_m receipt_sub_total">
                  Sub Total : {subTotal} BDT
                </h4>
              </div>
            </div>
          </div>

          {/* <div className="margin_horizontal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 450">
              <path
                fill="rgb(255, 145, 0)"
                fill-opacity="1"
                d="M0,32L1440,320L1440,320L0,320Z"
              ></path>
            </svg>
          </div> */}
        </div>
      </Card>
    </Box>
  )
}

export default PrintableReceipt
