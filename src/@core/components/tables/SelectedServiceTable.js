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

// Images
import {
  visaIcon,
  ticketingIcon,
  hotelIcon,
  airAmbulanceIcon,
  airportMeetIcon,
  doctorSelectionIcon,
  guideManageIcon,
  healthInsuranceIcon,
  hospitalSelectionIcon,
  localTransportIcon,
  telemedicineIcon,
} from 'src/Utils/Utils'
import 'react-datepicker/dist/react-datepicker.css'

// Iconify
import { Icon } from '@iconify/react'
import { CardHeader, Pagination } from '@mui/material'
import { formFields } from './AdminListRow'

const SelectedServiceTable = ({
  serviceSelectedClient,
  slicedData,
  rowsPerPage,
  handleChangePage,
  page,
  startIndex,
  title,
}) => {
  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: {
            mb: 1,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />

      <TableContainer>
        <Table
          className="table"
          sx={{ minWidth: '70vw' }}
          aria-label="table in dashboard"
        >
          <TableHead sx={{ background: '#eeeef8' }}>
            <TableRow>
              <TableCell align="center">Serial</TableCell>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Services</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Total Paid</TableCell>
              <TableCell align="right" className="">
                Payment Due
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((row, index) => {
              let totalPaidToSupplier = 0
              let totalProfitOrLoss = 0

              for (const key in row.wrapper.formData) {
                if (key.includes('paidToSupplier')) {
                  totalPaidToSupplier += Number(row.wrapper.formData[key])
                }
                if (key.includes('ProfitOrLoss')) {
                  totalProfitOrLoss += Number(row.wrapper.formData[key])
                }
              }

              return (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': { border: 0 },
                  }}
                >
                  <TableCell align="center">{startIndex + index + 1}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '0.875rem !important',
                        }}
                      >
                        {row?.wrapper?.formData?.clientName}
                      </Typography>
                      <Typography variant="caption">
                        {row?.wrapper?.formData?.contactNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {formFields.map(
                      (field, index) =>
                        row?.wrapper?.formData?.serviceArr?.includes(
                          field.name
                        ) && (
                          <Tooltip key={index} title={field.title} arrow>
                            <img
                              src={field.icon}
                              alt={field.title}
                              className="iconImage"
                            />
                          </Tooltip>
                        )
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row?.wrapper?.formData?.totalPayment}
                  </TableCell>
                  <TableCell align="center">
                    {row?.wrapper?.formData?.totalPaid}
                  </TableCell>
                  <TableCell align="right" className="cell_devider">
                    {row?.wrapper?.formData?.currentlyDue}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-end' }}
        count={Math.ceil(serviceSelectedClient.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  )
}

export default SelectedServiceTable
