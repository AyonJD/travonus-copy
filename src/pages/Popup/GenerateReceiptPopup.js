import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import styles from '../../../styles/moneyReceipt.module.css'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import 'react-quill/dist/quill.snow.css'
import toast from 'react-hot-toast'

const GenerateReceiptPopup = ({ setOpenPopup, services }) => {
  const router = useRouter()
  const [receiptData, setReceiptData] = useState(
    services?.map(service => ({ name: service, amount: 0 }))
  )

  const [manualReceiptData, setManualReceiptData] = useState({
    name: 'Tourism CRM',
    phone: '01323581330',
    email: 'mytravonus@gmail.com',
    address: 'Sufi Villa | level 3 | R- 11A | H- 78 | Dhanmondi | Dhaka- 1209',
    terms:
      '<p><strong style="color: rgb(0, 176, 240);">Tourism CRM | </strong><strong style="color: rgb(112, 48, 160);">Estern Bank Limited | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 108 107 000 1404</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">Bank Asia – MCB Banani - Branch |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 01233054714</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p><p><strong style="color: rgb(0, 176, 240);">Health Park Comunication| </strong><strong style="color: rgb(112, 48, 160);">United Commercial Bank | </strong><span style="color: rgb(112, 48, 160);">Satmasjid Road Branch</span><strong style="color: rgb(112, 48, 160);"> |</strong><strong style="color: rgb(0, 176, 240);"> a/c no 02222 1010 000 11214</strong><span style="color: rgb(0, 176, 240);">&nbsp;</span></p>',
  })

  const handleReceiptData = (e, index) => {
    const { name, value } = e.target
    setReceiptData(prevReceiptData =>
      prevReceiptData?.map((item, i) =>
        i === index ? { ...item, amount: value } : item
      )
    )
  }

  const hendleManualReceiptData = e => {
    const { name, value } = e.target
    setManualReceiptData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePrint = () => {
    // if the amount type is string, return error
    const isAmountString = receiptData.some(item => isNaN(item.amount))
    if (isAmountString) {
      toast.error('Amount must be a number')
      return
    }
    // Remove entries where the amount is 0
    const filteredReceiptData = receiptData
      .filter(item => item.amount !== 0)
      .map(({ name, amount }) => ({ name, amount }))

    // send te filteredReceiptData with query params in a black tab
    const { clientUUID } = router.query
    const receiptDataString = JSON.stringify(filteredReceiptData)
    const manualReceiptDataString = JSON.stringify(manualReceiptData)
    const receiptDataStringEncoded = encodeURIComponent(receiptDataString)
    const manualReceiptDataEncoded = encodeURIComponent(manualReceiptDataString)
    const url = `/money_receipt/${clientUUID}?receiptData=${receiptDataStringEncoded}&manualData=${manualReceiptDataEncoded}`

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
            Generate Money Receipt
          </Typography>

          <Grid container spacing={2} sx={{ pb: 7 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={manualReceiptData.name}
                onChange={e => hendleManualReceiptData(e)}
                type="text"
                fullWidth
                name="name"
                label="Org Name"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => hendleManualReceiptData(e)}
                type="text"
                fullWidth
                name="phone"
                label="Phone"
                value={manualReceiptData.phone}
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => hendleManualReceiptData(e)}
                type="text"
                fullWidth
                name="email"
                label="Email"
                value={manualReceiptData.email}
                focused
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => hendleManualReceiptData(e)}
                type="text"
                fullWidth
                name="address"
                label="Address"
                value={manualReceiptData.address}
                focused
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pb: 7 }}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 1 }}
              >
                Money Receipt Payment Info
              </Typography>
            </Grid>
            {receiptData?.map((receiptItem, index) => (
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={e => handleReceiptData(e, index)}
                  type="text"
                  fullWidth
                  name={receiptItem.name}
                  label={receiptItem.name}
                  // value={receiptItem.amount}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 1 }}
              >
                Terms:
              </Typography>
              <ReactQuill
                style={{ height: '100px' }}
                value={manualReceiptData.terms}
                onChange={value =>
                  hendleManualReceiptData({
                    target: { name: 'terms', value },
                  })
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ my: 12 }}>
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

export default GenerateReceiptPopup
