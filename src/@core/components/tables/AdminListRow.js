import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useRouter } from 'next/router'

import { findNearestDate, loadStorage } from 'src/Utils/func'
import toast, { Toaster } from 'react-hot-toast'

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
} from 'src/Utils/Utils'
import { Button, Checkbox } from '@mui/material'
import ViewData from 'src/pages/Popup/ViewData'

export const formFields = [
  {
    name: 'visa',
    title: 'Visa',
    icon: visaIcon,
  },
  {
    name: 'reservation',
    title: 'Ticketing',
    icon: ticketingIcon,
  },
  {
    name: 'insurance',
    title: 'Health',
    icon: healthInsuranceIcon,
  },
  {
    name: 'hotel',
    title: 'Hotel',
    icon: hotelIcon,
  },
  {
    name: 'transport',
    title: 'Transport',
    icon: localTransportIcon,
  },
  {
    name: 'airportMeet',
    title: 'Air Ticket',
    icon: airportMeetIcon,
  },
  {
    name: 'airAmbulance',
    title: 'Air Ambulance',
    icon: airAmbulanceIcon,
  },
  {
    name: 'doctorOPD',
    title: 'Doctor',
    icon: doctorSelectionIcon,
  },
  {
    name: 'doctorIPD',
    title: 'Doctor',
    icon: doctorSelectionIcon,
  },
  {
    name: 'telemedicine',
    title: 'Tele Medicine',
    icon: telemedicineIcon,
  },
  {
    name: 'treatmentPlan',
    title: 'Treatment',
    icon: hospitalSelectionIcon,
  },
  {
    name: 'excursion',
    title: 'Family Execusion',
    icon: guideManageIcon,
  },
]

const AdminListRow = ({ handleSelectRow, row, index, selectedRows }) => {
  const [openData, setOpenData] = useState(false)
  const user = loadStorage('cura_user')
  const router = useRouter()

  const { formData } = row?.wrapper
  const allDates = [
    formData?.passportExpiryDate,
    formData?.visaExpiryDate,
    formData?.reservationRctivationAxularyService,
    formData?.healthInsuranceExpiryDate,
    formData?.hotelCheckOutDate,
    formData?.opdDate,
    formData?.ipdDate,
    formData?.telimedeicineDate,
    formData?.treatmentPlanExicutedDate,
    formData?.excursionBusinessName,
  ]

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  // check if any element is false or empty string, if one is false then return false else return true
  const isAnyEmpty = allDates.some(element => element)

  const handleUpdateRedirect = () => {
    // if (user.role === 'supervisor' || user.role === 'admin') {
    //   toast.error('You are not authorized to update this client')
    //   return
    // } else {
    router.push(`/edit/${row?.wrapper?.uniqueClientId}`)
    // }
  }

  return (
    <>
      <TableRow
        className={`${
          isAnyEmpty && findNearestDate(allDates) ? 'table_row_bg' : ''
        }`}
        hover
        key={index}
        sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
      >
        {(user.role === 'admin' || user.role === 'supervisor') && (
          <TableCell align="center">
            <Checkbox
              checked={selectedRows.indexOf(row.wrapper.uniqueClientId) !== -1}
              onChange={() => handleSelectRow(row.wrapper.uniqueClientId)}
              inputProps={{
                'aria-label': `Select row ${row.wrapper.uniqueClientId}`,
              }}
            />
          </TableCell>
        )}
        <TableCell align="center">
          <Typography>{index + 1}</Typography>
        </TableCell>
        <TableCell align="center">{row?.wrapper?.uniqueClientId}</TableCell>
        <TableCell
          align="center"
          sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}
            >
              {row?.wrapper?.formData?.clientName}
            </Typography>
            <Typography variant="caption">
              {row?.wrapper?.formData?.contactNumber}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="center" className="no_wrap">
          {formData?.serviceArr.length > 0 ? (
            <>
              {formFields.map(
                (field, index) =>
                  formData?.serviceArr?.includes(field.name) && (
                    <Tooltip key={index} title={field.title} arrow>
                      <img
                        src={field.icon}
                        alt={field.title}
                        className="iconImage"
                      />
                    </Tooltip>
                  )
              )}
            </>
          ) : (
            <>
              <div>No Service Selected</div>
            </>
          )}
        </TableCell>
        <TableCell align="center">
          {formData?.comment || 'Comment here'}
        </TableCell>
        <TableCell align="center" className="no_wrap">
          <Button
            onClick={handleUpdateRedirect}
            variant="contained"
            className="print_button"
          >
            {user?.role === 'supervisor'
              ? 'View Details'
              : user?.role === 'admin'
              ? 'Details'
              : 'Update'}
          </Button>

          {user?.role !== 'accountant' && user?.role !== 'supervisor' && (
            <Tooltip title="View full data" placement="top">
              <Button
                sx={{
                  marginLeft: 2,
                }}
                variant="outlined"
                className="print_button right_print"
                onClick={() => setOpenData(true)}
              >
                View Details
              </Button>
            </Tooltip>
          )}
          {/* <Button onClick={() => router.push(`/print/${row?.wrapper?.uniqueClientId}`)} variant='outlined' className='print_button right_print'>Print</Button> */}
        </TableCell>
      </TableRow>
      {/* <Toaster /> */}
      {openData && <ViewData data={formData} setOpenPopup={setOpenData} />}
    </>
  )
}

export default AdminListRow
