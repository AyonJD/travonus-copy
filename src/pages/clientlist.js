// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Pagination,
  TableFooter,
  TextField,
  Typography,
} from '@mui/material'
import {
  deleteClient,
  getAllClient,
  getClientPerUser,
  getClientPeruniqueClientIdArray,
  loadStorage,
} from 'src/Utils/func'
import { useRouter } from 'next/router'
import UserCard from 'src/@core/components/userCard/UserCard.js'
import DatePicker from 'react-datepicker'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import 'react-datepicker/dist/react-datepicker.css'
import ExecutiveListRow from 'src/@core/components/tables/ExecutiveListRow.js'
import AdminListRow from 'src/@core/components/tables/AdminListRow.js'
import { Toaster, toast } from 'react-hot-toast'
import DeleteModal from 'src/@core/components/modal/deleteModal'
import Loader from 'src/@core/components/loader'
import MargeInvoiceTable from 'src/@core/components/tables/MargeInvoiceTable'
import SpinnerPopup from './Popup/SpinnerPopup'

const TableCollapsible = () => {
  const router = useRouter()
  const user = loadStorage('cura_user')
  const [searchText, setSearchText] = useState('')
  const [date, setDate] = useState(new Date())
  const [clientList, setClientList] = useState([])
  const [clientListPerUser, setClientListPerUser] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedClientFullData, setSelectedClientFullData] = useState([])
  const [renderPrinter, setRenderPrinter] = useState(false)

  // ==========
  const [startDate, setStartDate] = useState(
    new Date().getTime() - 1000 * 60 * 60 * 24
  )

  const [endDate, setEndDate] = useState(new Date().getTime())
  // ==========

  // const month = date.toLocaleString('default', { month: 'long' })
  // const year = date.getFullYear()
  // const [monthYear, setMonthYear] = useState(`${month} ${year}`)

  const [filterList, setFilterList] = useState([])
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  // useEffect(() => {
  //   setMonthYear(`${month} ${year}`)
  // }, [month, year, date])

  /**
   * The function filters a list of clients by month and year based on the user's role.
   * @param clientList - an array of client objects that contain information about leads.
   */
  // const filterByMonth = async clientList => {
  //   if (clientList.length > 0) {
  //     const filteredLeads = clientList.filter(client => {
  //       if (
  //         user.role === 'admin' ||
  //         user.role === 'supervisor' ||
  //         user.role === 'accountant'
  //       ) {
  //         const leadMonthYear = new Date(
  //           client.wrapper.createdOn
  //         ).toLocaleDateString('en-US', {
  //           month: 'long',
  //           year: 'numeric',
  //         })
  //         return leadMonthYear === monthYear
  //       }
  //     })

  //     // Sort filteredLeads by the recent time
  //     const sortedLeads = filteredLeads.sort(
  //       (a, b) => new Date(b.wrapper.createdOn) - new Date(a.wrapper.createdOn)
  //     )
  //     setFilterList(sortedLeads)
  //   }
  // }

  // console.log(clientList, 'clientList')

  /**
   * This function filters a list of clients by month and year for executive users.
   * @param clientListPerUser - It is an array of client objects that belong to a specific user.
   */
  // const filterByMonthExecutiveView = async clientListPerUser => {
  //   if (clientListPerUser.length > 0) {
  //     const filteredLeads = clientListPerUser.filter(client => {
  //       if (user.role === 'executive') {
  //         const leadMonthYear = new Date(
  //           client.wrapper.createdOn
  //         ).toLocaleDateString('en-US', {
  //           month: 'long',
  //           year: 'numeric',
  //         })
  //         return leadMonthYear === monthYear
  //       }
  //     })

  //     // Sort filteredLeads by the recent time
  //     const sortedLeads = filteredLeads.sort(
  //       (a, b) => new Date(b.wrapper.createdOn) - new Date(a.wrapper.createdOn)
  //     )
  //     setFilterList(sortedLeads)
  //   }
  // }

  /* This is a React hook called `useEffect` that is used to perform side effects in a functional
  component. In this case, it is used to filter the client list based on the selected month and
  year. */
  // useEffect(() => {
  //   if (
  //     user.role === 'admin' ||
  //     user.role === 'supervisor' ||
  //     user.role === 'accountant'
  //   ) {
  //     // filterByMonth(clientList)
  //   }

  //   if (user.role === 'executive') {
  //     // filterByMonthExecutiveView(clientListPerUser)
  //   }
  // }, [monthYear, clientList, clientListPerUser])

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  let url
  if (user.role === 'executive' || user.role === 'accountant') {
    url = `/client/${user.uuid}`
  } else {
    url = `/client`
  }

  //-------------> Read the formData from database <-----------------
  useEffect(async () => {
    if (
      user.role === 'admin' ||
      user.role === 'supervisor' ||
      user.role === 'accountant'
    ) {
      const allClient = await getAllClient()
      setClientList(allClient)
      setFilterList(allClient)
    }

    if (user.role === 'executive') {
      const singleClient = await getClientPerUser(user.uuid, startDate, endDate)
      setClientListPerUser(singleClient)
      setFilterList(singleClient)
    }
  }, [])

  /**
   * This function handles pagination by setting the page number and slicing the data to display a
   * specific range of rows.
   * @param event - The event parameter is an object that represents the event that triggered the
   * function. In this case, it is likely a click event on a pagination button or link.
   * @param newPage - The new page number that the user has selected.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = filterList?.slice(startIndex, endIndex)

  /**
   * This function handles the selection of all rows in a table and updates the selected rows
   */
  const handleSelectAll = event => {
    setSelectAll(event.target.checked)
    if (event.target.checked) {
      const allIds = slicedData.map(row => row.wrapper.uniqueClientId)
      setSelectedRows(allIds)
    } else {
      setSelectedRows([])
    }
  }

  /**
   * The function handles the selection of rows in a table by adding or removing the selected row's ID
   * from an array of selected rows.
   * @param id - The id parameter is the identifier of the row that was selected/deselected.
   */
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

  /**
   * This function deletes selected clients and updates the filter list while displaying a success
   * message.
   */
  const handleDelete = async () => {
    setLoadingScreen(true)
    setOpen(false)
    await deleteClient(selectedRows)
    const newFilterList = filterList?.filter(
      row => !selectedRows.includes(row.wrapper.uniqueClientId)
    )
    setFilterList(newFilterList)
    setLoadingScreen(false)
  }

  const multiSearch = (client, searchTerm) => {
    if (client.length > 0) {
      return client.filter(item => {
        return Object.values(item.wrapper.formData).some(val => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }
  }

  const handleSearch = () => {
    if (user?.role === 'executive') {
      const results = multiSearch(clientListPerUser, searchText)
      setFilterList(results)
    } else {
      const results = multiSearch(clientList, searchText)
      setFilterList(results)
    }
  }

  const handleMargeAndPrint = () => {
    setLoading(true)
    const fetchData = async () => {
      const clientData = await getClientPeruniqueClientIdArray(selectedRows)
      setSelectedClientFullData(clientData)
      setLoading(false)
      setRenderPrinter(true)

      // remove the bottom rendered table
      // setTimeout(() => {
      //   if (typeof window !== 'undefined') {
      //     window.location.reload()
      //   }
      // }, 3000)
    }
    fetchData()
  }

  // if (loading) return <Loader />

  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}
      <>
        <Card>
          {/* <CardHeader title={`Showing Records for ${monthYear}`} /> */}
          <CardContent>
            <Grid
              container
              spacing={7}
              sx={{ marginBottom: '10px', width: '99%' }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={e => setSearchText(e.target.value)}
                  fullWidth
                  label="Search Client"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => {
                    handleSearch()
                  }}
                  className="search_button_height"
                  variant="contained"
                  sx={{
                    marginLeft: {
                      xs: '0px',
                      lg: 4.7,
                    },
                  }}
                >
                  Find Records
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

            <Grid container spacing={7}>
              <Grid item xs={12} sm={3} sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
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
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
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
      </>

      <br />
      <br></br>
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
          Client List
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
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead sx={{ background: '#eeeef8' }}>
              <TableRow>
                {(user.role === 'admin' ||
                  user.role === 'supervisor' ||
                  user.role === 'executive') && (
                  <TableCell align="center">
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                      inputProps={{ 'aria-label': 'Select all rows' }}
                    />
                  </TableCell>
                )}
                <TableCell align="center">Serial</TableCell>
                <TableCell align="center">Client ID</TableCell>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Services</TableCell>
                <TableCell align="center">Comment</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientList.length === 0 ? (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {user.role === 'executive' &&
                  clientListPerUser.length === 0 ? (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        No Data Found
                      </TableCell>
                    </TableRow>
                  ) : user.role === 'executive' ? (
                    slicedData?.map((row, index) => (
                      <ExecutiveListRow
                        row={row}
                        index={startIndex + index}
                        handleSelectRow={handleSelectRow}
                        selectedRows={selectedRows}
                      />
                    ))
                  ) : (
                    slicedData?.map((row, index) => (
                      <AdminListRow
                        handleSelectRow={handleSelectRow}
                        selectedRows={selectedRows}
                        row={row}
                        index={startIndex + index}
                      />
                    ))
                  )}
                </>
              )}
            </TableBody>
            {user.role === 'admin' && (
              <>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Grid container justifyContent="flex-start">
                        <Grid item xs={12} sm={6}>
                          <Button
                            onClick={handleMargeAndPrint}
                            variant="outlined"
                            className="right_print"
                            sx={{ mr: 2 }}
                          >
                            Merge Invoice
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                          <Button
                            onClick={() => setOpen(true)}
                            className="deleteButton"
                            variant="contained"
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </>
            )}

            {(user.role === 'supervisor' || user.role === 'executive') && (
              <>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: 'right' }}>
                      <Grid container justifyContent="flex-start">
                        <Button
                          onClick={handleMargeAndPrint}
                          variant="outlined"
                          className="right_print"
                        >
                          Merge Invoice
                        </Button>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </>
            )}
          </Table>
        </TableContainer>
        <Pagination
          sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
          count={Math.ceil(filterList?.length / rowsPerPage)}
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
      {renderPrinter && (
        <MargeInvoiceTable clientData={selectedClientFullData} />
      )}
      {/* <Toaster /> */}
    </>
  )
}

export default TableCollapsible
