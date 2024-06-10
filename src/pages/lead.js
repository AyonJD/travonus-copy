import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import {
  Button,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
} from '@mui/material'
import {
  getAllLead,
  getLeadPerUser,
  loadStorage,
  updateLeads,
} from 'src/Utils/func'
import UserCard from 'src/@core/components/userCard/UserCard'
import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

const lead = () => {
  const user = loadStorage('cura_user')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [leadStatus, setLeadStatus] = useState(null)
  const [leadType, setLeadType] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [noteIndex, setNoteIndex] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)
  const [note, setNote] = useState('')
  const [filteredLeads, setFilteredLeads] = useState([])
  const router = useRouter()
  const [disabledStatus, setDisabledStatus] = useState(
    filteredLeads?.map(() => false)
  )

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

  useEffect(() => {
    filterByDate(new Date())
  }, [])

  const handleUpdateLead = async uuid => {
    if (leadType !== 'Not Interested' && leadStatus === 'Not Converted')
      return toast.error('Please select lead status')

    if (
      selectedRow?.wrapper?.leadstatus !== 'Not Interested' &&
      leadStatus !== 'Not Interested' &&
      !selectedRow?.wrapper?.leadtype &&
      !leadType
    ) {
      return toast.error('Please select lead status')
    }
    let leadData = {
      updatedAt: new Date(),
      leadstatus: leadStatus,
      leadtype: leadType,
      note: note,
    }

    await updateLeads(uuid, leadData)
    router.push('/leadrecords')
  }

  const handleLeadStatus = event => {
    setLeadStatus(event.target.value)
  }

  /**
   * This function filters leads by a specific date or the current date if none is provided.
   * @param date - The date parameter is an optional parameter that can be passed to the filterByDate
   * function. If a date is passed, the function will filter the leads based on that specific date.
   * If no date is passed, the function will use the current date as the default value.
   */
  const filterByDate = async date => {
    let allLeads = []
    if (user?.role === 'admin') {
      allLeads = await getAllLead(false) // as params false means I want to get all leads without filtering
    } else {
      allLeads = await getLeadPerUser(user.name, true) // as params false means I want to get all leads without filtering
    }

    console.log(allLeads, 'all leads')
    const initialDate = date || new Date()

    const inserterDate = new Date(initialDate)

    const filteredData = allLeads?.filter(item => {
      const createdAt = new Date(Date.parse(item.wrapper.createdAt))

      return createdAt.toDateString() === inserterDate.toDateString()
    })
    setFilteredLeads(filteredData)
    setDisabledStatus(filteredData?.map(() => false))
  }

  useEffect(() => {
    filterByDate(selectedDate)
  }, [selectedDate])

  const convertDate = dateString => {
    let date = new Date(dateString)
    let formattedDate = date.toISOString().slice(0, 10)
    return formattedDate
  }

  // Handle Lead Status disable
  const handleLeadType = (e, index) => {
    const { value } = e.target
    setLeadType(value)
    if (value === 'Not Interested') {
      setLeadStatus('Not Converted')
      setDisabledStatus(prevState =>
        prevState.map((state, i) => (i === index ? true : state))
      )
    } else {
      setDisabledStatus(prevState =>
        prevState.map((state, i) => (i === index ? false : state))
      )
    }
  }

  return (
    <>
      {/* <UserCard />
      <br /> */}
      <Card>
        <CardHeader title="Filter by date" />

        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <TextField
                value={convertDate(selectedDate)}
                onChange={e => setSelectedDate(e.target.value)}
                type="date"
                fullWidth
                label=""
                placeholder=""
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      {/* <Card>
        <CardHeader
          title="Lead Status"
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: '2rem !important',
              letterSpacing: '0.15px !important',
            },
          }}
        />
      </Card>

      <br /> */}

      <Card>
        <Typography
          sx={{
            mb: 1.5,
            paddingTop: '20px',
            letterSpacing: '0.15px !important',
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#6C6583',
            fontWeight: 500,
          }}
          className="heading_drop_shadow"
        >
          Current Lead Status
        </Typography>
        <Typography
          sx={{
            mb: 7,
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

        <TableContainer>
          <Table
            className="table"
            sx={{ minWidth: 800 }}
            aria-label="table in dashboard"
          >
            <TableHead sx={{ background: '#eeeef8' }}>
              <TableRow>
                <TableCell align="center">Serial</TableCell>
                <TableCell align="center">Lead Description</TableCell>
                <TableCell align="center">Executive</TableCell>
                <TableCell align="center">Lead Type</TableCell>
                <TableCell align="center">Lead Status</TableCell>

                <TableCell align="center">Note</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads?.length > 0 ? (
                <>
                  {slicedData?.map((row, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        <Typography>{startIndex + index + 1}</Typography>
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          py: theme => `${theme.spacing(0.5)} !important`,
                        }}
                      >
                        <Typography>{row?.wrapper?.lead_details}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {row?.wrapper?.executive}
                      </TableCell>
                      <TableCell align="center">
                        {/* {row.leadtype} */}

                        <FormControl fullWidth>
                          <InputLabel id="form-layouts-separator-multiple-select-label">
                            Select Type
                          </InputLabel>
                          <Select
                            disabled={user.role === 'admin'}
                            single
                            onChange={e => {
                              handleLeadType(e, index)
                              setSelectedIndex(index)
                            }}
                            label="Select Type"
                            value={
                              selectedIndex === index
                                ? leadType
                                : row?.wrapper?.leadtype
                            }
                            id="form-layouts-separator-multiple-select"
                            labelId="form-layouts-separator-multiple-select-label"
                            input={
                              <OutlinedInput
                                label="Language"
                                id="select-multiple-language"
                              />
                            }
                          >
                            <MenuItem value="Interested">Interested</MenuItem>
                            <MenuItem value="Not Interested">
                              Not interested
                            </MenuItem>
                            <MenuItem value="Unreachable">Unreachable</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        {!disabledStatus[index] && (
                          <FormControl fullWidth>
                            <InputLabel id="form-layouts-separator-multiple-select-label">
                              Select Status
                            </InputLabel>
                            <Select
                              disabled={user.role === 'admin'}
                              required
                              single
                              label="Select Status"
                              onChange={e => {
                                handleLeadStatus(e)
                                setSelectedIndex(index)
                              }}
                              value={
                                selectedIndex === index
                                  ? leadStatus
                                  : row?.wrapper?.leadstatus
                              }
                              id="form-layouts-separator-multiple-select"
                              labelId="form-layouts-separator-multiple-select-label"
                              input={
                                <OutlinedInput
                                  label="Language"
                                  id="select-multiple-language"
                                />
                              }
                            >
                              <MenuItem value="Convertible">
                                Convertible
                              </MenuItem>
                              <MenuItem value="Continued">Continued</MenuItem>
                              <MenuItem value="Converted">Converted</MenuItem>
                              <MenuItem value="Not Converted">
                                Not Converted
                              </MenuItem>
                              <MenuItem value="Denied">Denied</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          disabled={user.role === 'admin'}
                          required
                          onChange={e => {
                            setSelectedRow(row)
                            setNoteIndex(index)
                            setNote(e.target.value)
                          }}
                          sx={{ minWidth: 150 }}
                          fullWidth
                          value={
                            noteIndex === index ? note : row?.wrapper?.note
                          }
                          label="Note"
                          placeholder="max 100 letters"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            handleUpdateLead(row?.wrapper?.leaduuid)
                          }}
                          className="custom_button"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ height: 55 }}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  <TableRow
                    hover
                    sx={{
                      '&:last-of-type td, &:last-of-type th': { border: 0 },
                    }}
                  >
                    <TableCell align="center" colSpan={7}>
                      <Typography variant="h6" align="center">
                        No Data Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
          count={Math.ceil(filteredLeads?.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Card>

      {/* <Toaster /> */}
    </>
  )
}

export default lead
