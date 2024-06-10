import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import styles from '../../../styles/kpiPopup.module.css'
import {
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
import { updateKpiAssign } from 'src/Utils/func'
import { dayCount } from 'src/Utils/calculationFunctions'

const dateFormatter = date => {
  const formattedDate = new Date(date).toISOString().substr(0, 10)
  return formattedDate
}

const EditKpiPopup = ({ setOpenPopup, allExecutive, selectedRow }) => {
  const [kpi, setKpi] = useState(selectedRow?.wrapper?.kpiCount)
  const [executive, setExecutive] = useState('')
  const [date, setDate] = useState(
    dateFormatter(selectedRow?.wrapper?.date || new Date())
  )

  const handleSelectChange = event => {
    setExecutive(event.target.value)
  }

  const handleUpdate = async () => {
    await updateKpiAssign(selectedRow?.wrapper?.kpiuuid, {
      kpiCount: kpi,
      dayCount: dayCount(date),
    })
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
            Edit KPI
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setKpi(e.target.value)}
                value={kpi}
                type="number"
                fullWidth
                label="KPI Input"
                placeholder=""
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-multiple-select-label">
                  Executive
                </InputLabel>
                <Select
                  disabled
                  single
                  value={selectedRow?.wrapper?.executive}
                  onChange={handleSelectChange}
                  id="form-layouts-separator-multiple-select"
                  labelId="form-layouts-separator-multiple-select-label"
                  input={
                    <OutlinedInput
                      label="Language"
                      id="select-multiple-language"
                    />
                  }
                >
                  {allExecutive
                    ?.sort((a, b) => {
                      // Sort alphabetically by name
                      if (a.name < b.name) {
                        return -1
                      }
                      if (a.name > b.name) {
                        return 1
                      }
                      return 0
                    })
                    ?.map((user, i) => {
                      // Add numerical suffix to names based on order in array
                      const name = `Executive ${i + 1}`
                      return (
                        <MenuItem key={user.name} value={name}>
                          {name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={e => setDate(e.target.value)}
                type="date"
                value={dateFormatter(date)}
                fullWidth
                label=""
                placeholder=""
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                onClick={handleUpdate}
                fullWidth
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default EditKpiPopup
