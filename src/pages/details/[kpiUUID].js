import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/loader'
import UserCard from 'src/@core/components/userCard/UserCard'
import { getKpiPerUuid, loadStorage } from 'src/Utils/func'
import PieChartV2 from 'src/@core/components/pie_chart_v2'
import { Box, Button } from '@mui/material'

const kpiUUID = () => {
  const user = loadStorage('cura_user')
  const router = useRouter()
  const [uuid, setUuid] = useState('')
  const [loading, setLoading] = useState(true)
  const [kpiData, setKpiData] = useState([])
  const [completedKpi, setCompletedKpi] = useState(0)
  const [uuidWillNotUsed, setUuidWillNotUsed] = useState('')

  useEffect(() => {
    const pathname = router.asPath
    const uuid = pathname.split('/')[2]
    setUuid(uuid)
    setLoading(false)
  }, [router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedKpi = localStorage.getItem('cura_totalCompletedKpi')
      setCompletedKpi(storedKpi ? parseInt(storedKpi) : 0)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      if (uuid === '[kpiUUID]') {
        setUuidWillNotUsed(uuid)
        return
      }
      const kpi = await getKpiPerUuid(uuid)

      setKpiData(kpi[0])
      setUuidWillNotUsed(uuid)
      setLoading(false)
    }

    fetchData()
  }, [uuid])

  if (loading) return <Loader />

  console.log('kpiData', uuidWillNotUsed)

  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}

      {uuidWillNotUsed === '[kpiUUID]' || !uuidWillNotUsed ? (
        <Box
          sx={{
            textAlign: 'center',
            mt: 5,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5">
            Please select a row from KPI Overview to see details
          </Typography>
        </Box>
      ) : (
        <Card sx={{ paddingBottom: 5 }}>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead sx={{ background: '#eeeef8' }}>
                <TableRow>
                  <TableCell align="center">Serial</TableCell>
                  <TableCell align="center">Executive</TableCell>
                  <TableCell align="center">Assigned Kpi</TableCell>
                  <TableCell align="center">Completed Kpi</TableCell>
                  <TableCell align="center">Incomplete Kpi</TableCell>
                  <TableCell align="center">Day Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  hover
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <Typography>1</Typography>
                  </TableCell>

                  <TableCell align="center">
                    {kpiData?.wrapper?.executive}
                  </TableCell>

                  <TableCell align="center">
                    {kpiData?.wrapper?.kpiCount || 'Pending'}
                  </TableCell>
                  <TableCell align="center">
                    {completedKpi > kpiData?.wrapper?.kpiCount
                      ? kpiData?.wrapper?.kpiCount
                      : completedKpi || 0}{' '}
                  </TableCell>
                  {/* <TableCell align="center">{(kpiData?.wrapper?.kpiCount - completedKpi) === 0 ? 0 :  kpiData?.wrapper?.kpiCount}</TableCell> */}
                  <TableCell align="center">
                    {kpiData?.wrapper?.kpiCount - completedKpi === 0
                      ? 0
                      : kpiData?.wrapper?.kpiCount - completedKpi < 0
                      ? 0
                      : kpiData?.wrapper?.kpiCount - completedKpi}
                  </TableCell>
                  <TableCell align="center">
                    {kpiData?.wrapper?.dayCount < 0
                      ? 0
                      : !kpiData?.wrapper?.dayCount
                      ? 'Pending'
                      : kpiData?.wrapper?.dayCount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            sx={{ marginTop: 1, textAlign: 'center' }}
            container
            spacing={5}
          >
            <Grid
              sx={{ marginLeft: 'auto', marginRight: 'auto' }}
              item
              xs={12}
              md={6}
            >
              {/* {
                            kpiData?.wrapper?.complitedKpiTotal && ( */}
              <>
                <h4>Kpi Chart</h4>
                <PieChartV2
                  data={[
                    {
                      value:
                        completedKpi > kpiData?.wrapper?.kpiCount
                          ? kpiData?.wrapper?.kpiCount
                          : completedKpi || 0,
                      label: `Completed Kpi(${
                        completedKpi > kpiData?.wrapper?.kpiCount
                          ? kpiData?.wrapper?.kpiCount
                          : completedKpi || 0
                      })`,
                    },

                    {
                      value:
                        kpiData?.wrapper?.kpiCount - completedKpi === 0
                          ? 0
                          : kpiData?.wrapper?.kpiCount - completedKpi < 0
                          ? 0
                          : kpiData?.wrapper?.kpiCount - completedKpi,
                      label: `Incomplete Kpi(${
                        kpiData?.wrapper?.kpiCount - completedKpi === 0
                          ? 0
                          : kpiData?.wrapper?.kpiCount - completedKpi < 0
                          ? 0
                          : kpiData?.wrapper?.kpiCount - completedKpi
                      })`,
                    },
                  ]}
                  height={250}
                  width={250}
                />
              </>
              {/* )
                        } */}
            </Grid>
          </Grid>

          <Button
            onClick={() => router.push('/kpi')}
            variant="contained"
            sx={{ marginLeft: '20px' }}
          >
            Back to KPI
          </Button>
        </Card>
      )}
    </>
  )
}

export default kpiUUID
