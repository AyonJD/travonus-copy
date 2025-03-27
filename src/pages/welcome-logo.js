import React, { useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import useRedirectAfterSomeSeconds from 'src/@core/hooks/useRedirectAfterSomeSeconds'
import { motion } from 'framer-motion'

const LogoPage = () => {
  const { secondsRemaining } = useRedirectAfterSomeSeconds('/welcome', 8)
  const router = useRouter()

  // Variants for animating each letter of "CMS"
  const letterAnimation = {
    hidden: { opacity: 0, y: -50, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: [0, 10, -10, 0], // Add a slight bounce effect
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Variants for the subheading
  const subheadingAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5, // Delay after the letters finish animating
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Box
      className="welcome-svg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      {/* Animated Text "CMS" */}
      <Box
        sx={{
          display: 'flex',
          fontSize: '4rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '0.2rem',
        }}
      >
        {['E', 'A', 'S', 'Y', 'B', 'I', 'Z'].map((letter, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.3 }} // Staggered animation
          >
            {letter}
          </motion.span>
        ))}
      </Box>

      {/* Subheading */}
      <motion.div
        variants={subheadingAnimation}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h5" sx={{ mt: 4, color: 'text.secondary' }}>
          Welcome to the EasyBiz Tour Management Solution
        </Typography>
      </motion.div>

      {/* Countdown Timer */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Redirecting in {secondsRemaining} seconds...
      </Typography>
    </Box>
  )
}

LogoPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LogoPage
