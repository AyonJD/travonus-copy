import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const FareTable = ({ data }) => {
    if (!data) return null
    return (
        <TableContainer>
            <Table className="table" sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Amount BDT</TableCell>
                        <TableCell >Regular Commission</TableCell>
                        <TableCell >Extra Commission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>{data.amount_bdt}</TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>(-) Commission</span>: {data.commission} <br />
                            <span className='sub_header'> Commission Amount</span>: {data.commission_amount} <br />
                            <span className='sub_header'>Fare After 7%</span>: {data.fare_after_seven_percent}
                        </TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>Commission Rate</span>: {data.extra_commission_rate} <br />
                            <span className='sub_header'> Commission Amount</span>: {data.extra_commission_amount} <br />
                            <span className='sub_header'>Total Deduct</span>: {data.extra_total_deduct} <br />
                            <span className='sub_header'>Amount After Comm</span>: {data.extra_amount_after_commission}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FareTable;