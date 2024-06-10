import { useEffect } from 'react'
import { Box } from '@mui/material'
import Loader from 'src/@core/components/loader'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndRedirect = () => {
      const user =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('cura_user')
          : false
      const userRole = user ? JSON.parse(user).role : false

      if (!userRole) {
        // Redirect to login page if userRole is not available
        router.push('/login')
      } else {

        // Your remaining component logic based on userRole
        router.push(
          userRole === 'admin'
            ? '/kpi'
            : userRole === 'executive'
            ? '/lead'
            : userRole === 'supervisor'
            ? '/onboardingalt'
            : '/clientlist'
        )
      }
    }

    // Call the function to fetch user information and redirect
    fetchUserAndRedirect()
  }, [router])

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader />
    </Box>
  )
}

Dashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Dashboard
