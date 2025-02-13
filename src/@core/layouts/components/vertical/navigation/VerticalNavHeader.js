// ** Next Import
import Link from 'next/link'
import Image from 'next/image'
import logo from 'public/travonus.svg'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight,
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  // textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks

  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ pl: 6, zIndex: 50000 }}
      style={{ marginBottom: '-10px' }}
    >
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href="/" passHref>
          <StyledLink>
            <HeaderTitle variant="h6" sx={{ ml: 3, pt: 0, width: '90%' }}>
              {/* {themeConfig.templateName} */}
              {/* <Image src={logo} alt="cura logo" /> */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: '18px',
                  fontWeight: 600,
                  textAlign: 'center',
                  width: '100%',
                  whiteSpace: 'nowrap',
                }}
              >
                Tourism CRM
              </Typography>
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
