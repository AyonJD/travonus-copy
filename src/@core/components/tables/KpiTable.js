import React, { useEffect, useRef, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { getAllKpi, getKpiPerUser, loadStorage } from 'src/Utils/func'
import PieChartV2 from '../pie_chart_v2'
import { useRouter } from 'next/router'
import EditKpiPopup from 'src/pages/Popup/EditKpiPopup'
import DeleteKpiPopup from 'src/pages/Popup/DeleteKpiPopup'
import { Button, Grid, TextField } from '@mui/material'

const KpiTable = ({ totalCompletedKpi, allExecutive }) => {
  const [kpiList, setKpiList] = useState([])
  const router = useRouter()
  const user = loadStorage('cura_user')
  const [selectedRow, setSelectedRow] = useState({})
  const [editPopup, setEditPopup] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [filteredKpi, setFilteredKpi] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (user.role === 'executive') {
        const kpi = await getKpiPerUser(user.name)
        setKpiList(kpi)
        setFilteredKpi(kpi)
      } else {
        const kpi = await getAllKpi()
        setKpiList(kpi)
        setFilteredKpi(kpi)

        let key
        // kpi.forEach(singleKpi => {
        //     if (singleKpi.wrapper.complitedKpiService) {
        //         singleKpi.wrapper?.complitedKpiService?.forEach(completedKpi => {
        //             for (key in completedKpi) {
        //                 if (key !== "kpiCount" && key !== "kpi" && key !== "service" && key !== "user" && key !== "willRender" && key !== 'queryName' && key !== 'clientName') {
        //                     if (completedKpi.kpiCount[`${key}Segment`] === completedKpi.service.segmentValue) {
        //                         setCompletedKpi(prev => {
        //                             return prev + Number(completedKpi.kpiCount[`${key}Segment`])
        //                         })
        //                         break;
        //                     }
        //                 }
        //             }
        //         })
        //     }
        // })
      }
    }

    fetchData()
  }, [])

  // const multiSearch = (kpi, searchTerm) => {
  //   if (kpi.length > 0) {
  //     return kpi.filter(item => {
  //       return Object.values(item.wrapper).some(val => {
  //         return val.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //       })
  //     })
  //   }
  // }

  // const handleSearch = () => {
  //   if (!searchText || searchText === '') {
  //     setFilteredKpi(kpiList)
  //   } else {
  //     const results = multiSearch(kpiList, searchText)
  //     setFilteredKpi(results)
  //   }
  // }

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backgropFilter: '6px',
        }}
      >
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
        <Grid
          container
          spacing={7}
          sx={{ marginBottom: '10px', width: '99%', pb: 8, paddingLeft: 5 }}
        >
          {/* <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => setSearchText(e.target.value)}
              fullWidth
              label="Search Kpi"
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
        </Grid>
        <TableContainer>
          <Table
            className="table"
            sx={{ minWidth: 800 }}
            aria-label="table in dashboard"
          >
            <TableHead sx={{ background: '#eeeef8' }}>
              <TableRow>
                <TableCell align="center">Serial</TableCell>
                <TableCell align="center">Executive</TableCell>
                <TableCell align="center">Assigned Kpi</TableCell>
                <TableCell align="center">Completed Kpi</TableCell>
                <TableCell align="center">Incomplete Kpi</TableCell>
                <TableCell align="center">Day Count</TableCell>
                <TableCell align="center">Visual Chart</TableCell>
                {user?.role === 'supervisor' && (
                  <TableCell align="center">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredKpi.map((row, index) => {
                let total = 0

                let key
                let completedKpiTotal = 0
                row?.wrapper?.complitedKpiService?.forEach(completedKpi => {
                  for (key in completedKpi) {
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
                        completedKpi.kpiCount[`${key}Segment`] ===
                        completedKpi.service.segmentValue
                      ) {
                        completedKpiTotal += Number(
                          completedKpi.kpiCount[`${key}Segment`]
                        )
                        break
                      }
                    }
                  }
                })

                return (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': { border: 0 },
                    }}
                    // onClick={() => {
                    //   if (user.role === 'executive') {
                    //     localStorage.setItem(
                    //       'cura_totalCompletedKpi',
                    //       JSON.stringify(totalCompletedKpi)
                    //     )
                    //   } else {
                    //     localStorage.setItem(
                    //       'cura_totalCompletedKpi',
                    //       JSON.stringify(completedKpiTotal)
                    //     )
                    //   }
                    //   router.push(`/kpidetails/${row?.wrapper?.kpiuuid}`)
                    // }}
                  >
                    <TableCell align="center">
                      <Typography>{index + 1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.executive}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.kpiCount || 'Pending'}
                    </TableCell>
                    {user.role === 'executive' ? (
                      <>
                        <TableCell align="center">
                          {totalCompletedKpi > row?.wrapper?.kpiCount
                            ? row?.wrapper?.kpiCount
                            : totalCompletedKpi || 0}{' '}
                        </TableCell>
                        <TableCell align="center">
                          {row?.wrapper?.kpiCount - totalCompletedKpi === 0
                            ? 0
                            : row?.wrapper?.kpiCount - totalCompletedKpi < 0
                            ? 0
                            : row?.wrapper?.kpiCount - totalCompletedKpi ||
                              row?.wrapper?.kpiCount}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="center">
                          {completedKpiTotal > row?.wrapper?.kpiCount
                            ? row?.wrapper?.kpiCount
                            : completedKpiTotal || 0}{' '}
                        </TableCell>
                        <TableCell align="center">
                          {row?.wrapper?.kpiCount - completedKpiTotal === 0
                            ? 0
                            : row?.wrapper?.kpiCount - completedKpiTotal < 0
                            ? 0
                            : row?.wrapper?.kpiCount - completedKpiTotal ||
                              row?.wrapper?.kpiCount}
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      {row?.wrapper?.dayCount < 0
                        ? 0
                        : !row?.wrapper?.dayCount
                        ? 'Pending'
                        : row?.wrapper?.dayCount}
                    </TableCell>
                    {user.role === 'executive' ? (
                      <TableCell
                        sx={{ cursor: 'pointer' }}
                        align="center"
                        onClick={() => {
                          localStorage.setItem(
                            'cura_totalCompletedKpi',
                            JSON.stringify(totalCompletedKpi)
                          )

                          router.push(`/details/${row?.wrapper?.kpiuuid}`)
                        }}
                      >
                        <PieChartV2
                          data={[
                            {
                              value:
                                totalCompletedKpi > row?.wrapper?.kpiCount
                                  ? row?.wrapper?.kpiCount
                                  : totalCompletedKpi || 0,
                              label: `Completed Kpi(${
                                totalCompletedKpi > row?.wrapper?.kpiCount
                                  ? row?.wrapper?.kpiCount
                                  : totalCompletedKpi || 0
                              })`,
                            },

                            {
                              value:
                                row?.wrapper?.kpiCount - totalCompletedKpi === 0
                                  ? 0
                                  : row?.wrapper?.kpiCount - totalCompletedKpi <
                                    0
                                  ? 0
                                  : row?.wrapper?.kpiCount -
                                      totalCompletedKpi ||
                                    row?.wrapper?.kpiCount,
                              label: `Incomplete Kpi(${
                                row?.wrapper?.kpiCount - totalCompletedKpi === 0
                                  ? 0
                                  : row?.wrapper?.kpiCount - totalCompletedKpi <
                                    0
                                  ? 0
                                  : row?.wrapper?.kpiCount -
                                      totalCompletedKpi ||
                                    row?.wrapper?.kpiCount
                              })`,
                            },
                          ]}
                          height={60}
                          width={60}
                        />
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{ cursor: 'pointer' }}
                        align="center"
                        onClick={() => {
                          localStorage.setItem(
                            'cura_totalCompletedKpi',
                            JSON.stringify(completedKpiTotal)
                          )
                          router.push(`/details/${row?.wrapper?.kpiuuid}`)
                        }}
                      >
                        <PieChartV2
                          data={[
                            {
                              value:
                                completedKpiTotal > row?.wrapper?.kpiCount
                                  ? row?.wrapper?.kpiCount
                                  : completedKpiTotal || 0,
                              label: `Completed Kpi(${
                                completedKpiTotal > row?.wrapper?.kpiCount
                                  ? row?.wrapper?.kpiCount
                                  : completedKpiTotal || 0
                              })`,
                            },

                            {
                              value: row?.wrapper?.kpiCount - completedKpiTotal,
                              label: `Incomplete Kpi(${
                                row?.wrapper?.kpiCount - completedKpiTotal
                              })`,
                            },
                          ]}
                          height={60}
                          width={60}
                        />
                      </TableCell>
                    )}
                    {user.role === 'supervisor' && (
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                              m: 0.5,
                            },
                          }}
                        >
                          <Chip
                            color="primary"
                            label="Edit"
                            onClick={() => {
                              setSelectedRow(row)
                              setEditPopup(true)
                            }}
                          />
                          <Chip
                            sx={{ backgroundColor: '#901F2F', color: '#fff' }}
                            label="Delete"
                            onClick={() => {
                              setSelectedRow(row)
                              setDeletePopup(true)
                            }}
                            className="hover_error"
                          />
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {editPopup && (
        <EditKpiPopup
          setOpenPopup={setEditPopup}
          allExecutive={allExecutive}
          selectedRow={selectedRow}
        />
      )}
      {deletePopup && (
        <DeleteKpiPopup
          setOpenPopup={setDeletePopup}
          selectedRow={selectedRow}
        />
      )}
    </>
  )
}

export default KpiTable
