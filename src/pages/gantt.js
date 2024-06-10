// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { getClientPerUser, loadStorage } from 'src/Utils/func'
import UserCard from 'src/@core/components/userCard/UserCard'
import { useEffect, useState } from 'react'
import { getAllClient } from '../Utils/func'
import { Pagination } from '@mui/material'

const Gantt = () => {
  const user = loadStorage('cura_user')
  const [message, setMessage] = useState('Loading...')
  const [allClientData, setAllClientData] = useState([])
  const uniqueClientId =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('uniqueClientId')
      : false
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  useEffect(() => {
    async function fetchData() {
      try {
        /* This code block is fetching client data from the database based on the user's role. If the
        user's role is 'executive', it fetches client data for that specific user using the
        `getClientPerUser` function and sets the fetched data to the `clientData` variable. If the
        user's role is not 'executive', it fetches all client data using the `getAllClient` function
        and sets the fetched data to the `clientData` variable. Finally, it sets the `clientData` to
        the `allClientData` state variable using the `setAllClientData` function. */
        let clientData = []
        if (user.role === 'executive') {
          clientData = await getClientPerUser(user.uuid)
          setAllClientData(clientData)
        } else {
          clientData = await getAllClient()
          setAllClientData(clientData)
        }

        const formattedData = []

        clientData.forEach(item => {
          // Reservation & Ticketing----------->
          if (
            item.wrapper.formData.reservation &&
            item.wrapper.formData.reservationIsReturnDate
          ) {
            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Reservation & Ticketing'],
              y: [
                new Date(item.wrapper.formData.reservationTravelDate).getTime(),
                new Date(
                  item.wrapper.formData.reservationReturnDateOrOneWay
                ).getTime(),
              ],
            })
          }
          // One day trip---------------->
          if (
            item.wrapper.formData.reservation &&
            !item.wrapper.formData.reservationIsReturnDate
          ) {
            const travelDate = new Date(
              item.wrapper.formData.reservationTravelDate
            )
            const returnDate = new Date(travelDate)
            returnDate.setDate(travelDate.getDate() + 1)

            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Reservation & Ticketing'],
              y: [travelDate.getTime(), returnDate.getTime()],
            })
          }

          // OPD---------------->
          if (
            item.wrapper.formData.doctorOPD &&
            item.wrapper.formData.opdReturnDateFromHospital
          ) {
            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Doctor OPD'],
              y: [
                new Date(item.wrapper.formData.opdDate).getTime(),
                new Date(
                  item.wrapper.formData.opdReturnDateFromHospital
                ).getTime(),
              ],
            })
          }
          // One day trip---------------->
          if (
            item.wrapper.formData.doctorOPD &&
            !item.wrapper.formData.opdReturnDateFromHospital
          ) {
            const travelDate = new Date(item.wrapper.formData.opdDate)
            const returnDate = new Date(travelDate)
            returnDate.setDate(travelDate.getDate() + 1)

            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Doctor OPD'],
              y: [travelDate.getTime(), returnDate.getTime()],
            })
          }

          // IPD---------------->
          if (
            item.wrapper.formData.doctorIPD &&
            item.wrapper.formData.ipdReturnDateFromHospital
          ) {
            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Doctor IPD'],
              y: [
                new Date(item.wrapper.formData.ipdDate).getTime(),
                new Date(
                  item.wrapper.formData.ipdReturnDateFromHospital
                ).getTime(),
              ],
            })
          }
          // One day trip---------------->
          if (
            item.wrapper.formData.doctorIPD &&
            !item.wrapper.formData.ipdReturnDateFromHospital
          ) {
            const travelDate = new Date(item.wrapper.formData.ipdDate)
            const returnDate = new Date(travelDate)
            returnDate.setDate(travelDate.getDate() + 1)

            formattedData.push({
              x: [item.wrapper.formData.clientName, 'Doctor IPD'],
              y: [travelDate.getTime(), returnDate.getTime()],
            })
          }
        })

        /* This code block is sorting the `formattedData` array based on the difference between the
        first element of the `y` array (which represents the start date of a client's trip) and the
        current date. It calculates the number of days between the start date and the current date
        using the `Math.abs` function and some date arithmetic. It then sorts the array in ascending
        order based on the number of days, so that the trips that are closest to the current date
        appear first in the timeline. */
        formattedData.sort((a, b) => {
          const today = new Date().getTime()
          const aDaysDiff = Math.abs(a.y[0] - today) / (1000 * 60 * 60 * 24)
          const bDaysDiff = Math.abs(b.y[0] - today) / (1000 * 60 * 60 * 24)
          return aDaysDiff - bDaysDiff
        })

        setData(formattedData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  /**
   * This function handles page changes and slices data based on the current page and number of rows
   * per page.
   * @param event - The event parameter is an object that represents the event that triggered the
   * function. In this case, it is likely a click event on a pagination button or link.
   * @param newPage - The new page number that the user has selected.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = data.slice(startIndex, endIndex)

  /* This `useEffect` hook is checking if the `allClientData` state variable is null or has a length of
  0. If it is, it sets a message to inform the user that no data has been found and asks them to add
  some client information. It also sets a timer to clear the message after 5 seconds using
  `setTimeout` and returns a function to clear the timer using `clearTimeout`. If `allClientData` is
  not null and has a length greater than 0, it sets the message to an empty string. This hook runs
  every time the `allClientData` state variable changes. */
  useEffect(() => {
    if (allClientData === null || allClientData.length === 0) {
      const timer = setTimeout(() => {
        setMessage('No Data Found...Please add some client information')
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    } else {
      setMessage('')
    }
  }, [allClientData])

  if (allClientData === null || allClientData.length === 0) {
    // return a loading state while waiting for dataFromDB to be set
    return <div className="align_center">{message}</div>
  }

  // ** Hook
  const theme = useTheme()

  const twoMonthsAgo = new Date()
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 9,
        endingShape: 'rounded',
        startingShape: 'rounded',
        heightRatio: 0.8, // make bars taller
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: true },
    grid: {
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
        autoRange: true, 
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      type: 'datetime',
      min: twoMonthsAgo.getTime(), 
      max: new Date().getTime(), 
      tickAmount: 8, 
      labels: {
        formatter: function (value) {
          return new Date(value).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        },
      },
    },
  }

  const series = [{ data: slicedData }]

  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}
      <Card>
        <Typography
          sx={{
            mb: 2.5,
            paddingTop: '20px',
            letterSpacing: '0.15px !important',
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#6C6583',
            fontWeight: 500,
            marginBottom: 0,
          }}
          className="heading_drop_shadow"
        >
          Timeline
        </Typography>
        <Typography
          sx={{
            mb: 7,
            textAlign: 'center',
            fontSize: '.9rem',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          Recent client timeline will appear here.
        </Typography>

        <CardContent
          sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}
        >
          {/* <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2'>Recent client timeline will appear here.</Typography>
        </Box> */}
          <ReactApexcharts type="rangeBar" options={options} series={series} />
        </CardContent>

        <Pagination
          sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Card>
    </>
  )
}

export default Gantt
