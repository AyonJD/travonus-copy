import { db, firestore } from 'config/firebase.init'
// import { set, ref, onValue, remove, update } from "firebase/database";
import { toast } from 'react-hot-toast'

// Firestore imports
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { allQueryKpi, getAllClient } from './func'

// Utility function to get the start of the current month as a Timestamp
export const getStartOfMonthTimestamp = () => {
  const currentDate = new Date()
  return Timestamp.fromDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  )
}

// Utility function to check if a document's date is within the current month
export const isDateInCurrentMonth = (createdAtString, selectedMonth) => {
  if (!createdAtString) {
    console.error('Missing createdAtString')
    return false
  }

  // Parse the date string using Intl.DateTimeFormat
  const parsedDate = new Date(
    createdAtString.replace(/(\d+)(st|nd|rd|th)/, '$1')
  )

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date string:', createdAtString)
    return false
  }

  return (
    parsedDate.getMonth() === selectedMonth.getMonth() &&
    parsedDate.getFullYear() === selectedMonth.getFullYear()
  )
}

// Lead Analytics start---------------------------------------------------------------------------------------------->

export const getTotalLeadEntries = async selectedMonth => {
  try {
    // Reference to the 'lead' collection
    const leadCollection = collection(db, 'lead')

    // Get all documents in the 'lead' collection
    const querySnapshot = await getDocs(leadCollection)

    // Filter leads created in the current month
    const currentMonthLeads = querySnapshot.docs.filter(doc =>
      isDateInCurrentMonth(doc.data().wrapper.createdAt, selectedMonth)
    )

    // Return the total number of entries in the current month
    return currentMonthLeads.length
  } catch (error) {
    console.error('Error getting total lead entries:', error)
    throw error
  }
}

export const getTotalLeadEntriesStatus = async (status, selectedMonth) => {
  try {
    // Reference to the 'lead' collection
    const leadCollection = collection(db, 'lead')

    // Query to filter documents where leadstatus is equal to status
    const convertedLeadQuery = query(
      leadCollection,
      where('wrapper.leadstatus', '==', status)
    )

    // Get all documents in the filtered query
    const querySnapshot = await getDocs(convertedLeadQuery)

    // querySnapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data())
    // })

    // Filter leads created in the current month
    const currentMonthLeads = querySnapshot.docs.filter(doc =>
      isDateInCurrentMonth(doc.data().wrapper.createdAt, selectedMonth)
    )

    // Return the total number of entries with leadstatus in the current month
    const totalStatusLead = currentMonthLeads.length
    const totalLead = await getTotalLeadEntries(selectedMonth)

    const percentage = ((totalStatusLead / totalLead) * 100).toFixed(2)

    return { totalStatusLead, percentage: isNaN(percentage) ? 0 : percentage }
  } catch (error) {
    console.error('Error getting total lead entries:', error)
    throw error
  }
}

// Lead Analytics end---------------------------------------------------------------------------------------------->

// Client Analytics start------------------------------------------------------------------------------------------->
export const getTotalClientEntries = async selectedMonth => {
  try {
    // Reference to the 'client' collection
    const clientCollection = collection(db, 'client')

    // Get all documents in the 'client' collection
    const querySnapshot = await getDocs(clientCollection)

    // Filter clients created in the current month
    const currentMonthClients = querySnapshot.docs.filter(doc =>
      isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
    )

    // Return the total number of entries in the current month
    return currentMonthClients.length
  } catch (error) {
    console.error('Error getting total client entries:', error)
    throw error
  }
}

export const getTotalServiceOfClients = async (serviceName, selectedMonth) => {
  try {
    // Reference to the 'client' collection
    const clientCollection = collection(db, 'client')

    // Query to filter documents where the serviceArr includes serviceName
    const serviceQuery = query(
      clientCollection,
      where('wrapper.formData.serviceArr', 'array-contains', serviceName)
    )

    // Get all documents in the filtered query
    const querySnapshot = await getDocs(serviceQuery)

    // Filter clients created in the current month
    const currentMonthClients = querySnapshot.docs.filter(doc =>
      isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
    )

    // Return the total number of entries with the service
    const clientOfService = currentMonthClients.length
    const totalClient = await getTotalClientEntries(selectedMonth)
    const percentage = ((clientOfService / totalClient) * 100).toFixed(2)

    return { clientOfService, percentage }
  } catch (error) {
    console.error('Error getting total visa service clients:', error)
    throw error
  }
}

