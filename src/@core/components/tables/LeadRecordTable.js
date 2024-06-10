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
import { useRouter } from 'next/router'
import { Checkbox } from '@mui/material'
import { loadStorage } from 'src/Utils/func'

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
  Convertible: { color: 'info' },
  Continued: { color: 'info' },
  Not_Converted: { color: 'error' },
  Denied: { color: 'error' },
  Converted: { color: 'success' },
}

const LeadRecordTable = ({
  monthYear,
  leads,
  startIndex,
  handleSelectRow,
  selectedRows,
  handleSelectAll,
  selectAll,
}) => {
  const user = loadStorage('cura_user')
  const router = useRouter()

  // if (!monthYear) return null
  if (!leads) return null

  const navigateToAddClient = leadUuid => {
    localStorage.setItem('cura_navigate', JSON.stringify(leadUuid))
    router.push(`/addclient/`)
  }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead sx={{ background: '#eeeef8' }}>
            <TableRow>
              {user?.role === 'admin' && (
                <TableCell align="center">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'Select all rows' }}
                  />
                </TableCell>
              )}

              <TableCell align="left">#</TableCell>
              <TableCell align="center">Date</TableCell>
              {/* <TableCell align="center">Lead</TableCell> */}
              <TableCell align="center">Lead Description </TableCell>
              <TableCell align="center">Executive</TableCell>
              <TableCell align="center">Lead Type</TableCell>
              <TableCell align="center">Lead Status</TableCell>
              <TableCell align="center">Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
              >
                {user?.role === 'admin' && (
                  <TableCell align="center">
                    <Checkbox
                      checked={
                        selectedRows.indexOf(row.wrapper.leaduuid) !== -1
                      }
                      onChange={() => handleSelectRow(row.wrapper.leaduuid)}
                      inputProps={{
                        'aria-label': `Select row ${row.wrapper.leaduuid}`,
                      }}
                    />
                  </TableCell>
                )}

                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="left"
                >
                  <Typography>{startIndex + index + 1}</Typography>
                </TableCell>
                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                >
                  <Typography className="no_wrap">
                    {(row?.wrapper?.createdAt).split(',')[1]},
                    {(row?.wrapper?.createdAt).split(',')[2]}
                  </Typography>
                </TableCell>

                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                  sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                >
                  {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                        <Typography variant='caption'>{row.phone}</Typography>
                                    </Box> */}
                  {row?.wrapper?.lead_details}
                </TableCell>

                {/* <TableCell align="center">{row.description}</TableCell> */}
                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                >
                  {row?.wrapper?.executive}
                </TableCell>
                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                >
                  {row?.wrapper?.leadtype || 'Pending'}
                </TableCell>
                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                >
                  <Chip
                    label={
                      row?.wrapper?.leadstatus?.split('_').join(' ') ||
                      'Pending'
                    }
                    color={statusObj[row?.wrapper?.leadstatus]?.color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 },
                    }}
                  />
                </TableCell>
                <TableCell
                  onClick={() => navigateToAddClient(row?.wrapper?.leaduuid)}
                  align="center"
                >
                  {row?.wrapper?.note || 'Pending'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default LeadRecordTable
