import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import UserCard from 'src/@core/components/userCard/UserCard'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import {
  deleteLeads,
  getAllLead,
  getLeadPerUser,
  loadStorage,
} from 'src/Utils/func'
import LeadRecordTable from 'src/@core/components/tables/LeadRecordTable'
import { Box, Pagination, Typography } from '@mui/material'
import DeleteModal from 'src/@core/components/modal/deleteModal'
import SpinnerPopup from './Popup/SpinnerPopup'
import { parseDate } from 'src/Utils/Utils'
import dayjs from 'dayjs'

const leadrecords = () => {
  const user = loadStorage('cura_user')
  const [searchText, setSearchText] = useState('')
  const [startDate, setStartDate] = useState(
    new Date().getTime() - 1000 * 60 * 60 * 24
  )

  const [endDate, setEndDate] = useState(new Date().getTime())
  // const month = date.toLocaleString('default', { month: 'long' })
  // const year = date.getFullYear()
  // const [monthYear, setMonthYear] = useState(`${month} ${year}`)

  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])

  const [open, setOpen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = filteredLeads?.slice(startIndex, endIndex)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // ---------For pagination

  const settingLeadsPerRole = async () => {
    let leads = []
    if (user.role === 'admin' || user.role === 'supervisor') {
      leads = await getAllLead(false, startDate, endDate) // Get all leads without filtering
    } else {
      leads = await getLeadPerUser(user.name, false, startDate, endDate) // Get leads per user without filtering
    }

    // Sort the leads by wrapper.createdAt in descending order
    // leads.sort(
    //   (a, b) => parseDate(b.wrapper.createdAt) - parseDate(a.wrapper.createdAt)
    // )

    setLeads(leads) // Set the sorted leads
    setFilteredLeads(leads)
  }

  // console.log(leads, 'leads')

  // useEffect(() => {
  //   setMonthYear(`${month} ${year}`)
  // }, [month, year, date])

  useEffect(() => {
    settingLeadsPerRole()
  }, [startDate, endDate])

  // const filterByMonth = async leads => {
  //   if (leads?.length > 0) {
  //     const filteredLeads = leads.filter(lead => {
  //       const leadMonthYear = new Date(
  //         lead.wrapper.createdAt
  //       ).toLocaleDateString('en-US', {
  //         month: 'long',
  //         year: 'numeric',
  //       })

  //       return leadMonthYear === monthYear
  //     })
  //     setFilteredLeads(filteredLeads)
  //   }
  // }

  // useEffect(() => {
  //   filterByMonth(leads)
  // }, [monthYear, leads])

  /**
   * The function multiSearch filters an array of objects based on whether any of their values
   * contain a given search term.
   * @param leads - An array of objects representing leads, where each object has a property called
   * "wrapper" that contains key-value pairs of lead information.
   * @param searchTerm - The term that is being searched for in the leads array.
   * @returns The function `multiSearch` returns an array of objects from the `leads` array that have
   * at least one property value that includes the `searchTerm` string (case-insensitive). If the
   * `leads` array is empty, the function returns `undefined`.
   */
  const multiSearch = (leads, searchTerm) => {
    if (leads.length > 0) {
      return leads.filter(lead => {
        return Object.values(lead.wrapper).some(val => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }
  }

  const handleSearch = () => {
    const results = multiSearch(leads, searchText)
    setFilteredLeads(results)
  }

  // For lead selection================================>
  const [selectAll, setSelectAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const handleSelectAll = event => {
    setSelectAll(event.target.checked)
    if (event.target.checked) {
      const allIds = slicedData.map(row => row.wrapper.leaduuid)
      setSelectedRows(allIds)
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = id => {
    const selectedIndex = selectedRows.indexOf(id)
    let newSelectedRows = []

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, id)
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1))
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      )
    }

    setSelectedRows(newSelectedRows)
  }

  const handleDelete = async () => {
    setLoadingScreen(true)
    setOpen(false)
    await deleteLeads(selectedRows)
    const newFilterList = filteredLeads?.filter(
      row => !selectedRows.includes(row.wrapper.leaduuid)
    )
    setFilteredLeads(newFilterList)
    setLoadingScreen(false)
  }

  console.log(leads, 'leads')
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
          Lead Records
        </Typography>
        <Typography
          sx={{
            mb: 4,
            textAlign: 'center',
            fontSize: '.9rem',
            fontWeight: 500,
          }}
        >
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>

        <marquee
          style={{
            color: '#6C6583',
            fontWeight: 400,
            fontSize: '1rem',
            marginBottom: '10px',
          }}
        >
          Please use this list for data entry of new orders.
        </marquee>

        <CardContent>
          <Grid container spacing={7} sx={{ marginBottom: 5, width: '99%' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setSearchText(e.target.value)}
                fullWidth
                label="Search Lead"
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
                Find Records
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={7}>
            <Grid item xs={12} sm={3} sx={{ width: '100%' }}>
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <label style={{ marginBottom: '6px' }} htmlFor="picker">
                  Starting Date
                </label>
                <DatePicker
                  id="picker"
                  className="picker"
                  dateFormat="dd/MM/yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date.getTime())}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ width: '100%' }}>
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <label style={{ marginBottom: '6px' }} htmlFor="picker">
                  Ending Date
                </label>
                <DatePicker
                  id="picker"
                  className="picker"
                  dateFormat="dd/MM/yyyy"
                  selected={endDate}
                  onChange={date => setEndDate(date.getTime())}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />

      <Card>
        {/* <CardHeader title={`Lead Records for, ${monthYear}`} /> */}
        <CardContent>
          <LeadRecordTable
            // monthYear={monthYear}
            leads={slicedData}
            startIndex={startIndex}
            selectedRows={selectedRows}
            handleSelectRow={handleSelectRow}
            handleSelectAll={handleSelectAll}
            selectAll={selectAll}
          />
          {user?.role === 'admin' && slicedData.length > 0 && (
            <Grid container spacing={7}>
              <Grid item xs={12} sm={6} sx={{ textAlign: 'left', mt: 4 }}>
                <Button
                  onClick={() => setOpen(true)}
                  className="deleteButton"
                  variant="contained"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <Pagination
          sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
          count={Math.ceil(filteredLeads?.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Card>

      {open && (
        <DeleteModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
        />
      )}
      {loadingScreen && <SpinnerPopup setOpenPopup={setLoadingScreen} />}
    </>
  )
}

export default leadrecords
