import { Box, Typography } from '@mui/material'
import { useAnimation, motion } from 'framer-motion'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useRedirectAfterSomeSeconds from 'src/@core/hooks/useRedirectAfterSomeSeconds'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { loadStorage } from 'src/Utils/func'
import bgImage from 'public/images/av.png'

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

const WelcomePage = () => {
  const user = loadStorage('cura_user')
  const { secondsRemaining } = useRedirectAfterSomeSeconds(
    `${
      user?.role === 'admin'
        ? '/kpi'
        : user?.role === 'executive'
        ? '/lead'
        : user?.role === 'supervisor'
        ? '/onboardingalt'
        : '/clientlist'
    }`,
    5
  )

  const controls = useAnimation()
  const router = useRouter()

  useEffect(() => {
    // Initialize GSAP timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    // Animate individual letters with a stagger
    tl.staggerFromTo(
      '.letter',
      0.8,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0 },
      0.2
    )

    // Animate the entire SVG
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    })

    // Play the GSAP timeline with a delay
    tl.delay(0.5).play()
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      className="welcome"
    >
      <div
        style={{
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
          {['C', 'R', 'M'].map((letter, index) => (
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
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1 },
          }}
          style={{
            color: '#899499',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            marginTop: '-15px',
          }}
        >
          Tourism CRM
        </motion.span>
      </div>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 60"
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        className="text_svg"
        fill={'#333E51'}
      >
        <text className="letter" x="50" y="20">
          W
        </text>
        <text className="letter" x="70" y="20">
          E
        </text>
        <text className="letter" x="85" y="20">
          L
        </text>
        <text className="letter" x="97" y="20">
          C
        </text>
        <text className="letter" x="112" y="20">
          O
        </text>
        <text className="letter" x="128" y="20">
          M
        </text>
        <text className="letter" x="145" y="20">
          E
        </text>
      </motion.svg>

      <motion.span
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 2.4 },
        }}
        style={{
          color: '#421B67',
          fontWeight: 'bold',
          fontSize: '3rem',
          position: 'absolute',
          bottom: '30%',
        }}
      >
        {user?.role}
      </motion.span>

      <Typography
        variant="h5"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          my: '1.2rem',
          backgroundColor: '#9155fd',
          height: '50px',
          width: '50px',
          lineHeight: '50px',
          borderRadius: '50%',
          position: 'absolute',
          bottom: '0',
          right: '20px',
        }}
      >
        {secondsRemaining}
      </Typography>
    </div>
  )
}

WelcomePage.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default WelcomePage
