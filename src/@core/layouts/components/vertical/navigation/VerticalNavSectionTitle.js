// ** MUI Imports
import Divider from '@mui/material/Divider'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiListSubheader from '@mui/material/ListSubheader'
import { loadStorage } from 'src/Utils/func'

// ** Styled Components
const ListSubheader = styled(props => (
  <MuiListSubheader component="li" {...props} />
))(({ theme }) => ({
  lineHeight: 1,
  display: 'flex',
  position: 'relative',
  marginTop: theme.spacing(7),
  marginBottom: theme.spacing(2),
  backgroundColor: 'transparent',
  transition: 'padding-left .25s ease-in-out',
}))

const TypographyHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  fontWeight: theme.typography.fontWeightMedium,
}))

const VerticalNavSectionTitle = props => {
  const user = loadStorage('cura_user')
  // ** Props
  const { item } = props

  // ** Hook
  const theme = useTheme()

  return (
    <ListSubheader
      className="nav-section-title"
      sx={{
        px: 0,
        py: 1.75,
        color: theme.palette.text.disabled,
        '& .MuiDivider-root:before, & .MuiDivider-root:after, & hr': {
          borderColor: `rgba(${theme.palette.customColors.main}, 0.12)`,
        },
      }}
    >
      <Divider
        textAlign="left"
        sx={{
          m: 0,
          width: '100%',
          lineHeight: 'normal',
          textTransform: 'uppercase',
          '&:before, &:after': { top: 7, transform: 'none' },
          '& .MuiDivider-wrapper': {
            px: 2.5,
            fontSize: '0.75rem',
            letterSpacing: '0.21px',
          },
        }}
      >
        <TypographyHeaderText
          className={`${user?.role === 'admin' ? 'admin_text' : 'user_text'}`}
          noWrap
        >
          {item.sectionTitle}
        </TypographyHeaderText>
      </Divider>
    </ListSubheader>
  )
}

export default VerticalNavSectionTitle
