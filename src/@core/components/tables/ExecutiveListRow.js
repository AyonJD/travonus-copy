import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Modal, Tooltip } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

import PrintableTable from 'src/@core/components/tables/PrintableTable'

// ** Icons Imports
import { findNearestDate } from 'src/Utils/func'

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
  languageIcon,
  localTransportIcon,
  telemedicineIcon,
} from 'src/Utils/Utils'
import ViewData from 'src/pages/Popup/ViewData'

const ExecutiveListRow = ({ row, index, selectedRows, handleSelectRow }) => {
  const [openData, setOpenData] = useState(false)
  const router = useRouter()
  const { formData } = row?.wrapper
  const allDates = [
    formData.passportExpiryDate,
    formData.visaExpiryDate,
    formData.reservationRctivationAxularyService,
    formData.healthInsuranceExpiryDate,
    formData.hotelCheckOutDate,
    formData.opdDate,
    formData.ipdDate,
    formData.telimedeicineDate,
    formData.treatmentPlanExicutedDate,
    formData.excursionBusinessName,
  ]

  // check if any element is false or empty string, if one is false then return false else return true
  const isAnyEmpty = allDates.some(element => element)

  const handlePrint = () => {
    router.push(`/print/${row?.wrapper?.uniqueClientId}`)
  }

  const formFields = [
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

  return (
    <>
      <TableRow
        className={`${
          isAnyEmpty && findNearestDate(allDates) ? 'table_row_bg' : ''
        }`}
      >
        <TableCell align="center">
          <Checkbox
            checked={selectedRows.indexOf(row.wrapper.uniqueClientId) !== -1}
            onChange={() => handleSelectRow(row.wrapper.uniqueClientId)}
            inputProps={{
              'aria-label': `Select row ${row.wrapper.uniqueClientId}`,
            }}
          />
        </TableCell>
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
            onClick={() => router.push(`/edit/${row?.wrapper?.uniqueClientId}`)}
            variant="contained"
            className="print_button"
          >
            Update
          </Button>

          {/* <Tooltip title="View full data" placement="top">
            <Button
              sx={{
                marginLeft: 2,
              }}
              variant="outlined"
              className="print_button right_print"
              onClick={() => setOpenData(true)}
            >
              View
            </Button>
          </Tooltip> */}
          {/* <Tooltip title='Print' placement='top'> */}
          {/* <Button variant='outlined' className='print_button right_print' onClick={handlePrint}>Print</Button> */}
          {/* </Tooltip> */}
        </TableCell>
      </TableRow>

      {openData && <ViewData data={formData} setOpenPopup={setOpenData} />}
    </>
  )
}

export default ExecutiveListRow
