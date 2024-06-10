import React, { useEffect, useState } from 'react'
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
import Button from '@mui/material/Button'
import {
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Pagination,
  TextField,
} from '@mui/material'

// ** Icons Imports
import {
  addKpi,
  getAllKpi,
  allQueryKpi,
  getAllUser,
  loadStorage,
  getKpiPerUser,
  updateKpi,
} from 'src/Utils/func'
import UserCard from 'src/@core/components/userCard/UserCard'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import { uid } from 'uid'
import { toast } from 'react-hot-toast'
import KpiTable from 'src/@core/components/tables/KpiTable'

const kpi = () => {
  const user = loadStorage('cura_user')
  const [executive, setExecutive] = useState('')
  const [kpi, setKpi] = useState(0)
  const [date, setDate] = useState('')
  const [allUser, setAllUser] = useState([])
  const [allExecutive, setAllExecutive] = useState([])
  const [currentUsersService, setCurrentUsersService] = useState([])
  const [serviceTakenByExecutive, setServiceTakenByExecutive] = useState([])
  const [totalCompletedKpi, setTotalCompletedKpi] = useState(0)
  const [allTakenService, setAllTakenService] = useState([])
  const [allTakenServiceCopy, setAllTakenServiceCopy] = useState([])
  const [searchText, setSearchText] = useState('')

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = serviceTakenByExecutive?.slice(startIndex, endIndex)
  const singleArray = allTakenService?.flat()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // ---------For pagination
  let complitedKpiService = []

  /* The above code is using the `useEffect` hook in a functional component in JavaScript. It is
    calling two functions: `getAllUser` and `getAllClient` with the `setAllUser` and `setKpiData`
    functions as arguments respectively. The `getAllUser` function is used to retrieve all users and
    update the state of `allUser`. The `getAllClient` function is used to retrieve all clients
    associated with the user's UUID and update the state of `kpiData`. The `useEffect` hook is used
    to ensure that these functions are called only once when the */
  useEffect(async () => {
    getAllUser(setAllUser)
  }, [])

  // ------------------> Restrict admin to interact with this page <------------------
  // useEffect(() => {
  //   if (user.role === 'admin') {
  //     const formElements = document.querySelectorAll('input, textarea, select')
  //     formElements.forEach(element => {
  //       element.disabled = true
  //     })
  //   }
  // }, [])

  useEffect(() => {
    const fetchServiceData = async () => {
      const getAllQueryKpi = await allQueryKpi()

      //-----------------> Getting the service for the current executive <------------
      const service = await getAllQueryKpi?.filter(singleKpi => {
        return singleKpi?.wrapper?.takenService?.some(singleService => {
          return singleService?.user?.uuid === user?.uuid
        })
      })

      if (user.role === 'executive') {
        setCurrentUsersService(service)
      } else {
        setCurrentUsersService(getAllQueryKpi)
      }

      if (user.role === 'executive') {
        //-------------> Find the taken service for the current executive <----------------
        const filteredServices = service?.flatMap(singleService => {
          const takenServices = singleService?.wrapper?.takenService?.filter(
            service => service.willRender === true
          )
          return takenServices ?? []
        })

        setServiceTakenByExecutive(filteredServices)

        /* The above code is calculating the average value of a specific KPI (key performance
                indicator) for a set of filtered services. It uses the `map()` method to iterate
                over each service in the `filteredServices` array and calculates the average value
                of the KPI by summing up the values of the KPI for each segment and dividing by the
                total number of segments. The result is an array of average values for each service
                in the `filteredServices` array. */
        const average = filteredServices?.map(singleService => {
          let key
          let total = 0
          let count = 0
          for (key in singleService.kpiCount) {
            total += Number(
              singleService.kpiCount[`${singleService.queryName}Segment`]
            )
            count++
          }
          return total / count
        })

        const kpi = await getKpiPerUser(user.name)
        if (!kpi.length) {
          toast.error('Kpi is deleted for this executive by the supervisor')
          return
        }
        //--------------> Check if every segment is completed <----------------
        if (filteredServices?.length > 0) {
          let completed
          let key
          let segmentCompleted = false
          filteredServices?.forEach(singleService => {
            for (key in singleService) {
              if (
                key !== 'kpiCount' &&
                key !== 'kpi' &&
                key !== 'service' &&
                key !== 'user' &&
                key !== 'willRender' &&
                key !== 'queryName' &&
                key !== 'clientName'
              ) {
                if (
                  singleService.kpiCount[`${key}Segment`] ===
                  singleService.service.segmentValue
                ) {
                  if (
                    kpi[0]?.wrapper?.complitedKpiService?.clientName !==
                      singleService.clientName &&
                    kpi[0]?.wrapper?.complitedKpiService?.queryName !==
                      singleService.queryName
                  ) {
                    complitedKpiService.push(singleService)
                    setTotalCompletedKpi(prev => {
                      completed =
                        prev + Number(singleService.kpiCount[`${key}Segment`])
                      return (
                        prev + Number(singleService.kpiCount[`${key}Segment`])
                      )
                    })
                    segmentCompleted = true
                  }
                  break
                }
              }
            }
          })

          /* The above code is checking if a segment has been completed. If it has, it creates
                    an object `dataToSend` with two properties `complitedKpiService` and
                    `complitedKpiTotal`. It then calls the `updateKpi` function with the `kpiuuid` of
                    the first element in the `kpi` array and the `dataToSend` object as arguments. */
          if (segmentCompleted) {
            const dataToSend = {
              complitedKpiService: complitedKpiService,
              complitedKpiTotal: completed,
              // uniqueClientId: user.uniqueClientId
            }

            updateKpi(kpi[0]?.wrapper?.kpiuuid, dataToSend)
          }
        }
      } else {
        //----------------> Find the taken service for the current executive <----------------
        const filteredServices = getAllQueryKpi?.map(singleService => {
          return singleService?.wrapper?.takenService?.filter(
            singleService => singleService.willRender
          )
        })

        let key
        const kpi = await getAllKpi()

        /* The code is filtering an array of services and then iterating over each service to
                check if it meets certain conditions. If the conditions are met, it checks if the
                service has been completed before and if not, it adds it to an array of completed
                services and updates a total count of completed KPIs. The code also uses optional
                chaining to handle cases where the array or object may be null or undefined. */
        filteredServices?.forEach(singleService => {
          singleService?.forEach(service => {
            for (key in service) {
              if (
                key !== 'kpiCount' &&
                key !== 'kpi' &&
                key !== 'service' &&
                key !== 'user' &&
                key !== 'willRender' &&
                key !== 'queryName' &&
                key !== 'clientName'
              ) {
                if (
                  service.kpiCount[`${key}Segment`] ===
                  service.service.segmentValue
                ) {
                  kpi?.forEach(singleKpi => {
                    singleKpi?.wrapper?.complitedKpiService?.forEach(
                      singleCompletedService => {
                        if (
                          singleCompletedService.clientName ===
                            service.clientName &&
                          singleCompletedService.queryName === service.queryName
                        ) {
                          complitedKpiService.push(service)

                          setTotalCompletedKpi(prev => {
                            return (
                              prev + Number(service.kpiCount[`${key}Segment`])
                            )
                          })
                        }
                      }
                    )
                  })
                  break
                }
              }
            }
          })
        })

        setAllTakenService(filteredServices)
        setAllTakenServiceCopy(filteredServices)
      }
    }

    fetchServiceData()
  }, [])

  /* The above code is using the `useEffect` hook in React to filter all users based on their role
    and set the filtered result to a state variable called `allExecutive`. Specifically, it filters
    all users whose role is "executive" from an array of all users called `allUser`, and then sets
    the filtered result to the state variable `allExecutive`. The `useEffect` hook is triggered
    whenever the `allUser` state variable changes. */
  useEffect(() => {
    const allExecutive = allUser.filter(item => item.role === 'executive')
    setAllExecutive(allExecutive)
  }, [allUser])

  const handleSelectChange = event => {
    setExecutive(event.target.value)
  }

  /**
   * The function calculates the number of days between the current date and a given date.
   * @param dateString - A string representing a date in the format "YYYY-MM-DD".
   * @returns The function `dayCount` returns the number of days between the current date and the date
   * passed as a parameter in the `dateString` argument.
   */
  const dayCount = dateString => {
    const today = new Date()
    const date = new Date(dateString)

    const difference = date - today
    const dayCount = Math.floor(difference / (1000 * 60 * 60 * 24))

    return dayCount
  }

  const handleSubmit = async () => {
    if (user?.role !== 'supervisor') {
      toast.error('You are not authorized to add KPI')
      return
    }

    if (!kpi || !date || !executive) {
      toast.error('Please fill all the fields')
      return
    }

    const existingKpi = await getKpiPerUser(executive)
    if (existingKpi.length > 0) {
      toast.error('KPI already added for this executive')
      return
    }

    const uuid = uid()
    const day = dayCount(date)
    console.log(day, 'day')

    if (day < 0) {
      toast.error('Please select a valid date', {
        id: 'invalid-date',
      })
      return
    }

    await addKpi(uuid, {
      executive,
      kpiCount: kpi,
      dayCount: day,
      createdAt: new Date().toISOString(),
      kpiuuid: uuid,
      user: user,
    })
      .then(() => {
        toast.success('KPI added successfully', {
          id: 'success-kpi',
        })
        window.location.reload()
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const multiSearch = (kpi, searchTerm) => {
    if (kpi.length > 0) {
      const filtered = kpi.filter(item => {
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      })

      return filtered
    }
  }

  const handleSearch = () => {
    if (user.role === 'executive') {
      if (!searchText || searchText === '') {
        setServiceTakenByExecutive(serviceTakenByExecutive)
      } else {
        const results = multiSearch(serviceTakenByExecutive, searchText)
        setServiceTakenByExecutive(results)
      }
    } else {
      if (!searchText || searchText === '') {
        setAllTakenService(allTakenServiceCopy)
      } else {
        const results = multiSearch(allTakenServiceCopy.flat(), searchText)
        setAllTakenService(results)
      }
    }
  }

  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}

      {user?.role === 'supervisor' && (
        <>
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
              KPI Overview
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

            <Grid sx={{ marginBottom: 5 }} container spacing={5}>
              <Grid item xs={12} sm={6}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={e => setKpi(e.target.value)}
                        type="number"
                        fullWidth
                        label="KPI Input"
                        placeholder=""
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="form-layouts-separator-multiple-select-label">
                          Executive
                        </InputLabel>
                        <Select
                          disabled={user?.role !== 'supervisor'}
                          single
                          value={executive}
                          onChange={handleSelectChange}
                          id="form-layouts-separator-multiple-select"
                          labelId="form-layouts-separator-multiple-select-label"
                          input={
                            <OutlinedInput
                              label="Language"
                              id="select-multiple-language"
                            />
                          }
                        >
                          {allExecutive
                            .sort((a, b) => {
                              // Sort alphabetically by name
                              if (a.name < b.name) {
                                return -1
                              }
                              if (a.name > b.name) {
                                return 1
                              }
                              return 0
                            })
                            .map((user, i) => {
                              // Add numerical suffix to names based on order in array
                              const name = `Executive ${i + 1}`
                              return (
                                <MenuItem key={user.name} value={name}>
                                  {name}
                                </MenuItem>
                              )
                            })}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        onChange={e => setDate(e.target.value)}
                        type="date"
                        fullWidth
                        label=""
                        placeholder=""
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <br />
        </>
      )}

      <KpiTable
        totalCompletedKpi={totalCompletedKpi}
        allExecutive={allExecutive}
      />

      <br />
      {user?.role === 'executive' && (
        <Card>
          <Grid
            container
            spacing={7}
            sx={{ marginBottom: '10px', width: '99%', py: 8, paddingLeft: 5 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setSearchText(e.target.value)}
                fullWidth
                label="Search"
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
                Find Kpi
              </Button>
            </Grid>
          </Grid>
          <TableContainer>
            <Table
              className="table"
              sx={{ minWidth: 800 }}
              aria-label="table in dashboard"
            >
              <TableHead sx={{ background: '#eeeef8' }}>
                <TableRow>
                  <TableCell>Serial</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell align="center">Services</TableCell>
                  <TableCell>Lead KPI</TableCell>
                  <TableCell>Task Progress In Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData?.map((row, rowIndex) => {
                  let segment
                  let key
                  for (key in row) {
                    if (
                      row.willRender &&
                      key !== 'kpiCount' &&
                      key !== 'kpi' &&
                      key !== 'service' &&
                      key !== 'user' &&
                      key !== 'willRender' &&
                      key !== 'queryName' &&
                      key !== 'clientName'
                    ) {
                      segment = row.kpiCount[`${key}Segment`]
                      break
                    }
                  }

                  return (
                    <TableRow
                      hover
                      key={rowIndex}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>{startIndex + rowIndex + 1}</TableCell>
                      <TableCell
                        sx={{
                          py: theme => `${theme.spacing(0.5)} !important`,
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem !important',
                            }}
                          >
                            {row?.clientName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={row?.service?.name} arrow>
                          <img
                            className="iconImage"
                            src={`${row.service.serviceIcon}`}
                            alt=""
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {row.visa &&
                          `${row?.kpiCount?.visaSegment} / ${row?.service?.segmentValue}`}

                        {row.reservation &&
                          `${row?.kpiCount?.reservationSegment} / ${row?.service?.segmentValue}`}

                        {row.insurance &&
                          `${row?.kpiCount?.insuranceSegment} / ${row?.service?.segmentValue}`}

                        {row.hotel &&
                          `${row?.kpiCount?.hotelSegment} / ${row?.service?.segmentValue}`}

                        {row.transport &&
                          `${row?.kpiCount?.transportSegment} / ${row?.service?.segmentValue}`}

                        {row.airportMeet &&
                          `${row?.kpiCount?.airportMeetSegment} / ${row?.service?.segmentValue}`}

                        {row.airAmbulance &&
                          `${row?.kpiCount?.airAmbulanceSegment} / ${row?.service?.segmentValue}`}

                        {row.doctorOPD &&
                          `${row?.kpiCount?.doctorOPDSegment} / ${row?.service?.segmentValue}`}

                        {row.doctorIPD &&
                          `${row?.kpiCount?.doctorIPDSegment} / ${row?.service?.segmentValue}`}

                        {row.telemedicine &&
                          `${row?.kpiCount?.telemedicineSegment} / ${row?.service?.segmentValue}`}

                        {row.treatmentPlan &&
                          `${row?.kpiCount?.treatmentPlanSegment} / ${row?.service?.segmentValue}`}

                        {row.excursion &&
                          `${row?.kpiCount?.excursionSegment} / ${row?.service?.segmentValue}`}
                      </TableCell>

                      {row.visa && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.visaSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.visaSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.reservation && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.reservationSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.reservationSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.insurance && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.insuranceSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.insuranceSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.hotel && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.hotelSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.hotelSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.transport && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.transportSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.transportSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.airportMeet && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.airportMeetSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.airportMeetSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.airAmbulance && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.airAmbulanceSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.airAmbulanceSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.doctorOPD && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.doctorOPDSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.doctorOPDSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.doctorIPD && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.doctorIPDSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.doctorIPDSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.telemedicine && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.telemedicineSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.telemedicineSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.treatmentPlan && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.treatmentPlanSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.treatmentPlanSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          %
                        </TableCell>
                      )}
                      {row.excursion && (
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={Math.round(
                              Number(
                                row?.kpiCount?.excursionSegment /
                                  Number(row?.service?.segmentValue)
                              ) * 100
                            )}
                          />
                          {Math.round(
                            Number(
                              row?.kpiCount?.excursionSegment /
                                Number(row?.service?.segmentValue)
                            ) * 100
                          )}{' '}
                          % completed
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
            count={Math.ceil(serviceTakenByExecutive.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Card>
      )}
    </>
  )
}

export default kpi
