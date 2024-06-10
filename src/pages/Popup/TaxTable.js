import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const TaxTable = ({ data }) => {
    if (!data) return null
    return (
        <TableContainer>
            <Table className="table" sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                    <TableRow>
                        <TableCell align=''>New Added Tax</TableCell>
                        <TableCell >Other Taxes</TableCell>
                        <TableCell >Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='left'>
                            <span className='sub_header'>(+) New Commission</span>: {data.new_commission} <br />
                            <span className='sub_header'> Commission Amount</span>: {data.new_commission_amount} <br />
                            <span className='sub_header'>(+) Extra</span>: {data.new_extra} <br />
                            <span className='sub_header'>Extra Amount</span>: {data.new_extra_amount} <br />
                            <span className='sub_header'>Total Amount</span>: {data.new_total_amount} <br />
                            <span className='sub_header'>E5</span>: {data.new_e5} <br />
                        </TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>Tax BD+UT+ES</span>: {data.new_tax_bd} <br />
                            <span className='sub_header'> Other Taxes</span>: {data.other_tax}
                        </TableCell>
                        <TableCell align='left'>
                            <span className='sub_header'>Total Tax</span>: {data.total_tax} <br />
                            <span className='sub_header'>Commission Amount</span>: {data.total_commission_amount} <br />
                            <span className='sub_header'>Total Tax</span>: {data.total_tax_2}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaxTable;