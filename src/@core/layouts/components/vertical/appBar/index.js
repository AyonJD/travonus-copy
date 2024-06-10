// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { Box, Typography } from '@mui/material'
import { loadStorage } from 'src/Utils/func'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 10,
  paddingRight: 10,

  backgroundColor: '#42197E',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  // padding: `${theme.spacing(0)} !important`,
  // minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out',
}))

const LayoutAppBar = props => {
  const user = loadStorage('cura_user')
  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      position="static"
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': {
              maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)`,
            },
          }),
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              lineHeight: 'normal',
              color: '#fff',
              mb: 1
            }}
          >
            Name: XYZ
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              lineHeight: 'normal',
              color: '#fff',
            }}
          >
            Role: {user?.role}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
