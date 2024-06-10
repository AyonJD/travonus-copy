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
import { getAllCompletedKpi, getAllKpi } from 'src/Utils/func'
import PieChartV2 from '../pie_chart_v2'
import { useRouter } from 'next/router'

const CompletedKpiTable = () => {
  const [completedKpiList, setCompletedKpiList] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const completedKpi = await getAllCompletedKpi()
      setCompletedKpiList(completedKpi)
    }

    fetchData()
  }, [])

  console.log(completedKpiList, 'completedKpiList')

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead sx={{ background: '#eeeef8' }}>
            <TableRow>
              <TableCell align="center">Serial</TableCell>
              <TableCell align="center">Executive</TableCell>
              <TableCell align="center">Assigned Kpi</TableCell>
              <TableCell align="center">Completed Kpi</TableCell>
              {/* <TableCell align="center">Incomplete Kpi</TableCell> */}
              <TableCell align="center">Day Count</TableCell>
              {/* <TableCell align="center">Visual Chart</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {kpiList.map((row, index) => {
              console.log(row, 'row')
              let total = 0

              return (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': { border: 0 },
                  }}
                  onClick={() =>
                    router.push(`/kpidetails/${row?.wrapper?.kpiuuid}`)
                  }
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
                  <TableCell align="center">
                    {row?.wrapper?.complitedKpiTotal || 'Pending'}{' '}
                  </TableCell>
                  {/* <TableCell align="center">{row?.wrapper?.kpiCount - row?.wrapper?.complitedKpiTotal || "Pending"}</TableCell> */}
                  <TableCell align="center">
                    {row?.wrapper?.dayCount || 'Pending'}
                  </TableCell>
                  {/* <TableCell align="center">
                                        <PieChartV2
                                            data={[
                                                { value: row.wrapper.kpiCount, label: 'Kpi' },
                                                { value: row.wrapper.dayCount, label: 'Day' },
                                            ]}
                                        />
                                    </TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CompletedKpiTable
