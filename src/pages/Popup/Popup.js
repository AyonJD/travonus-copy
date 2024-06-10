import React from 'react';
import { ImCross } from 'react-icons/im';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Card from '@mui/material/Card'
import { TableContainer } from '@mui/material';
import FareTable from './FareTable';
import TaxTable from './TaxTable';
import PayableTable from './PayableTable';

import debounce from 'lodash/debounce';
import Cookies from 'js-cookie';

const Popup = ({ setOpenPopup, setReservation }) => {
    const [input, setInput] = React.useState({
        fareInDollar: 0,
        dollarRate: 0,
        tax_BDT_UT_ES: 0,
        gross_fare: 0,
        profit_sharing: 0,
        commission: 7,
    });

    const [defaultData, setDefaultData] = React.useState({
        new_commission: 0.3,
        office_commission_1:
            (Number(input.fareInDollar) * Number(input.dollarRate)) < 35000 ? 200 : ((0.5 / 100) * (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(7) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(0.3) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(0.3) / Number(100)))))).toFixed(2),
        office_commission_2:
            (Number(input.fareInDollar) * Number(input.dollarRate)) < 35000 ? 300 : ((0.5 / 100) * (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(7) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(0.3) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(0.3) / Number(100)))))).toFixed(2),
    });

    const [data, setData] = React.useState({
        amount_bdt:
            Number(input.fareInDollar) * Number(input.dollarRate) || Number(0),
        // Regular commission
        commission:
            Number(input.commission),
        commission_amount:
            (Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(input.commission) / Number(100)),

        fare_after_seven_percent:
            (Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100)),

        // EXTRA commission
        extra_commission_rate:
            Number(0),
        extra_commission_amount:
            Number(0),
        extra_total_deduct:
            (Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(input.commission) / Number(100)),
        extra_amount_after_commission:
            (Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100)),

        // New added tax + other tax
        new_commission:
            Number(defaultData.new_commission),
        new_commission_amount:
            (Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100)),
        new_extra:
            Number(0),
        new_extra_amount:
            Number(0),
        new_total_amount:
            (Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100)),
        new_e5:
            ((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))),
        new_tax_bd:
            Number(input.tax_BDT_UT_ES),
        other_tax:
            (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES),
        total_tax:
            Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES),
        total_commission_amount:
            (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100)),
        total_tax_2:
            (Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100))),

        // Payable field
        total_fare:
            ((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100)))),

        office_commission_1:
            Number(defaultData.office_commission_1),

        total_payable:
            (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100))))) + Number(defaultData.office_commission_1),

        office_commission_2:
            Number(defaultData.office_commission_2),

        total_payable_2:
            ((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100)))) + Number(defaultData.office_commission_2),

        gross_fare:
            Number(input.gross_fare),
        profit_sharing:
            Number(input.profit_sharing),
        final_payable:
            Number(input.gross_fare) - Number(input.profit_sharing),
    });

    const handleInputChange = React.useCallback(
        (e) => {
            const { name, value } = e.target;
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value,
            }));
        },
        [setInput]
    );

    const saveDataToCookies = React.useCallback(
        debounce((debounceData) => {
            const inputJsonData = JSON.stringify(debounceData.input); // convert input to JSON string
            const calculationJsonData = JSON.stringify(debounceData.calculation); // convert calculation to JSON string
            Cookies.set('ticketing_input_data', inputJsonData);
            Cookies.set('ticketing_calculation_data', calculationJsonData);
        }, 1000),
        []
    );

    React.useEffect(() => {
        saveDataToCookies({ input, calculation: data });
    }, [input, saveDataToCookies]);

    React.useEffect(() => {
        const inputFromCookie = Cookies.get('ticketing_input_data');
        const calculationFromCookie = Cookies.get('ticketing_calculation_data');

        if (inputFromCookie && calculationFromCookie) {
            try {
                const parsedInput = JSON.parse(inputFromCookie);
                setInput(parsedInput);

                const parsedCalculation = JSON.parse(calculationFromCookie);
                setData(parsedCalculation);

            } catch (error) {
                console.log('Error parsing JSON from cookie:', error);
            }
        }
    }, []);

    React.useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            amount_bdt: (Number(input.fareInDollar) * Number(input.dollarRate)).toFixed(2) || Number(0),
            commission: Number(input.commission) || Number(0),
            commission_amount:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(input.commission) / Number(100))).toFixed(2) || Number(0),
            fare_after_seven_percent:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))).toFixed(2) || Number(0),
            extra_commission_rate:
                Number(0),
            extra_commission_amount:
                Number(0),
            extra_total_deduct:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(input.commission) / Number(100))).toFixed(2) || Number(0),
            extra_amount_after_commission:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))).toFixed(2) || Number(0),
            new_commission:
                Number(defaultData.new_commission),
            new_commission_amount:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))).toFixed(2) || Number(0),
            new_extra:
                Number(0),
            new_extra_amount:
                Number(0),
            new_total_amount:
                ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))).toFixed(2) || Number(0),

            new_e5:
                (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100)))).toFixed(2) || Number(0),
            new_tax_bd:
                Number(input.tax_BDT_UT_ES) || Number(0),
            other_tax:
                ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)).toFixed(2) || Number(0),
            total_tax:
                (Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)).toFixed(2) || Number(0),
            total_commission_amount:
                ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100))).toFixed(2) || Number(0),
            total_tax_2:
                ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100)))).toFixed(2) || Number(0),
            total_fare:
                (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100))))).toFixed(2) || Number(0),
            office_commission_1:
                Number(defaultData.office_commission_1),
            total_payable:
                ((((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100))))) + Number(defaultData.office_commission_1)).toFixed(2) || Number(0),
            office_commission_2:
                Number(defaultData.office_commission_2),
            total_payable_2:
                (((Number(input.fareInDollar) * Number(input.dollarRate)) - (Number(input.fareInDollar) * Number(input.dollarRate) * Number(input.commission) / Number(100))) + ((Number(input.fareInDollar) * Number(input.dollarRate)) * (Number(defaultData.new_commission) / Number(100))) + ((Number(input.tax_BDT_UT_ES) + (Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES)) + ((Number(62884) - Number(input.fareInDollar) * Number(input.dollarRate)) - Number(input.tax_BDT_UT_ES) * (Number(defaultData.new_commission) / Number(100)))) + Number(defaultData.office_commission_2)).toFixed(2) || Number(0),
            gross_fare:
                Number(input.gross_fare) || Number(0),
            profit_sharing:
                Number(input.profit_sharing),
            final_payable:
                (Number(input.gross_fare) - Number(input.profit_sharing)).toFixed(2) || Number(0),
        }));
    }, [input]);

    return (
        <div className='popup_wrapper'>
            <div className="popup_content">
                <ImCross onClick={() => {
                    setOpenPopup(false);
                }} className='cross_icon' />
                <div className="margin_top">
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.fareInDollar} onChange={(e) => handleInputChange(e)} name='fareInDollar' fullWidth label='Fare in Dollar' placeholder='$' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.dollarRate} onChange={(e) => handleInputChange(e)} name='dollarRate' fullWidth label='Dollar Rate' placeholder='Dollar Rate' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.tax_BDT_UT_ES} onChange={(e) => handleInputChange(e)} name='tax_BDT_UT_ES' fullWidth label='Tax BD+UT+ES' placeholder='Tax' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.commission} onChange={(e) => handleInputChange(e)} name='commission' fullWidth label='Commission' placeholder='Commission' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.gross_fare} onChange={(e) => handleInputChange(e)} name='gross_fare' fullWidth label='Gross Fare' placeholder='Gross Fare' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField focused value={input.profit_sharing} onChange={(e) => handleInputChange(e)} name='profit_sharing' fullWidth label='Profit Sharing' placeholder='Profit Sharing' />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: 7 }}>
                        <Card>
                            <TableContainer>
                                <Table className="table" sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className='fare_bg' align='center'>Fare</TableCell>
                                            <TableCell className='tax_bg' align='center'>New added TAX + other TAX</TableCell>
                                            <TableCell className='payable_bg' align='center'>Payable</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell className='fare_bg'>
                                                <FareTable data={data} />
                                            </TableCell>
                                            <TableCell className='tax_bg'>
                                                <TaxTable data={data} />
                                            </TableCell>
                                            <TableCell className='payable_bg'>
                                                <PayableTable data={data} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Popup;