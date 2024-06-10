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
import { useEffect, useState } from 'react'
import { getAllClient, loadStorage } from 'src/Utils/func'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Iconify
import { Icon } from '@iconify/react'
import { CardHeader, Grid, Pagination } from '@mui/material'

// Images
import {
  visaIcon,
  ticketingIcon,
  hotelIcon,
  airAmbulanceIcon,
  airportMeetIcon,
  doctorSelectionIcon,
  guideManageIcon,
  healthInsuranceIcon,
  hospitalSelectionIcon,
  localTransportIcon,
  telemedicineIcon,
} from '../Utils/Utils'

const AccountsRecords = () => {
  const router = useRouter()
  const user = loadStorage('cura_user')
  const [date, setDate] = useState(new Date())
  const [allClient, setAllClient] = useState([])
  const [filterAccount, setFilterAccount] = useState([])

  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const [monthYear, setMonthYear] = useState(`${month} ${year}`)

  useEffect(() => {
    setMonthYear(`${month} ${year}`)
  }, [month, year, date])

  useEffect(async () => {
    const allClientData = await getAllClient()
    setAllClient(allClientData)
  }, [])

  const filterByMonth = async account => {
    if (account.length > 0) {
      const filteredAccount = account.filter(acc => {
        const leadMonthYear = new Date(
          acc.wrapper.createdOn
        ).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })

        return leadMonthYear === monthYear
      })
      setFilterAccount(filteredAccount)
    }
  }

  useEffect(() => {
    filterByMonth(allClient)
  }, [monthYear, allClient])

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = filterAccount.slice(startIndex, endIndex)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // ---------For pagination

  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}
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
          <Grid container spacing={7}>
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
          </Grid>
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

                  <TableCell className="word_wrap">
                    Riservation Payment
                  </TableCell>
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
                                <img
                                  src={visaIcon}
                                  alt={'Visa'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData?.reservationPaymentAmount >
                              0 && (
                              <Tooltip title="Ticketing" arrow>
                                <img
                                  src={ticketingIcon}
                                  alt={'Ticketing'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData
                              ?.healthInsurancePaymentAmount > 0 && (
                              <Tooltip title="Health" arrow>
                                <img
                                  src={healthInsuranceIcon}
                                  alt={'Health Insurance'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData?.hotelPaymentAmount > 0 && (
                              <Tooltip title="Hotel" arrow>
                                <img
                                  src={hotelIcon}
                                  alt={'Hotel'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData
                              ?.localTransportPaymentAmount > 0 && (
                              <Tooltip title="Transport" arrow>
                                <img
                                  src={localTransportIcon}
                                  alt={'Local Transport'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData?.airportPaymentAmount >
                              0 && (
                              <Tooltip title="Air Ticket" arrow>
                                <img
                                  src={airportMeetIcon}
                                  alt={'Airport Meet & Greet'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData?.airAmbulancePaymentAmount >
                              0 && (
                              <Tooltip title="Air Ambulance" arrow>
                                <img
                                  src={airAmbulanceIcon}
                                  alt={'Air Ambulance'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {(row?.wrapper?.formData?.opdPaymentAmount > 0 ||
                              row?.wrapper?.formData?.ipdPaymentAmount > 0) && (
                              <Tooltip title="Doctor" arrow>
                                <img
                                  src={doctorSelectionIcon}
                                  alt={'Doctor OPD'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData
                              ?.telimedeicinePaymentAmount > 0 && (
                              <Tooltip title="Tele Medicine" arrow>
                                <img
                                  src={telemedicineIcon}
                                  alt={'Tele Medicine'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData
                              ?.treatmentPlanPaymentAmount > 0 && (
                              <Tooltip title="Treatment" arrow>
                                <img
                                  src={hospitalSelectionIcon}
                                  alt={'Treatment Plan'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}

                            {row?.wrapper?.formData?.excursionPaymentAmount >
                              0 && (
                              <Tooltip title="Family Execusion" arrow>
                                <img
                                  src={guideManageIcon}
                                  alt={'Family Execusion'}
                                  className="iconImage"
                                />
                              </Tooltip>
                            )}
                          </>
                        ) : (
                          <>
                            <div>No amount has been added for services yet</div>
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
    </>
  )
}

export default AccountsRecords
