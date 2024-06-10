const moment = require('moment')

export function calculatePassportExpiryDate(issueDate) {
  const parsedIssueDate = moment(issueDate, 'YYYY-MM-DD')

  // Calculate the expiry date by adding 5 years to the issue date
  const expiryDate = moment(parsedIssueDate).add(5, 'years')

  // Calculate the total number of days in the period between the issue date and the expiry date
  let totalDays = moment(expiryDate).diff(parsedIssueDate, 'days')

  // Calculate the number of leap years that occur during this period
  const startYear = parsedIssueDate.year()
  const endYear = expiryDate.year()
  let leapYears = 0
  for (let year = startYear; year <= endYear; year++) {
    if (moment([year]).isLeapYear()) {
      leapYears++
    }
  }

  // Subtract extra days for leap years if necessary
  if (leapYears === 1) {
    totalDays--
  } else if (leapYears === 2) {
    totalDays -= 2
  }

  // Calculate the final expiry date by subtracting two day from the expiry date
  return moment(expiryDate).subtract(2, 'days').format('YYYY-MM-DD')
}

export const dayCount = dateString => {
  const today = new Date()
  const date = new Date(dateString)

  const difference = date - today
  const dayCount = Math.floor(difference / (1000 * 60 * 60 * 24))

  return dayCount
}
