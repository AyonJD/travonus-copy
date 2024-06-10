import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import styles from '../../../styles/kpiPopup.module.css'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { deleteKpi } from 'src/Utils/func'

const DeleteKpiPopup = ({ setOpenPopup, selectedRow }) => {
  const handleDelete = async () => {
    await deleteKpi(selectedRow?.wrapper?.kpiuuid)
    setOpenPopup(false)
    window.location.reload()
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
            }}
          >
            Are you sure you want to delete this kpi?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontWeight: 600,
                display: 'block',
                textAlign: 'center',
                fontSize: 15,
                width: '30%',
              }}
              onClick={() => setOpenPopup(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{
                fontWeight: 600,
                display: 'block',
                textAlign: 'center',
                fontSize: 15,
                width: '30%',
                background: '#901F2F',
              }}
              className='hover_error'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default DeleteKpiPopup
