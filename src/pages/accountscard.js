// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HandCoinOutline from 'mdi-material-ui/HandCoinOutline'
import { loadStorage } from 'src/Utils/func'

const renderStats = filterAccount => {
  const formatIndianNumber = number => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(number)
  }

  const totalPayment = formatIndianNumber(
    filterAccount.reduce(
      (acc, curr) => acc + Number(curr?.wrapper?.formData?.totalPayment),
      0
    )
  )

  const totalExpense = formatIndianNumber(
    filterAccount.reduce(
      (acc, curr) => acc + Number(curr?.wrapper?.formData?.totalPaid),
      0
    )
  )

  const totalProfit = formatIndianNumber(
    filterAccount.reduce(
      (acc, curr) => acc + Number(curr?.wrapper?.formData?.currentlyDue),
      0
    )
  )

  const salesData = [
    {
      stats: `${totalPayment} BDT`,
      title: 'Current Revenue',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${totalExpense} BDT`,
      title: 'Current Expense',
      color: 'warning',
      icon: <HandCoinOutline sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${totalProfit} BDT`,
      color: 'success',
      title: 'Current Profit',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />,
    },
  ]

  return salesData.map((item, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const AccountsCard = ({ monthYear, filterAccount }) => {
  const user = loadStorage('cura_user')

  return (
    <>
      <Card>
        <Typography
          sx={{
            mb: 2.5,
            paddingTop: '20px',
            letterSpacing: '0.15px !important',
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#6C6583',
            fontWeight: 500,
            marginBottom: 0,
          }}
          className="heading_drop_shadow"
        >
          Current Accounts
        </Typography>
        <Typography
          sx={{
            mb: 7,
            textAlign: 'center',
            fontSize: '.9rem',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          {monthYear}, Summery
        </Typography>

        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {renderStats(filterAccount)}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountsCard
