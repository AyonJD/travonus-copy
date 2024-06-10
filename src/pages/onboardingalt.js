import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { TextareaAutosize } from '@mui/base'

import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'

// ** Icons Imports
import { Plus } from 'mdi-material-ui'
import {
  addLead,
  addUser,
  getAllLead,
  getLeadPerUser,
  loadStorage,
  getAllUser,
} from 'src/Utils/func'
import { useRouter } from 'next/router'
import { toast, Toaster } from 'react-hot-toast'
import UserCard from 'src/@core/components/userCard/UserCard'
import { uid } from 'uid'
import OnboardingTable from 'src/@core/components/tables/OnboardingTable'

const onboardingalt = () => {
  const user = loadStorage('cura_user')
  const [details, setDetails] = useState('')
  const [executive, setExecutive] = useState('')
  const router = useRouter()
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [allUser, setAllUser] = useState([])
  const [allExecutive, setAllExecutive] = useState([])

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  const settingLeadsPerRole = async () => {
    if (user.role === 'admin' || user.role === 'supervisor') {
      setLeads(await getAllLead())
    } else {
      const executiveLead = await getLeadPerUser(user.name)
      setLeads(executiveLead)
    }
  }

  useEffect(() => {
    filterByDate(new Date())
  }, [leads])

  useEffect(async () => {
    settingLeadsPerRole()
    addUser()
    filterByDate(new Date())
    getAllUser(setAllUser)
    // filter role === executive
  }, [])

  useEffect(() => {
    const allExecutive = allUser.filter(item => item.role === 'executive')
    setAllExecutive(allExecutive)
  }, [allUser])

  // Handle Select
  const handleSelectChange = event => {
    setExecutive(event.target.value)
  }

  const handleSubmit = () => {
    if (!details || !executive) {
      toast.error('Please fill all fields')
      return
    }

    const timeStamp = new Date().getTime()
    const uuid = uid()
    addLead(uuid, {
      lead_details: details,
      executive,
      createdAtAlt: timeStamp,
      createdAt: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        timeZoneName: 'short',
      }),
      leaduuid: uuid,
      user,
    })
      .then(() => {
        window.location.reload()
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const filterByDate = async date => {
    const initialDate = date || new Date()

    const inserterDate = new Date(initialDate)

    const filteredData = leads.filter(item => {
      const createdAt = new Date(Date.parse(item.wrapper.createdAt))
      return createdAt.toDateString() === inserterDate.toDateString()
    })
    setFilteredLeads(filteredData)
  }

  useEffect(() => {
    filterByDate(selectedDate)
  }, [selectedDate])

  const convertDate = dateString => {
    let date = new Date(dateString)
    let formattedDate = date.toISOString().slice(0, 10)
    return formattedDate
  }

  return (
    <>
      {/* <UserCard />
            <br /> */}
      <Card>
        <CardHeader title="Filter by date" />

        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <TextField
                value={convertDate(selectedDate)}
                onChange={e => setSelectedDate(e.target.value)}
                type="date"
                fullWidth
                label=""
                placeholder=""
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader
          title="Lead Assign"
          // action={
          //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
          //     <DotsVertical />
          //   </IconButton>
          // }
          subheader={
            <>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                <Box
                  component="span"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {/* Add */}
                </Box>{' '}
                Add your client lead here
              </Typography>
            </>
          }
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={9}>
              <TextareaAutosize
                disabled={user?.role !== 'supervisor'}
                value={details}
                onChange={e => setDetails(e.target.value)}
                className="custom_focus"
                aria-label="minimum height"
                minRows={3}
                placeholder="Lead Description"
                style={{
                  width: '100%',
                  height: 55,
                  borderRadius: 6,
                  border: '1px solid #ced4da',
                  padding: 10,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-multiple-select-label">
                  Executive
                </InputLabel>
                <Select
                  disabled={user?.role !== 'supervisor'}
                  single
                  value={executive}
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
                    .sort((a, b) => {
                      // Sort alphabetically by name
                      if (a.name < b.name) {
                        return -1
                      }
                      if (a.name > b.name) {
                        return 1
                      }
                      return 0
                    })
                    .map((user, i) => {
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

            <Grid item xs={12} sm={3}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<Plus />}
                fullWidth
                sx={{ height: 55 }}
              >
                Add Lead
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>

      <OnboardingTable leads={filteredLeads} />

      {/* <Toaster /> */}
    </>
  )
}

export default onboardingalt
