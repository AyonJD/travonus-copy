import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const PayableTable = ({ data }) => {
    if (!data) return null
    return (
        <TableContainer>
            <Table className="table" sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                    <TableRow>
                        <TableCell align=''>Total</TableCell>
                        <TableCell >Gross</TableCell>
                        <TableCell >Payable</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='left'>
                            <span className='sub_header'>Total Fare</span>: {data.total_fare} <br />
                            <span className='sub_header'>Office's Comm 1</span>: {data.office_commission_1} <br />
                            <span className='sub_header'>Total Payable</span>: {data.total_payable} <br />
                            <span className='sub_header'>Office's Comm 2</span>: {data.office_commission_2} <br />
                            <span className='sub_header'>Total Payable</span>: {data.total_payable_2}
                        </TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>Gross Fare</span>: {data.gross_fare} <br />
                            <span className='sub_header'>Profit Sharing</span>: {data.profit_sharing}
                        </TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>Payable</span>: {data.final_payable}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PayableTable;