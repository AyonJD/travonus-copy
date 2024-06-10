import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import SelectedServiceTable from 'src/@core/components/tables/SelectedServiceTable'
import {
  clientsWithServiceSelected,
  getTotalClientEntries,
  getTotalLeadEntries,
  getTotalLeadEntriesStatus,
  getTotalServiceOfClients,
  totalDue,
  totalPaidByClient,
  totalPaidToSupplier,
  totalPaymentByClient,
  totalServedClientWithHundredPercent,
} from 'src/Utils/analyticsFunc'

const Analytics = () => {
  const [date, setDate] = useState(new Date())
  const [serviceSelectedClient, setServiceSelectedClient] = useState([])
  const [serviceSelectedPaidClient, setServiceSelectedPaidClient] = useState([])

  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const [monthYear, setMonthYear] = useState(`${month} ${year}`)

  // Store the date in the state
  const [totalLead, setTotalLead] = useState(0)
  const [totalConvertedLead, setTotalConvertedLead] = useState({})
  const [totalContinuedLead, setTotalContinuedLead] = useState({})
  const [totalNotConvertedLead, setTotalNotConvertedLead] = useState({})
  const [totalPendingLead, setTotalPendingLead] = useState({})
  const [totalConvertibleLead, setTotalConvertibleLead] = useState({})
  const [totalDeniedLead, setTotalDeniedLead] = useState({})

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = serviceSelectedClient.slice(startIndex, endIndex)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // ---------For pagination

  // For paid table pagination
  const [paidPage, setPaidPage] = useState(1)
  const paidStartIndex = (paidPage - 1) * rowsPerPage
  const paidEndIndex = paidStartIndex + rowsPerPage
  const paidSlicedData = serviceSelectedPaidClient.slice(
    paidStartIndex,
    paidEndIndex
  )

  const handleChangePaidPage = (event, newPage) => {
    setPaidPage(newPage)
  }
  // For paid table pagination

  useEffect(() => {
    const retriveData = async () => {
      const data = await clientsWithServiceSelected(false, date)
      setServiceSelectedClient(data)
      const paidData = await clientsWithServiceSelected(true, date)
      setServiceSelectedPaidClient(paidData)

      // Lead Analytics
      const lead = await getTotalLeadEntries(date)
      setTotalLead(lead)
      const convertedLead = await getTotalLeadEntriesStatus('Converted', date)
      const continuedLead = await getTotalLeadEntriesStatus('Continued', date)
      const notConvertedLead = await getTotalLeadEntriesStatus(
        'Not Converted',
        date
      )
      const pendingLead = await getTotalLeadEntriesStatus('Pending', date)
      const convertibleLead = await getTotalLeadEntriesStatus(
        'Convertible',
        date
      )
      const deniedLead = await getTotalLeadEntriesStatus('Denied', date)
      setTotalConvertedLead(convertedLead)
      setTotalContinuedLead(continuedLead)
      setTotalNotConvertedLead(notConvertedLead)
      setTotalPendingLead(pendingLead)
      setTotalConvertibleLead(convertibleLead)
      setTotalDeniedLead(deniedLead)
    }
    retriveData()
  }, [date])

  useEffect(() => {
    setMonthYear(`${month} ${year}`)
  }, [month, year, date])

  // Show Toast
  const handleToast = message => {
    toast.success(message)
  }

  // Buttons action Lead Analytics------------------------------------------------>

  const getTotalLead = async () => {
    const lead = await getTotalLeadEntries(date)
    // setTotalLead(lead)
    // toast.success(`Total Lead: ${lead}`)
    console.log(lead)
  }

  const getTotalConvertedLead = async status => {
    const lead = await getTotalLeadEntriesStatus(status, date)
    if (Object.keys(lead).length > 0) {
      toast.success(
        `Total ${status} Lead: ${lead?.totalStatusLead} (${lead?.percentage}%)`
      )
    }
  }
  // Buttons action Lead Analytics------------------------------------------------>

  // Buttons action Client Analytics------------------------------------------------>

  const getTotalClient = async () => {
    const client = await getTotalClientEntries(date)

    toast.success(`Total Client: ${client}`)
  }

  const getTotalServiceTypeOfClient = async serviceType => {
    const client = await getTotalServiceOfClients(serviceType, date)
    if (Object.keys(client).length > 0) {
      toast.success(
        `Total Client: ${client?.clientOfService} of ${serviceType} service type in ${client?.percentage}%`
      )
    }
  }

  const totalServedAndActiveClient = async condition => {
    const client = await totalServedClientWithHundredPercent(condition, date)

    toast.success(
      condition === 'totalServedClient'
        ? `Total Served Client: ${client}`
        : `Total Active Client: ${client}`
    )
  }

  // Buttons action Client Analytics------------------------------------------------>

  // Buttons action Account Analytics------------------------------------------------>
  const totalPaid = async () => {
    const amount = await totalPaidByClient(date)

    toast.success(`Total Paid: ${amount}`)
  }

  const paidToSupplier = async () => {
    const amount = await totalPaidToSupplier(date)

    toast.success(`Total Paid to Supplier: ${amount}`)
  }

  const totalRevinew = async () => {
    const amount = await totalPaymentByClient(date)

    toast.success(`Total Revinew: ${amount}`)
  }

  const totalDueAmount = async () => {
    const amount = await totalDue(date)

    toast.success(`Total Due: ${amount}`)
  }

  return (
    <Card>
      <CardHeader title={`Showing Records of all time`} />
      <CardContent>
        <Grid container spacing={3} sx={{ mb: 4 }}>
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

        {/* Lead Analytics---------------------------------> */}
        <Typography variant="h6" gutterBottom>
          Lead Analytics
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalLead()}
          >
            Total Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Converted')}
          >
            Total Converted Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Continued')}
          >
            Total Continued Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Not Converted')}
          >
            Total Not Converted Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Pending')}
          >
            Total Pending Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Convertible')}
          >
            Total Convertible Lead
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalConvertedLead('Denied')}
          >
            Total Denied Lead
          </Button>
        </Box>

        {/* Client Analytics------------------------------> */}
        <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
          Client Analytics
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Button variant="contained" color="primary" onClick={getTotalClient}>
            Total Client
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('visa')}
          >
            Total Visa Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('reservation')}
          >
            Total Reservation Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('insurance')}
          >
            Total Insurance Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('hotel')}
          >
            Total Hotel Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('transport')}
          >
            Total Transport Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('airportMeet')}
          >
            Total AirportMeet Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('airAmbulance')}
          >
            Total AirAmbulance Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('doctorOPD')}
          >
            Total DoctorOPD Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('doctorIPD')}
          >
            Total DoctorIPD Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('telemedicine')}
          >
            Total Telemedicine Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('treatmentPlan')}
          >
            Total TreatmentPlan Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('interpreter')}
          >
            Total Interpreter Services
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getTotalServiceTypeOfClient('excursion')}
          >
            Total Excursion Services
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
          Total Client of completed service
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => totalServedAndActiveClient('totalServedClient')}
          >
            Total Served Clients
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => totalServedAndActiveClient('totalActiveClient')}
          >
            Total Active Clients
          </Button>
        </Box>

        {/* Account Analytics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
          Account Analytics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Button variant="contained" color="primary" onClick={totalPaid}>
            Total Paid
          </Button>
          <Button variant="contained" color="primary" onClick={paidToSupplier}>
            Total Paid to Supplier
          </Button>
          <Button variant="contained" color="primary" onClick={totalRevinew}>
            Total Revinew
          </Button>
          <Button variant="contained" color="primary" onClick={totalDueAmount}>
            Total Due
          </Button>
        </Box>

        {/* Table client Analytics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
          Account Analytics Table
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {serviceSelectedClient.length === 0 ? (
            <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
              No Data Found
            </Typography>
          ) : (
            <SelectedServiceTable
              slicedData={slicedData}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              page={page}
              startIndex={startIndex}
              serviceSelectedClient={serviceSelectedClient}
              title="Service Selected but not paid"
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4 }}>
          {serviceSelectedClient.length === 0 ? (
            <Typography variant="h6" gutterBottom sx={{ mt: 10 }}>
              No Data Found
            </Typography>
          ) : (
            <SelectedServiceTable
              slicedData={paidSlicedData}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePaidPage}
              page={paidPage}
              startIndex={paidStartIndex}
              serviceSelectedClient={serviceSelectedPaidClient}
              title="Service Selected and made some payment"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Analytics
