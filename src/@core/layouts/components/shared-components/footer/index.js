// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Footer Content Component
import FooterContent from './FooterContent'

const Footer = props => {
  // ** Props
  const { settings, footerContent: userFooterContent } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <Box
      component="footer"
      className="layout-footer"
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E3032',
      }}
    >
      <Box
        className="footer-content-container"
        sx={{
          width: '100%',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: theme.spacing(1, 6),
          textAlign: 'center',
          color: '#fff',
          fontSize: '0.875rem',
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: 1440 },
          }),
        }}
      >
        Tourism CRM, Developed by Syntax Systems
      </Box>
    </Box>
  )
}

export default Footer
