// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Doctor from 'mdi-material-ui/Doctor'
import Hospital from 'mdi-material-ui/Hospital'
import Ambulance from 'mdi-material-ui/Ambulance'
import Airplane from 'mdi-material-ui/Airplane'
import Car from 'mdi-material-ui/Car'
import Home from 'mdi-material-ui/Home'
import Stethoscope from 'mdi-material-ui/Stethoscope'
import Phone from 'mdi-material-ui/Phone'

import { Card, CardHeader } from "@mui/material"
import BriefcaseEditOutline from 'mdi-material-ui/BriefcaseEditOutline'


const createData = (name, phone, comments) => {
    return {
        name,
        phone,
        comments,
        services: [
            'green', 'green', 'green', 'orange', 'red', 'red', 'red', 'red'
        ]
    }
}

const Row = props => {
    // ** Props
    const { row } = props

    // ** State
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <ChevronUp /> : <ChevronDown />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.name}
                </TableCell>
                <TableCell align='right'>{row.phone}</TableCell>
                <TableCell align='right'>{row.comments}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6} sx={{ py: '0 !important' }}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ m: 2 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                Services
                            </Typography>
                            <Table size='small' aria-label='purchases'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Doctor</TableCell>
                                        <TableCell align='center'>Hospital</TableCell>
                                        <TableCell align='center'>Air Ticket</TableCell>
                                        <TableCell align='center'>Air Ambulance</TableCell>
                                        <TableCell align='center'>Tour Guide</TableCell>
                                        <TableCell align='center'>Hotel</TableCell>
                                        <TableCell align='center'>Tele Medicine</TableCell>
                                        <TableCell align='center'>Diagnostics</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell align='center'><Doctor style={{ color: row.services[0] }} /></TableCell>
                                    <TableCell align='center'><Hospital style={{ color: row.services[1] }} /></TableCell>
                                    <TableCell align='center'><Airplane style={{ color: row.services[2] }} /></TableCell>
                                    <TableCell align='center'><Ambulance style={{ color: row.services[3] }} /></TableCell>
                                    <TableCell align='center'><BriefcaseEditOutline style={{ color: row.services[4] }} /></TableCell>
                                    <TableCell align='center'><Home style={{ color: row.services[5] }} /></TableCell>
                                    <TableCell align='center'><Phone style={{ color: row.services[6] }} /></TableCell>
                                    <TableCell align='center'><Stethoscope style={{ color: row.services[7] }} /></TableCell>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

const rows = [
    createData('Abdullah Al Rakib', '01712345678', 'No Comment'),
    createData('Enamul Hossain', '01987654321', 'Single Comment')
]

const rowsData = [
    {
        age: 27,
        status: 'current',
        date: '09/27/2018',
        name: 'Sally Quinn',
        salary: '$19586.23',
        email: 'eebsworth2m@sbwire.com',
        designation: 'Human Resources Assistant',
        //
        staff: 'Abul Kalam Azad',
        client: 'Moinul Hossain',
        clientPhone: '01712345678',
        services: [1, 0, 1, 1, 0, 1, 1, 1, 0],
        payment: 1000,
        paymentIn: 800,
        paymentDue: 200,
        comment: 'Comment goes here'
    },
    {
        age: 27,
        status: 'current',
        date: '09/27/2018',
        name: 'Sally Quinn',
        salary: '$19586.23',
        email: 'eebsworth2m@sbwire.com',
        designation: 'Human Resources Assistant',
        //
        staff: 'Abul Kalam Azad',
        client: 'Moinul Hossain',
        clientPhone: '01712345678',
        services: [1, 0, 1, 1, 0, 1, 1, 1, 0],
        payment: 1000,
        paymentIn: 800,
        paymentDue: 200,
        comment: 'Comment goes here'
    },
    {
        age: 27,
        status: 'current',
        date: '09/27/2018',
        name: 'Sally Quinn',
        salary: '$19586.23',
        email: 'eebsworth2m@sbwire.com',
        designation: 'Human Resources Assistant',
        //
        staff: 'Abul Kalam Azad',
        client: 'Moinul Hossain',
        clientPhone: '01712345678',
        services: [1, 0, 1, 1, 0, 1, 1, 1, 0],
        payment: 1000,
        paymentIn: 800,
        paymentDue: 200,
        comment: 'Comment goes here'
    },

]

const TableCollapsible = () => {
    return (
        <>
            <Card>
                <CardHeader title='Client List' titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important'
                    }
                }} />
            </Card>
            <br></br>
            {/* <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Patient Name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}


            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell align='center'>Services</TableCell>
                                <TableCell align='right'>Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsData.map(row => (
                                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.client}</Typography>
                                            <Typography variant='caption'>{row.clientPhone}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center'>

                                        <Tooltip title="Doctor" arrow>
                                            <Doctor style={{ color: row.services[0] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Hospital" arrow>
                                            <Hospital style={{ color: row.services[1] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Air Ticket" arrow>
                                            <Airplane style={{ color: row.services[2] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Air Ambulance" arrow>
                                            <Ambulance style={{ color: row.services[3] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Tour Guide" arrow>
                                            <BriefcaseEditOutline style={{ color: row.services[5] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Hotel" arrow>
                                            <Home style={{ color: row.services[6] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Tele Medicine" arrow>
                                            <Phone style={{ color: row.services[7] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                        <Tooltip title="Diagnostics" arrow>
                                            <Stethoscope style={{ color: row.services[8] === 0 ? 'red' : 'green' }} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align='right'>{row.comment}</TableCell>
                                    {/* <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    )
}

export default TableCollapsible