export const totalServedClientWithHundredPercent = async (
  condition,
  selectedMonth
) => {
  // const getAllQueryKpi = await allQueryKpi()

  const querySnapshot = await getDocs(collection(db, 'queryKpi'))
  const currentMonth = selectedMonth.toISOString().slice(5, 7)

  const getAllQueryKpi = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    const uniqueClientId = data.wrapper.uniqueClientId || ''
    const month = uniqueClientId.slice(2, 4) // Extract month from uniqueClientId

    // Check if the document's month matches the current month
    if (month === currentMonth) {
      getAllQueryKpi.push(data)
    }
  })

  if (getAllQueryKpi.length === 0) {
    return 0
  }

  const filteredServices = getAllQueryKpi?.map(singleService => {
    return singleService?.wrapper?.takenService?.filter(
      singleService => singleService.willRender
    )
  })

  // filteredServices is an array of arrays, return all the arrays with length > 0
  const filteredServicesWithLength = filteredServices.filter(
    singleService => singleService.length > 0
  )

  let totalServedClient = 0
  let totalActiveClient = 0

  filteredServicesWithLength.forEach(serviceArray => {
    let isClientActive = false // Flag to check if the client is active
    serviceArray.forEach(singleService => {
      const segmentCount =
        singleService.kpiCount[`${singleService.queryName}Segment`] || 0

      if (segmentCount !== singleService.service.segmentValue) {
        // If any service is not completed, mark the client as active
        isClientActive = true
      }
    })

    if (!isClientActive) {
      // If the client is not marked as active, all services are completed
      totalServedClient++
    } else {
      // If the client is marked as active, at least one service is not completed
      totalActiveClient++
    }
  })

  if (condition === 'totalServedClient') {
    return totalServedClient
  } else if (condition === 'totalActiveClient') {
    return totalActiveClient
  }
}

// Client Analytics end------------------------------------------------------------------------------------------->

// Account Analytics start------------------------------------------------------------------------------------------>
export const totalPaidByClient = async selectedMonth => {
  // const allClientData = await getAllClient()

  const clientCollection = collection(db, 'client')
  const querySnapshot = await getDocs(clientCollection)

  const currentMonthClients = querySnapshot.docs.filter(doc =>
    isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
  )

  let totalPaid = 0
  await Promise.all(
    currentMonthClients.map(async doc => {
      const clientData = doc.data().wrapper.formData
      if (clientData && clientData.totalPaid) {
        totalPaid += clientData.totalPaid
      }
    })
  )

  return totalPaid

  // const totalPaid = allClientData.reduce((acc, cur) => {
  //   return acc + cur.wrapper.formData.totalPaid
  // }, 0)
  // return totalPaid
}

export const totalPaidToSupplier = async selectedMonth => {
  // const allClientData = await getAllClient()

  // let paidToSupplier = 0
  // allClientData.forEach(async row => {
  //   for (const key in row.wrapper.formData) {
  //     if (key.includes('paidToSupplier')) {
  //       paidToSupplier += Number(row.wrapper.formData[key])
  //       console.log(row.wrapper.formData[key])
  //     }
  //   }
  // })
  // return paidToSupplier

  const clientCollection = collection(db, 'client')
  const querySnapshot = await getDocs(clientCollection)

  const currentMonthClients = querySnapshot.docs.filter(doc =>
    isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
  )

  let paidToSupplier = 0
  await Promise.all(
    currentMonthClients.map(async doc => {
      const clientData = doc.data()
      if (clientData && clientData.wrapper.formData) {
        for (const key in clientData.wrapper.formData) {
          if (key.includes('paidToSupplier')) {
            paidToSupplier += Number(clientData.wrapper.formData[key])
          }
        }
      }
    })
  )

  return paidToSupplier
}

export const totalPaymentByClient = async selectedMonth => {
  const clientCollection = collection(db, 'client')
  const querySnapshot = await getDocs(clientCollection)

  const currentMonthClients = querySnapshot.docs.filter(doc =>
    isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
  )

  let totalPayment = 0
  await Promise.all(
    currentMonthClients.map(async doc => {
      const clientData = doc.data()
      if (clientData && clientData.wrapper.formData) {
        for (const key in clientData.wrapper.formData) {
          if (key.includes('totalPayment')) {
            totalPayment += Number(clientData.wrapper.formData[key])
          }
        }
      }
    })
  )

  return totalPayment
}

export const totalDue = async selectedMonth => {
  const clientCollection = collection(db, 'client')
  const querySnapshot = await getDocs(clientCollection)

  const currentMonthClients = querySnapshot.docs.filter(doc =>
    isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
  )

  let totalDue = 0
  await Promise.all(
    currentMonthClients.map(async doc => {
      const clientData = doc.data()
      if (clientData && clientData.wrapper.formData) {
        for (const key in clientData.wrapper.formData) {
          if (key.includes('currentlyDue')) {
            totalDue += Number(clientData.wrapper.formData[key])
          }
        }
      }
    })
  )

  return totalDue
}

// Table data start---------------------------------------------------------------------------------------------->
export const clientsWithServiceSelected = async (paid, selectedMonth) => {
  try {
    const clientCollection = collection(db, 'client')
    const querySnapshot = await getDocs(clientCollection)

    const currentMonthClients = querySnapshot.docs.filter(doc =>
      isDateInCurrentMonth(doc.data().wrapper.createdOn, selectedMonth)
    )

    if (paid) {
      // Return the original data of clients meeting the conditions
      return currentMonthClients
        .filter(
          doc =>
            doc.data().wrapper.formData.serviceArr.length > 0 &&
            doc.data().wrapper.formData.totalPaid > 0
        )
        .map(doc => doc.data()) // return the original data
    } else {
      // Return the original data of clients meeting the conditions
      return currentMonthClients
        .filter(
          doc =>
            doc.data().wrapper.formData.serviceArr.length > 0 &&
            doc.data().wrapper.formData.totalPaid === 0
        )
        .map(doc => doc.data()) // return the original data
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw error // rethrow the error for the caller to handle
  }
}
