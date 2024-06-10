export const BASE_URL = 'https://cura-zeb7.onrender.com/api/v1/'

export const visaIcon = '/icons/visa.png'
export const ticketingIcon = '/icons/ticketing.png'
export const hotelIcon = '/icons/hotel.png'
export const airAmbulanceIcon = '/icons/air-ambulance.png'
export const airportMeetIcon = '/icons/airport-meet.png'
export const doctorSelectionIcon = '/icons/doctor-selection.png'
export const guideManageIcon = '/icons/guide-manage.png'
export const healthInsuranceIcon = '/icons/health-insu.png'
export const hospitalSelectionIcon = '/icons/hospital-selection.png'
export const languageIcon = '/icons/language.png'
export const localTransportIcon = '/icons/local-transport.png'
export const telemedicineIcon = '/icons/telemedicine.png'

// Date options
export const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
}

export const parseDate = dateString => {
  // Parse the date string into a Date object considering the GMT+6 timezone
  const [dayOfWeek, month, day, year, timezone] = dateString.split(/[\s,]+/)
  return new Date(`${day} ${month} ${year} ${timezone}`)
}

export const formatDateToString = date => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayName = days[date.getUTCDay()]
  const monthName = months[date.getUTCMonth()]
  const day = date.getUTCDate().toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  const timezone = 'GMT+6'

  return `${dayName}, ${monthName} ${day}, ${year}, ${timezone}`
}
