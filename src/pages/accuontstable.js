import { useRouter } from 'next/router'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import Doctor from 'mdi-material-ui/Doctor'
import Ambulance from 'mdi-material-ui/Ambulance'
import Airplane from 'mdi-material-ui/Airplane'
import Home from 'mdi-material-ui/Home'
import Stethoscope from 'mdi-material-ui/Stethoscope'
import Phone from 'mdi-material-ui/Phone'
import { loadStorage } from 'src/Utils/func'
import 'react-datepicker/dist/react-datepicker.css'

// Iconify
import { Icon } from '@iconify/react'
import { Button, CardHeader, Grid, Pagination, TextField } from '@mui/material'

const AccountsTable = ({
  setSearchText,
  handleSearch,
  slicedData,
  filterAccount,
  rowsPerPage,
  handleChangePage,
  page,
  startIndex,
}) => {
  const user = loadStorage('cura_user')
  return (
    <Card>
      <CardHeader
        title="Filter Accounts"
        titleTypographyProps={{
          sx: {
            mb: 1,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <TableContainer sx={{ px: 5 }}>
        <Grid
          container
          spacing={7}
          sx={{
            marginTop: '-20px',
            marginBottom: 5,
            width: '99%',
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => setSearchText(e.target.value)}
              fullWidth
              label="Search Account"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => {
                handleSearch()
              }}
              className="search_button_height"
              variant="contained"
              sx={{ marginLeft: 4.7 }}
            >
              Find Account
            </Button>
          </Grid>
        </Grid>

        {/* <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
            <DatePicker
              id="picker"
              className="picker"
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              selected={date}
              onChange={date => setDate(date)}
            />
          </Grid>
        </Grid> */}
      </TableContainer>
      <TableContainer>
        {user.role === 'executive' || user.role === 'supervisor' ? (
          <h2 style={{ textAlign: 'center' }}>
            You are not authorized to see this data
          </h2>
        ) : (
          <Table
            className="table"
            sx={{ minWidth: 800 }}
            aria-label="table in dashboard"
          >
            <TableHead sx={{ background: '#eeeef8' }}>
              <TableRow>
                <TableCell align="center">Serial</TableCell>
                <TableCell align="center">Staff</TableCell>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Services</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Total Paid</TableCell>
                <TableCell className="">Payment Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="">Visa Payment</TableCell>
                <TableCell className="">Visa Paid</TableCell>
                <TableCell className="">Visa Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">Riservation Payment</TableCell>
                <TableCell className="word_wrap">Riservation Paid</TableCell>
                <TableCell className=" word_wrap">Riservation Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Health Insurance Payment
                </TableCell>
                <TableCell className="word_wrap">
                  Health Insurance Paid
                </TableCell>
                <TableCell className=" word_wrap">
                  Health Insurance Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell>Hotel Payment</TableCell>
                <TableCell>Hotel Paid</TableCell>
                <TableCell className="">Hotel Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">Transport Payment</TableCell>
                <TableCell className="word_wrap">Transport Paid</TableCell>
                <TableCell className=" word_wrap">Transport Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell>
                  Airport meet & <br /> greet Payment
                </TableCell>
                <TableCell>
                  Airport meet & <br /> greet Paid
                </TableCell>
                <TableCell className="">
                  Airport meet & <br /> greet Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Airambulance Payment
                </TableCell>
                <TableCell className="word_wrap">Airambulance Paid</TableCell>
                <TableCell className=" word_wrap">Airambulance Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Doctor's appointment(OPD) Payment
                </TableCell>
                <TableCell className="word_wrap">
                  Doctor's appointment(OPD) Paid
                </TableCell>
                <TableCell className=" word_wrap">
                  Doctor's appointment(OPD) Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Doctor's appointment(IPD) Payment
                </TableCell>
                <TableCell className="word_wrap">
                  Doctor's appointment(IPD) Paid
                </TableCell>
                <TableCell className=" word_wrap">
                  Doctor's appointment(IPD) Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Telemedicine Payment
                </TableCell>
                <TableCell className="word_wrap">Telemedicine Paid</TableCell>
                <TableCell className=" word_wrap">Telemedicine Due</TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell>
                  Treatment Plan <br /> Payment
                </TableCell>
                <TableCell>
                  Treatment Plan <br /> Paid
                </TableCell>
                <TableCell className="">
                  Treatment
                  <br /> Plan Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="cell_devider">
                  Profit <br /> or Loss
                </TableCell>

                <TableCell className="word_wrap">
                  Excursion Program Payment
                </TableCell>
                <TableCell className="word_wrap">
                  Excursion Program Paid
                </TableCell>
                <TableCell className="word_wrap">
                  Excursion Program Due
                </TableCell>
                <TableCell className="">
                  Paid to <br /> Supplier
                </TableCell>
                <TableCell className="">
                  Profit <br /> or Loss
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((row, index) => {
                let totalPaidToSupplier = 0
                let totalProfitOrLoss = 0

                for (const key in row.wrapper.formData) {
                  if (key.includes('paidToSupplier')) {
                    totalPaidToSupplier += Number(row.wrapper.formData[key])
                  }
                  if (key.includes('ProfitOrLoss')) {
                    totalProfitOrLoss += Number(row.wrapper.formData[key])
                  }
                }

                return (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell align="center">Example</TableCell>
                    <TableCell
                      align="center"
                      sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem !important',
                          }}
                        >
                          {row?.wrapper?.formData?.clientName}
                        </Typography>
                        <Typography variant="caption">
                          {row?.wrapper?.formData?.contactNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.visaPaymentAmount ||
                      row?.wrapper?.formData?.reservationPaymentAmount ||
                      row?.wrapper?.formData?.healthInsurancePaymentAmount ||
                      row?.wrapper?.formData?.hotelPaymentAmount ||
                      row?.wrapper?.formData?.localTransportPaymentAmount ||
                      row?.wrapper?.formData?.airportPaymentAmount ||
                      row?.wrapper?.formData?.airAmbulancePaymentAmount ||
                      row?.wrapper?.formData?.opdPaymentAmount ||
                      row?.wrapper?.formData?.ipdPaymentAmount ||
                      row?.wrapper?.formData?.telimedeicinePaymentAmount ||
                      row?.wrapper?.formData?.treatmentPlanPaymentAmount ||
                      row?.wrapper?.formData?.excursionPaymentAmount ? (
                        <>
                          {row?.wrapper?.formData?.visaPaymentAmount > 0 && (
                            <Tooltip title="Visa" arrow>
                              <Icon
                                icon="ri:visa-fill"
                                style={{ color: 'green', fontSize: '20px' }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.reservationPaymentAmount >
                            0 && (
                            <Tooltip title="Ticketing" arrow>
                              <Icon
                                icon="majesticons:ticket-text"
                                style={{
                                  color: 'red',
                                  fontSize: '20px',
                                  marginLeft: '5px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData
                            ?.healthInsurancePaymentAmount > 0 && (
                            <Tooltip title="Health" arrow>
                              <Icon
                                icon="material-symbols:health-and-safety"
                                style={{
                                  color: 'green',
                                  fontSize: '20px',
                                  marginLeft: '5px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.hotelPaymentAmount > 0 && (
                            <Tooltip title="Hotel" arrow>
                              <Home
                                style={{ color: 'red', fontSize: '20px' }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.localTransportPaymentAmount >
                            0 && (
                            <Tooltip title="Transport" arrow>
                              <Icon
                                icon="icon-park-outline:transporter"
                                style={{
                                  color: 'green',
                                  fontSize: '20px',
                                  marginLeft: '5px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.airportPaymentAmount > 0 && (
                            <Tooltip title="Air Ticket" arrow>
                              <Airplane
                                style={{
                                  color: 'red',
                                  marginLeft: '5px',
                                  fontSize: '20px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.airAmbulancePaymentAmount >
                            0 && (
                            <Tooltip title="Air Ambulance" arrow>
                              <Ambulance
                                style={{
                                  color: 'green',
                                  marginLeft: '5px',
                                  fontSize: '20px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {(row?.wrapper?.formData?.opdPaymentAmount > 0 ||
                            row?.wrapper?.formData?.ipdPaymentAmount > 0) && (
                            <Tooltip title="Doctor" arrow>
                              <Doctor
                                style={{
                                  color: 'red',
                                  marginLeft: '5px',
                                  fontSize: '20px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.telimedeicinePaymentAmount >
                            0 && (
                            <Tooltip title="Tele Medicine" arrow>
                              <Phone
                                style={{
                                  color: 'green',
                                  marginLeft: '2px',
                                  fontSize: '20px',
                                }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.treatmentPlanPaymentAmount >
                            0 && (
                            <Tooltip title="Treatment" arrow>
                              <Stethoscope
                                style={{ color: 'red', fontSize: '20px' }}
                              />
                            </Tooltip>
                          )}

                          {row?.wrapper?.formData?.excursionPaymentAmount >
                            0 && (
                            <Tooltip title="Family Execusion" arrow>
                              <Icon
                                icon="carbon:pedestrian-family"
                                style={{
                                  color: 'green',
                                  fontSize: '20px',
                                  marginLeft: '5px',
                                }}
                              />
                            </Tooltip>
                          )}
                        </>
                      ) : (
                        <>
                          <div>No Service Selected</div>
                        </>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.totalPayment}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.totalPaid}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.currentlyDue}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {totalPaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {totalProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.visaPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.visapaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.visaDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.visapaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.visaProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.reservationPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.reservationpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.reservationDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.reservationpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.reservationProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.healthInsurancePaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.healthInsurancepaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.healthInsuranceDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.healthInsurancepaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.healthInsuranceProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.hotelPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.hotelpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.hotelDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.hotelpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.hotelProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.localTransportPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.localTransportpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.localTransportDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.localTransportpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.localTransportProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.airportPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.airportpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airportDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airportpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airportProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.airAmbulancePaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.airAmbulancepaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airAmbulanceDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airAmbulancepaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.airAmbulanceProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.opdPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.opdpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.opdDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.opdpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.opdProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.ipdPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.ipdpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.ipdDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.ipdpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.ipdProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.telimedeicinePaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.telimedeicinepaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.telimedeicineDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.telimedeicinepaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.telimedeicineProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.treatmentPlanPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.treatmentPlanpaidAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.treatmentPlanDueAmount}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.treatmentPlanpaidToSupplier}
                    </TableCell>
                    <TableCell align="center" className="cell_devider">
                      {row?.wrapper?.formData?.treatmentPlanProfitOrLoss}
                    </TableCell>

                    <TableCell align="center">
                      {row?.wrapper?.formData?.excursionPaymentAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.excursionpaidAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.excursionDueAmount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.excursionpaidToSupplier}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.formData?.excursionProfitOrLoss}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
        count={Math.ceil(filterAccount.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  )
}

export default AccountsTable
