// ** React Imports
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// ** Next Imports
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from 'public/travonus.svg'
import bgImage from 'public/images/login_bg.png'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { motion } from 'framer-motion'

// Firebase import
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase.init.js'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { getAllUser } from 'src/Utils/func.js'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}))

const LoginPage = () => {
  const [users, setUsers] = useState([])
  const [currentUser, , currentUserError] = useAuthState(auth)
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    email: '',
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  //read
  useEffect(() => {
    getAllUser(setUsers)
    localStorage.removeItem('cura_user')
  }, [])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const loggedInUser = users.find(
    user => user.email === values.email + '@gmail.com'
  )
  const handleLogin = async e => {
    e.preventDefault()

    const userCredentials = await signInWithEmailAndPassword(
      values.email,
      values.password
    )

    // check the password and email
    if (
      loggedInUser?.password !== values.password ||
      loggedInUser?.email !== values.email + '@gmail.com'
    ) {
      toast.error('Invalid email or password')
      return
    } else {
      localStorage.setItem('cura_user', JSON.stringify(loggedInUser))
      if (loggedInUser?.role === 'admin') {
        // router.push('/onboardingalt');
        router.push('/welcome-logo')
      } else {
        // router.push('/lead');
        router.push('/welcome-logo')
      }
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          minWidth: '100vw',
        }}
        className="content-center"
      >
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          <Card sx={{ zIndex: 1 }}>
            <CardContent
              sx={{ padding: theme => `${theme.spacing(5, 9, 7)} !important` }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  margin: '0 auto',
                  mb: 6,
                }}
              >
                {/* <Typography
                variant="h6"
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important',
                }}
              >
                {themeConfig.templateName}
              </Typography> */}
                <Image src={logo} alt="cura logo" />
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, marginBottom: 1.5 }}
                >
                  Welcome
                </Typography>
                <Typography variant="body2">
                  Please sign-in to your account and start the adventure
                </Typography>
              </Box>
              <form
                noValidate
                autoComplete="off"
                onSubmit={e => handleLogin(e)}
              >
                <TextField
                  onChange={handleChange('email')}
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email"
                  sx={{ marginBottom: 4 }}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-login-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    value={values.password}
                    id="auth-login-password"
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                ></Box>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ marginBottom: 7 }}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <FooterIllustrationsV1 />
      </div>

      {/* <Toaster /> */}
    </>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
