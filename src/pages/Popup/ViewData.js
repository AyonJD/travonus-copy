import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { ImCross } from 'react-icons/im'
import styles from '../../../styles/viewData.module.css'
import { loadStorage } from 'src/Utils/func'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { MdRemoveCircle } from 'react-icons/md'

const ViewData = ({ data, setOpenPopup }) => {
  const user = loadStorage('cura_user')
  const serviceArr = data?.serviceArr || []
  const [selectedServices, setSelectedServices] = React.useState([])

  const tollgeSelectedServices = service => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(item => item !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  function formatKey(key, serviceName) {
    // Remove the service name from the key
    const formattedKey =
      key !== serviceName && key ? key.replace(serviceName, '') : key

    // Split the key into words and capitalize each word
    const words = key
      ? formattedKey.split(/(?=[A-Z])/)
      : serviceName.split(/(?=[A-Z])/)
    const formattedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    )

    // Join the formatted words with a space
    return formattedWords.join(' ')
  }

  // Define the roles that are allowed to see all key-value pairs
  const allowedRoles = ['admin', 'supervisor']

  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.popup_content}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            right: 0,
            width: '100%',
            backdropFilter: 'blur(5px)',
            paddingTop: 5,
            paddingBottom: '2px',
          }}
        >
          <ImCross
            onClick={() => {
              setOpenPopup(false)
            }}
            className={styles.cross_icon}
          />
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
            Client Data
          </Typography>
        </Box>

        <div className={styles.margin_top}>
          {/* Data goes here */}
          {/* Basic info */}
          <Typography variant="body1">Basic Information</Typography>
          <ul>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.clientName ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Name: {data?.clientName}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.contactNumber ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Contact: {data?.contactNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.whatsappNumber ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Whatsapp: {data?.whatsappNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.email ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Email: {data?.email || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.address ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Address: {data?.address || 'N/A'}
              </Typography>
            </Box>
          </ul>

          {/* Passport info */}
          <Typography variant="body1">Passport Information</Typography>
          <ul>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.dateOfBirth ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Date of Birth: {data?.dateOfBirth || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.passportNumber ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Passport Number: {data?.passportNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.passportIssueDate ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Passport Issue Date: {data?.passportIssueDate || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.passportExpiryDate ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Passport Expiry Date: {data?.passportExpiryDate || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.passportImage ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Passport Image: {data?.passportImage ? 'Yes' : 'N/A'}
              </Typography>
            </Box>
          </ul>

          {/* Service info */}
          {/* {serviceArr.map((service, index) => (
            <div key={index}>
              <Typography variant="body1">
                {formatKey(null, service)}
              </Typography>
              <ul>
                {Object.entries(data)?.map(([key, value]) => {
                  // Check if the key contains the current service name
                  if (key.includes(service)) {
                    // Exclude key-value pairs based on user's role and key pattern
                    if (
                      !allowedRoles.includes(user.role) &&
                      (key.includes('paidToSupplier') ||
                        key.includes('ProfitOrLoss') ||
                        key.includes('RemarksOrRequirement') ||
                        key.includes('MoneyReceipt'))
                    ) {
                      return null
                    }

                    // Do not render if the value is an empty string
                    if (value === '') {
                      return null
                    }

                    return (
                      <li key={key}>
                        {formatKey(key, service)}:{' '}
                        {value === true
                          ? 'Yes'
                          : value === false
                          ? 'No'
                          : typeof value === 'number'
                          ? value.toString()
                          : typeof value === 'string' &&
                            (value.includes(
                              'https://firebasestorage.googleapis.com'
                            )
                              ? 'Yes'
                              : value)}
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </div>
          ))} */}

          <Typography varient="body1" sx={{ marginBottom: 5 }}>
            Taken Services
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {serviceArr.map((service, index) => (
              <Button
                key={index}
                sx={{
                  marginLeft: 2,
                  backgroundColor: selectedServices.includes(service)
                    ? '#640dff'
                    : '',
                }}
                variant="contained"
                // className={`${
                //   selectedServices.includes(service) ? 'active_button' : ''
                // }`}
                onClick={() => tollgeSelectedServices(service)}
              >
                {formatKey(null, service)}
              </Button>
            ))}
            {serviceArr.length === 0 && (
              <ul>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <MdRemoveCircle color="red" size={21} />
                  <Typography variant="body1">No service taken</Typography>
                </Box>
              </ul>
            )}
          </Box>

          {/* Service details */}
          <Box sx={{ marginTop: 5 }}>
            {selectedServices.map((service, index) => (
              <div key={index}>
                <Typography variant="body1">
                  {formatKey(null, service)}
                </Typography>
                <ul>
                  {Object.entries(data)?.map(([key, value]) => {
                    // Check if the key contains the current service name
                    if (key.includes(service)) {
                      // Exclude key-value pairs based on user's role and key pattern
                      if (
                        !allowedRoles.includes(user.role) &&
                        (key.includes('paidToSupplier') ||
                          key.includes('ProfitOrLoss') ||
                          key.includes('RemarksOrRequirement') ||
                          key.includes('MoneyReceipt'))
                      ) {
                        return null
                      }

                      // Do not render if the value is an empty string
                      // if (value === '') {
                      //   return null
                      // }

                      return (
                        <Box
                          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                        >
                          {value === '' || value === false ? (
                            <MdRemoveCircle color="red" size={21} />
                          ) : (
                            <BsFillCheckCircleFill color="green" size={18} />
                          )}
                          <Typography key={key} varient="body1" sx={{ my: 2 }}>
                            {formatKey(key, service)}:{' '}
                            {value === true
                              ? 'Yes'
                              : value === false
                              ? 'No'
                              : typeof value === 'number'
                              ? value.toString()
                              : typeof value === 'string' &&
                                (value.includes(
                                  'https://firebasestorage.googleapis.com'
                                )
                                  ? 'Yes'
                                  : value === ''
                                  ? 'N/A'
                                  : value)}
                          </Typography>
                        </Box>
                      )
                    }
                    return null
                  })}
                </ul>
              </div>
            ))}
          </Box>

          {/* Account info */}
          <Typography variant="body1">Account Information</Typography>
          <ul>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.totalPayment ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Total Payment: {data?.totalPayment}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.totalPaid ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Total Paid: {data?.totalPaid}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {data?.currentlyDue ? (
                <BsFillCheckCircleFill color="green" size={18} />
              ) : (
                <MdRemoveCircle color="red" size={21} />
              )}
              <Typography varient="body1" sx={{ my: 2 }}>
                Total Due: {data?.currentlyDue}
              </Typography>
            </Box>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ViewData
