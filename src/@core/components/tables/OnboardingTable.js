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
import CardHeader from '@mui/material/CardHeader'

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

const OnboardingTable = ({ leads }) => {
  return (
    <Card>
      <CardHeader
        title="Current Lead Status"
        titleTypographyProps={
          {
            // sx: {
            //   mb: 2.5,
            //   lineHeight: '2rem !important',
            //   letterSpacing: '0.15px !important'
            // }
          }
        }
      />

      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead sx={{ background: '#eeeef8' }}>
            <TableRow>
              <TableCell align="center">Serial</TableCell>
              {/* <TableCell align="center">Lead</TableCell> */}
              <TableCell align="center">Lead Description </TableCell>
              <TableCell align="center">Executive</TableCell>
              <TableCell align="center">Lead Type</TableCell>
              <TableCell align="center">Lead Status</TableCell>
              <TableCell align="center">Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.length > 0 ? (
              <>
                {leads.map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      <Typography>{index + 1}</Typography>
                    </TableCell>

                    <TableCell
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
                    <TableCell align="center">
                      {row?.wrapper?.executive}
                    </TableCell>
                    <TableCell align="center">
                      {row?.wrapper?.leadtype || 'Pending'}
                    </TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center">
                      {row?.wrapper?.note || 'Pending'}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow
                  hover
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
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
    </Card>
  )
}

export default OnboardingTable
