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
import { Grid, LinearProgress, Pagination, TextField } from '@mui/material'
import { allQueryKpi, getAllKpi, loadStorage } from 'src/Utils/func'
import UserCard from 'src/@core/components/userCard/UserCard'

const kpiList = () => {
  const user = loadStorage('cura_user')
  const [currentUsersService, setCurrentUsersService] = useState([])
  const [totalCompletedKpi, setTotalCompletedKpi] = useState(0)
  const [allTakenService, setAllTakenService] = useState([])
  const [allTakenServiceCopy, setAllTakenServiceCopy] = useState([])
  const [searchText, setSearchText] = useState('')

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const singleArray = allTakenService?.flat()
  const allData = singleArray?.slice(startIndex, endIndex)

  let sum = 0 // Define the sum variable outside the map method
  let serial = 1 // initialize counter variable outside the map function
  let segment
  let complitedKpiService = []

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    const fetchServiceData = async () => {
      const getAllQueryKpi = await allQueryKpi()

      setCurrentUsersService(getAllQueryKpi)

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

    fetchServiceData()
  }, [])

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
    if (!searchText || searchText === '') {
      setAllTakenService(allTakenServiceCopy)
    } else {
      const results = multiSearch(allTakenServiceCopy.flat(), searchText)
      setAllTakenService(results)
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
          KPI List
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

        <Grid
          container
          spacing={7}
          sx={{
            marginBottom: '10px',
            width: '99%',
            py: 8,
            paddingLeft: 5,
            alignItems: 'center',
          }}
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
              Find
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
              {allData?.map((item, index) => {
                let totalSegmentCount = 0

                // Calculate the total segment count for this array
                // array?.forEach(item => {
                const segmentCount = item.kpiCount[`${item.queryName}Segment`]
                totalSegmentCount += segmentCount || 0
                // })

                const arrayTotal = totalSegmentCount
                sum += arrayTotal

                // Render the JSX elements for this array
                return (
                  <>
                    {/* {array?.map((item, index) => ( */}
                    <TableRow
                      hover
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0,
                        },
                      }}
                      key={`${item.queryName}-${index}`}
                    >
                      <TableCell>{startIndex + index + 1}</TableCell>{' '}
                      {/* use the counter variable instead of index */}
                      <TableCell>{item?.clientName}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={item?.service?.name} arrow>
                          <img
                            className="iconImage"
                            src={item.service.serviceIcon}
                            alt=""
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {item.kpiCount[`${item.queryName}Segment`]}/
                        {item.service.segmentValue}
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={Math.round(
                            Number(
                              item.kpiCount[`${item.queryName}Segment`] /
                                Number(item.service.segmentValue)
                            ) * 100
                          )}
                        />
                        {Math.round(
                          Number(
                            item.kpiCount[`${item.queryName}Segment`] /
                              Number(item.service.segmentValue)
                          ) * 100
                        )}{' '}
                        % completed
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {user?.role !== 'executive' && (
          <Pagination
            sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
            count={Math.ceil(singleArray.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        )}
      </Card>
    </>
  )
}

export default kpiList
