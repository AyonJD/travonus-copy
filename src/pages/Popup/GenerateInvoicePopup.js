import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import styles from '../../../styles/moneyReceipt.module.css'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import 'react-quill/dist/quill.snow.css'

const GenerateInvoicePopup = ({ setOpenPopup, services }) => {
  const router = useRouter()
  const [invoiceData, setInvoiceData] = useState({
    name: 'Tourism CRM',
    phone: '01323581330',
    email: 'mytravonus@gmail.com',
    address: 'Sufi Villa | level 3 | R- 11A | H- 78 | Dhanmondi | Dhaka- 1209',
    terms:
      '<p><strong style="color: rgb(0, 176, 240);">Tourism CRM | </strong><strong style="color: rgb(112, 48, 160);">Estern Bank Limited | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 108 107 000 1404</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">Bank Asia – MCB Banani - Branch |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 01233054714</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">United Commercial Bank | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 02222 1010 000 11214</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p>',
  })

  console.log(invoiceData)

  const handleInvoiceData = (e, index) => {
    const { name, value } = e.target
    setInvoiceData(prevInvoiceData => ({ ...prevInvoiceData, [name]: value }))
  }

  const handlePrint = () => {
    const { clientUUID } = router.query
    const invoiceDataString = JSON.stringify(invoiceData)
    const invoiceDataStringEncoded = encodeURIComponent(invoiceDataString)
    const url = `/invoice/${clientUUID}?invoicetData=${invoiceDataStringEncoded}`

    window.open(url, '_blank')
    setOpenPopup(false)
  }

  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.popup_content}>
        <ImCross
          onClick={() => {
            setOpenPopup(false)
          }}
          className={styles.cross_icon}
        />
        <div className={styles.margin_top}>
          <Typography
            className="primary_color"
            variant="body2"
            sx={{
              fontWeight: 600,
              display: 'block',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 5,
              paddingTop: 3,
              paddingBottom: 5,
            }}
          >
            Generate Invoice
          </Typography>

          <Grid container spacing={2} sx={{ pb: 7 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={invoiceData.name}
                onChange={e => handleInvoiceData(e)}
                type="text"
                fullWidth
                name="name"
                label="Org Name"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => handleInvoiceData(e)}
                type="text"
                fullWidth
                name="phone"
                label="Phone"
                value={invoiceData.phone}
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => handleInvoiceData(e)}
                type="text"
                fullWidth
                name="email"
                label="Email"
                value={invoiceData.email}
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => handleInvoiceData(e)}
                type="text"
                fullWidth
                name="address"
                label="Address"
                value={invoiceData.address}
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 1 }}
              >
                Terms:
              </Typography>
              <ReactQuill
                style={{ height: '100px' }}
                value={invoiceData.terms}
                onChange={value =>
                  handleInvoiceData({ target: { name: 'terms', value } })
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 12 }}>
              <Button onClick={handlePrint} variant="contained" color="primary">
                Generate
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default GenerateInvoicePopup
