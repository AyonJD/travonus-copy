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
import { formatDateToString, parseDate } from './Utils'

export const loadStorage = key => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

/**
 * It takes an array of dates, finds the closest date to the current date, and returns true if the
 * closest date is within 7 days of the current date, otherwise it returns false.
 * @param allDates - An array of dates in the format YYYY-MM-DD.
 * @returns A boolean value.
 */
export const findNearestDate = allDates => {
  let isWithin7DaysOfClosest

  const dates = allDates.filter(date => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(date)
  })
  const currentDate = new Date()

  if (dates.length !== 0) {
    let nearestDate = new Date(dates[0])

    let diff = Math.abs(currentDate - nearestDate)

    for (let i = 1; i < dates.length; i++) {
      const tempDate = new Date(dates[i])
      const tempDiff = Math.abs(currentDate - tempDate)
      if (tempDiff < diff) {
        nearestDate = tempDate
        diff = tempDiff
      }
    }

    const closest = nearestDate.toISOString().slice(0, 10)

    /**
     * If the difference between the current date and the date to check is less than or equal to 7,
     * return true, otherwise return false.
     * @param date - The date to check.
     * @returns a boolean value.
     */
    function isWithin7Days(date) {
      let dayDiff
      const currentDate = new Date()
      const dateToCheck = new Date(date)
      const timeDiff = dateToCheck - currentDate
      if (timeDiff > 0) {
        dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      }
      return dayDiff <= 7
    }

    isWithin7DaysOfClosest = isWithin7Days(closest)
  }
  return isWithin7DaysOfClosest
}

export const returnTotal = arr => {
  const filteredServices = arr?.filter(
    singleService => singleService.willRender
  )
  const average = filteredServices?.map(singleService => {
    let key
    let total = 0
    let count = 0
    for (key in singleService.kpiCount) {
      total += Number(
        singleService.kpiCount[`${singleService.queryName}Segment`]
      )
      count++
    }
    return total / count
  })

  const completed = average?.reduce((a, b) => a + b, 0)
  return completed
}

export const generateUniqueChar = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let uniqueString = ''

  while (uniqueString.length < 12) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    uniqueString += chars[randomIndex]
  }

  return uniqueString
}

//----------------> Make unique id for each submitted form <----------------
export const handleMakeId = (clientName, userName) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString().substr(-2)
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const hour = currentDate.getHours().toString().padStart(2, '0')
  const minute = currentDate.getMinutes().toString().padStart(2, '0')
  const formattedDate = day + month + year + hour + minute

  const clientNameWords = clientName.split(' ')
  const clientNameInitials = clientNameWords.map(word =>
    word.charAt(0).toUpperCase()
  )
  const clientInitials = clientNameInitials.join('')

  const userNameWords = userName.split(' ')
  const userInitials = `EXE${userNameWords[1]}`

  const uniqueId = formattedDate + userInitials + clientInitials

  return uniqueId
}

// Reacltime Database-------------------------------->

// export const addLead = (uuid, lid) => {
//     set(ref(db, `lead/${uuid}/wrapper`), lid)
//         .then(() => {
//             toast.success('Data submitted successfully!')
//         }) // Data saved successfully!s
//         .catch((error) => {
//             console.log(error);
//         }); // Data saved unsuccessful!
// };

// export const getAllLead = (setLeads) => {

//     onValue(ref(db, '/lead'), (snapshot) => {
//         setLeads([]);
//         const data = snapshot.val();
//         if (data !== null) {
//             Object.values(data).map((user) => {
//                 setLeads((oldArray) => [...oldArray, user]);
//             });
//         }
//     });
//     // after all the execution of the function, remove the listener
//     return () => {
//         remove(ref(db, url));
//     };
// };

// export const getLeadPerUser = async (userUUID) => {
//     const getNewLeads = () => {
//         return new Promise((resolve) => {
//             const newLeads = [];
//             onValue(ref(db, "/lead"), (snapshot) => {
//                 const data = snapshot.val();
//                 if (data !== null) {
//                     Object.values(data).map((user) => {
//                         newLeads.push(user);
//                     });
//                     resolve(newLeads);
//                 }
//             });
//         });
//     };

//     const leads = await getNewLeads();
//     const filteredLeads = await leads.filter(lead => lead.wrapper.user.uuid === userUUID);
//     return filteredLeads;
// };

// export const updateLeads = (uuid, lead) => {
//     update(ref(db, `lead/${uuid}/wrapper`), lead)
//         .then(() => {
//             toast.success('Data updated successfully!');
//         })
//         .catch((error) => {
//             toast.error(error);
//         });
// };

// export const addKpi = (uuid, kpi) => {
//     set(ref(db, `kpi/${uuid}/wrapper`), kpi)
//         .then(() => {
//             toast.success('Data submitted successfully!')
//         }) // Data saved successfully!s
//         .catch((error) => {
//             console.log(error);
//         }); // Data saved unsuccessful!
// };

// export const getAllKpi = async () => {
//     const getNewKpi = () => {
//         return new Promise((resolve) => {
//             const newKpi = [];
//             onValue(ref(db, "/kpi"), (snapshot) => {
//                 const data = snapshot.val();
//                 if (data !== null) {
//                     Object.values(data).map((user) => {
//                         newKpi.push(user);
//                     });
//                     resolve(newKpi);
//                 }
//             });
//         });
//     };

//     const kpi = await getNewKpi();
//     return kpi;
// };

// export const getKpiPerUuid = async (uuid) => {
//     const getNewKpi = () => {
//         return new Promise((resolve) => {
//             const newKpi = [];
//             onValue(ref(db, `/kpi/${uuid}/wrapper`), (snapshot) => {
//                 const data = snapshot.val();
//                 if (data !== null) {
//                     Object.values(data).map((kpiData) => {
//                         newKpi.push(kpiData);
//                     });
//                     resolve(newKpi);
//                 }
//             });
//         });
//     };

//     const kpi = await getNewKpi();
//     return kpi;
// };

// Firestore Database-------------------------------->

export const addUser = async uuid => {
  try {
    await setDoc(doc(db, 'user', uuid), {
      uuid: uuid,
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin',
      UserIDCode: '3EA2',
      name: 'Admin',
    })
    toast.success('Data submitted successfully!')
  } catch (error) {
    // console.log(error);
  }
}

export const getAllUser = async setUsers => {
  const querySnapshot = await getDocs(collection(db, 'user'))
  setUsers([])
  querySnapshot.forEach(doc => {
    const data = doc.data()
    setUsers(oldArray => [...oldArray, data])
  })
}

export const addLead = async (uuid, lid) => {
  try {
    await setDoc(doc(db, 'lead', uuid), {
      wrapper: lid,
    })
    toast.success('Data submitted successfully!')
  } catch (error) {
    toast.error('Something went wrong!')
  }
}

export const getAllLead = async (filter, startDateStr, endDateStr) => {
  console.log(startDateStr, endDateStr, 'startDateStr, endDateStr')
  try {
    let queryCondition = []
    if (filter) {
      queryCondition.push(
        where('wrapper.leadstatus', 'not-in', [
          'Converted',
          'Not Converted',
          'Denied',
        ])
      )
    }
    if (startDateStr && endDateStr) {
      queryCondition.push(
        where('wrapper.createdAtAlt', '>=', startDateStr),
        where('wrapper.createdAtAlt', '<=', endDateStr)
      )
    }

    const q = query(collection(db, 'lead'), ...queryCondition)

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log('No matching documents.')
      return []
    }

    const leads = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      leads.push(data)
    })

    return leads
  } catch (error) {
    console.log(error)
  }
}

export const deleteLeads = async uuidArray => {
  try {
    for (const uuid of uuidArray) {
      await deleteDoc(doc(db, 'lead', uuid))
    }
    toast.success('Data deleted successfully!')
  } catch (error) {
    toast.error('Something went wrong!')
    console.log(error)
  }
}

// export const getLeadPerUser = async userName => {
//   const querySnapshot = await getDocs(collection(db, 'lead'))
//   return new Promise(resolve => {
//     const leads = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       leads.push(data)
//     })
//     resolve(leads)
//   }).then(leads => {
//     // Modification need here. Here executive will get the leads he assigned.
//     const filteredLeads = leads.filter(
//       lead =>
//         lead?.wrapper?.executive?.toLowerCase()?.trim() ===
//         userName?.toLowerCase()?.trim()
//     )
//       console.log(filteredLeads, 'filteredLeads')
//     return filteredLeads
//   })
// }

export const getLeadPerUser = async (
  userName,
  filter,
  startDateStr,
  endDateStr
) => {
  try {
    let queryCondition = [where('wrapper.executive', '==', userName)]
    if (filter) {
      queryCondition.push(
        where('wrapper.leadstatus', 'not-in', [
          'Converted',
          'Not Converted',
          'Denied',
        ])
      )
    }
    if (startDateStr && endDateStr) {
      queryCondition.push(
        where('wrapper.createdAtAlt', '>=', startDateStr),
        where('wrapper.createdAtAlt', '<=', endDateStr)
      )
    }

    const q = query(collection(db, 'lead'), ...queryCondition)
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log('No matching documents.')
      return []
    }

    const leads = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      leads.push(data)
    })
    console.log(leads, 'leads============')
    return leads
  } catch (error) {
    console.error('Error fetching leads:', error)
  }
}

export const getLeadPerUserUuid = async userUUID => {
  const q = query(
    collection(db, 'lead'),
    where('wrapper.user.uuid', '==', userUUID)
  )

  const querySnapshot = await getDocs(q)

  const leads = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    leads.push(data)
  })

  return leads
}

// export const updateLeads = async (uuid, lead) => {
//   try {
//     const existingLead = await getLeadPerUuid(uuid)
//     if (!existingLead) {
//       throw new Error('No lead found with the specified UUID')
//     }

//     let leadData = {
//       ...existingLead.wrapper,
//       leadstatus:
//         lead.leadstatus || existingLead.wrapper.leadstatus || 'Pending',
//       leadtype: lead.leadtype || existingLead.wrapper.leadtype,
//       note: lead.note || existingLead.wrapper.note || 'N/A',
//       updatedOn: new Date().toLocaleDateString(),
//     }

//     await updateDoc(doc(db, 'lead', uuid), {
//       wrapper: leadData,
//     })
//     toast.success('Data updated successfully!')
//   } catch (error) {
//     toast.error('Something went wrong!')
//     console.log(error)
//   }
// }

export const updateLeads = async (uuid, lead) => {
  try {
    // Directly fetch the existing lead data within the same function
    const leadDocRef = doc(db, 'lead', uuid)
    const existingLeadSnapshot = await getDoc(leadDocRef)

    if (!existingLeadSnapshot.exists()) {
      throw new Error('No lead found with the specified UUID')
    }

    const existingLead = existingLeadSnapshot.data()

    let leadData = {
      ...existingLead.wrapper,
      leadstatus:
        lead.leadstatus || existingLead.wrapper.leadstatus || 'Pending',
      leadtype: lead.leadtype || existingLead.wrapper.leadtype,
      note: lead.note || existingLead.wrapper.note || 'N/A',
      updatedOn: new Date().toLocaleDateString(),
    }

    await updateDoc(leadDocRef, {
      wrapper: leadData,
    })

    toast.success('Data updated successfully!')
  } catch (error) {
    toast.error('Something went wrong!')
    console.log(error)
  }
}

// Get lead per leaduuid
// export const getLeadPerUuid = async leaduuid => {
//   const querySnapshot = await getDocs(collection(db, 'lead'))
//   return new Promise(resolve => {
//     const leads = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       leads.push(data)
//     })
//     resolve(leads)
//   }).then(leads => {
//     const filteredLeads = leads.find(lead => lead.wrapper.leaduuid === leaduuid)
//     console.log(filteredLeads, 'filteredLeads')
//     return filteredLeads
//   })
// }

export const getLeadPerUuid = async leaduuid => {
  const q = query(
    collection(db, 'lead'),
    where('wrapper.leaduuid', '==', leaduuid)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const lead = querySnapshot.docs[0].data()

  return lead
}

export const addClient = async (uuid, clientInput) => {
  try {
    await setDoc(doc(db, 'client', uuid), {
      wrapper: clientInput,
    })
    // toast.success('Data submitted successfully!')
    return true
  } catch (error) {
    toast.error('Something went wrong!')
  }
}

// export const getClientPerUser = async userUUID => {
//   const querySnapshot = await getDocs(collection(db, 'client'))
//   return new Promise(resolve => {
//     const clients = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       clients.push(data)
//     })
//     resolve(clients)
//   }).then(clients => {
//     // Modification need here. Here executive will get the leads he assigned.
//     const filterClient = clients.filter(
//       client => client.wrapper.clientDetails.uuid === userUUID
//     )
//     console.log(filterClient, 'filterClient')
//     return filterClient
//   })
// }

export const getClientPerUser = async (userUUID, startDateStr, endDateStr) => {
  try {
    let queryCondition = [where('wrapper.clientDetails.uuid', '==', userUUID)]

    if (startDateStr && endDateStr) {
      queryCondition.push(
        where('wrapper.createdAtAlt', '>=', startDateStr),
        where('wrapper.createdAtAlt', '<=', endDateStr)
      )
    }

    const q = query(collection(db, 'client'), ...queryCondition)
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log('No matching documents.')
      return []
    }

    const clients = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      clients.push(data)
    })

    return clients
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// export const getClientPeruniqueClientId = async uniqueClientId => {
//   const querySnapshot = await getDocs(collection(db, 'client'))
//   return new Promise(resolve => {
//     const clients = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       clients.push(data)
//     })
//     resolve(clients)
//   }).then(clients => {
//     const filterClient = clients.filter(
//       client => client.wrapper.uniqueClientId === uniqueClientId
//     )
//     if (filterClient.length === 0) {
//       // toast.error('No client found');
//       return filterClient
//     }
//     console.log(filterClient, 'filterClient test')
//     return filterClient
//   })
// }

export const getClientPeruniqueClientId = async uniqueClientId => {
  const q = query(
    collection(db, 'client'),
    where('wrapper.uniqueClientId', '==', uniqueClientId)
  )

  const querySnapshot = await getDocs(q)

  const clients = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    clients.push(data)
  })

  if (clients.length === 0) {
    // No client found with the specified uniqueClientId
    // toast.error('No client found');
  }
  return clients
}

// export const getClientPeruniqueClientIdArray = async uniqueClientIdArray => {
//   const querySnapshot = await getDocs(collection(db, 'client'))
//   return new Promise(resolve => {
//     const clients = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       clients.push(data)
//     })
//     resolve(clients)
//   }).then(clients => {
//     const filterClient = clients.filter(
//       // get the client data if the uniqueClientIdArray array's uniqueClientId is exist into the clients array
//       client => uniqueClientIdArray.includes(client.wrapper.uniqueClientId)
//     )
//     if (filterClient.length === 0) {
//       // toast.error('No client found');
//       return filterClient
//     }
//     console.log(filterClient, 'filterClient test')
//     return filterClient
//   })
// }

export const getClientPeruniqueClientIdArray = async uniqueClientIdArray => {
  const q = query(
    collection(db, 'client'),
    where('wrapper.uniqueClientId', 'in', uniqueClientIdArray)
  )

  const querySnapshot = await getDocs(q)

  const clients = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    clients.push(data)
  })

  if (clients.length === 0) {
    // No clients found with the specified uniqueClientIds
    // toast.error('No clients found');
  }

  return clients
}

export const getAllClient = async () => {
  const querySnapshot = await getDocs(collection(db, 'client'))
  return new Promise(resolve => {
    const clients = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      clients.push(data)
    })
    resolve(clients)
  }).then(clients => {
    return clients
  })
}

// export const updateClient = async (uuid, updateData) => {
//   try {
//     const clientDoc = await getClientPeruniqueClientId(uuid)
//     if (!clientDoc) {
//       throw new Error('No client found with the specified UUID')
//     }

//     let prevFormData = {}
//     if (clientDoc[0].wrapper && clientDoc[0].wrapper.formData) {
//       prevFormData = clientDoc[0].wrapper.formData
//     }
//     await updateDoc(doc(db, 'client', uuid), {
//       wrapper: {
//         ...(clientDoc[0].wrapper || {}),
//         formData: updateData,
//         // [new Date().toUTCString()]: prevFormData,
//         updatedOn: new Date().toLocaleDateString(),
//       },
//     })
//     return true
//     // toast.success('Data updated successfully!')
//   } catch (error) {
//     // toast.error('Something went wrong!' + error.message)
//   }
// }

export const updateClient = async (uuid, updateData) => {
  try {
    const clientDocRef = doc(db, 'client', uuid)
    const clientDocSnapshot = await getDoc(clientDocRef)

    if (!clientDocSnapshot.exists()) {
      throw new Error('No client found with the specified UUID')
    }

    const clientDocData = clientDocSnapshot.data()

    let prevFormData = {}
    if (clientDocData.wrapper && clientDocData.wrapper.formData) {
      prevFormData = clientDocData.wrapper.formData
    }

    await updateDoc(clientDocRef, {
      wrapper: {
        ...(clientDocData.wrapper || {}),
        formData: updateData,
        // [new Date().toUTCString()]: prevFormData,
        updatedOn: new Date().toLocaleDateString(),
      },
    })

    return true
    // toast.success('Data updated successfully!')
  } catch (error) {
    // toast.error('Something went wrong!' + error.message)
  }
}

export const getAllKpi = async () => {
  const querySnapshot = await getDocs(collection(db, 'kpi'))
  return new Promise(resolve => {
    const kpis = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      kpis.push(data)
    })
    resolve(kpis)
  }).then(kpis => {
    console.log(kpis, 'kpis test')
    return kpis
  })
}

export const addKpi = async (uuid, kpiInput) => {
  try {
    await setDoc(doc(db, 'kpi', uuid), {
      wrapper: kpiInput,
    })
    // toast.success('Data submitted successfully!')
    return true
  } catch (error) {
    toast.error('Something went wrong!')
  }
}

// export const getKpiPerUuid = async kpiuuid => {
//   const querySnapshot = await getDocs(collection(db, 'kpi'))
//   return new Promise(resolve => {
//     const kpis = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       kpis.push(data)
//     })
//     resolve(kpis)
//   }).then(kpis => {
//     const filteredKpi = kpis.filter(kpi => kpi.wrapper.kpiuuid === kpiuuid)
//     console.log(filteredKpi, 'filteredKpi test')
//     return filteredKpi
//   })
// }

export const getKpiPerUuid = async kpiuuid => {
  const q = query(
    collection(db, 'kpi'),
    where('wrapper.kpiuuid', '==', kpiuuid)
  )

  const querySnapshot = await getDocs(q)

  const kpis = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    kpis.push(data)
  })
  return kpis
}

// export const getKpiPerUser = async userName => {
//   const querySnapshot = await getDocs(collection(db, 'kpi'))
//   return new Promise(resolve => {
//     const kpis = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       kpis.push(data)
//     })
//     resolve(kpis)
//   }).then(kpis => {
//     const filteredKpi = kpis.filter(kpi => kpi.wrapper.executive === userName)
//     console.log(filteredKpi, 'filteredKpi test')
//     return filteredKpi
//   })
// }

export const getKpiPerUser = async userName => {
  const q = query(
    collection(db, 'kpi'),
    where('wrapper.executive', '==', userName)
  )

  const querySnapshot = await getDocs(q)

  const kpis = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    kpis.push(data)
  })

  return kpis
}

// export const updateKpi = async (uuid, updateData) => {
//   try {
//     const kpiDoc = await getKpiPerUuid(uuid)
//     if (!kpiDoc) {
//       throw new Error('No kpi found with the specified UUID')
//     }
//     await updateDoc(doc(db, 'kpi', uuid), {
//       wrapper: {
//         ...(kpiDoc[0].wrapper || {}),
//         complitedKpiService: updateData.complitedKpiService,
//         complitedKpiTotal: updateData.complitedKpiTotal,
//         updatedOn: new Date().toLocaleDateString(),
//       },
//     })
//     // toast.success('Data updated successfully!');
//   } catch (error) {
//     toast.error('Something went wrong!' + error.message)
//     console.log(error)
//   }
// }

export const updateKpi = async (uuid, updateData) => {
  // console.log(uuid, updateData, 'uuid, updateData')
  try {
    const kpiDocRef = doc(db, 'kpi', uuid)
    const kpiDocSnapshot = await getDoc(kpiDocRef)

    if (!kpiDocSnapshot.exists()) {
      throw new Error('No kpi found with the specified UUID')
    }

    const kpiDocData = kpiDocSnapshot.data()

    await updateDoc(kpiDocRef, {
      wrapper: {
        ...(kpiDocData.wrapper || {}),
        complitedKpiService: updateData.complitedKpiService,
        complitedKpiTotal: updateData.complitedKpiTotal,
        updatedOn: new Date().toLocaleDateString(),
      },
    })

    // toast.success('Data updated successfully!');
  } catch (error) {
    toast.error('Something went wrong!' + error.message)
    console.log(error)
  }
}

export const updateKpiAssign = async (uuid, updateData) => {
  try {
    const kpiDoc = await getKpiPerUuid(uuid)
    if (!kpiDoc) {
      throw new Error('No kpi found with the specified UUID')
    }
    await updateDoc(doc(db, 'kpi', uuid), {
      wrapper: {
        ...(kpiDoc[0].wrapper || {}),
        kpiCount: updateData.kpiCount,
        dayCount: updateData.dayCount,
        updatedOn: new Date().toLocaleDateString(),
      },
    })
    toast.success('Data updated successfully!')
  } catch (error) {
    toast.error('Something went wrong!' + error.message)
    console.log(error)
  }
}

export const deleteKpi = async uuid => {
  try {
    const kpiDoc = await getKpiPerUuid(uuid)
    if (!kpiDoc) {
      throw new Error('No kpi found with the specified UUID')
    }
    await deleteDoc(doc(db, 'kpi', uuid))
    toast.success('Data deleted successfully!')
  } catch (error) {
    toast.error('Something went wrong!' + error.message)
    console.log(error)
  }
}

export const queryKpi = async (uuid, kpiInput) => {
  try {
    await setDoc(doc(db, 'queryKpi', uuid), {
      wrapper: kpiInput,
    })
    // toast.success('Data submitted successfully!')
    return true
  } catch (error) {
    toast.error(`Something went wrong!`)
    console.log(error)
  }
}

export const allQueryKpi = async () => {
  const querySnapshot = await getDocs(collection(db, 'queryKpi'))
  return new Promise(resolve => {
    const kpis = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      kpis.push(data)
    })
    resolve(kpis)
  }).then(kpis => {
    return kpis
  })
}

// export const getQueryKpiPerUuid = async kpiuuid => {
//   const querySnapshot = await getDocs(collection(db, 'queryKpi'))
//   return new Promise(resolve => {
//     const kpis = []
//     querySnapshot.forEach(doc => {
//       const data = doc.data()
//       kpis.push(data)
//     })
//     resolve(kpis)
//   }).then(kpis => {
//     const filteredKpi = kpis.find(kpi => kpi.wrapper.uniqueClientId === kpiuuid)
//     console.log(filteredKpi, 'filteredKpi test')
//     return filteredKpi
//   })
// }

export const getQueryKpiPerUuid = async kpiuuid => {
  const q = query(
    collection(db, 'queryKpi'),
    where('wrapper.uniqueClientId', '==', kpiuuid)
  )

  const querySnapshot = await getDocs(q)

  const kpis = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    kpis.push(data)
  })

  if (kpis.length === 0) {
    // No query KPI found with the specified kpiuuid
    // toast.error('No query KPI found');
  }

  return kpis[0]
}

export const updateQueryKpi = async (uuid, updateData) => {
  try {
    const kpiDoc = await getQueryKpiPerUuid(uuid)
    if (!kpiDoc) {
      throw new Error('No kpi found with the specified UUID')
    }
    await updateDoc(doc(db, 'queryKpi', uuid), {
      wrapper: updateData,
    })
    // toast.success('Data updated successfully!');
  } catch (error) {
    // toast.error('Something went wrong!' + error.message);
    // console.log(error);
  }
}

export const addCompletedKpi = async (uuid, kpiInput) => {
  try {
    await setDoc(doc(db, 'completedKpi', uuid), {
      wrapper: kpiInput,
    })
    toast.success('Data submitted successfully!')
  } catch (error) {
    toast.error('Something went wrong!')
  }
}

export const getAllCompletedKpi = async () => {
  const querySnapshot = await getDocs(collection(db, 'completedKpi'))
  return new Promise(resolve => {
    const kpis = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      kpis.push(data)
    })
    resolve(kpis)
  }).then(kpis => {
    return kpis
  })
}

export const deleteClient = async uidArray => {
  // console.log(uidArray, 'uidArray') // '0811231723EXE1TMC6', '0811231722EXE1TMC5', '0811231727EXE1TMC7', '0811231742EXE1TKI', '1111231237EXE1TS'], 'uidArray')
  try {
    if (!uidArray.length) {
      throw new Error('No client selected for deleting!')
    }
    for (const uid of uidArray) {
      // console.log('Processing UID:', uid)

      const clientDocRef = doc(db, 'client', uid)
      const queryKpiDocRef = doc(db, 'queryKpi', uid)
      const receiptDocRef = doc(db, 'receipt', uid)

      const clientDocSnap = await getDoc(clientDocRef)
      const queryKpiDocSnap = await getDoc(queryKpiDocRef)
      const receiptDocSnap = await getDoc(receiptDocRef)

      // Delete the client
      if (clientDocSnap.exists()) {
        await deleteDoc(clientDocRef)
        // console.log('Deleted client with uid:', uid)
      } else {
        // throw new Error(`No client found with the specified uid: ${uid}`)
      }

      // Delete the queryKpi
      if (queryKpiDocSnap.exists()) {
        await deleteDoc(queryKpiDocRef)
        // console.log('Deleted queryKpi with uid:', uid)
      } else {
        // throw new Error(`No queryKpi found with the specified uid: ${uid}`)
      }

      // Delete the receipt
      if (receiptDocSnap.exists()) {
        await deleteDoc(receiptDocRef)
        // console.log('Deleted receipt with uid:', uid)
      } else {
        // throw new Error(`No receipt found with the specified uid: ${uid}`)
      }

      // Delete the kpi
      const allKpi = await getAllKpi()

      let minusFromCompletedKpiTotal = 0

      if (allKpi && allKpi.length > 0) {
        await Promise.all(
          allKpi.map(async kpi => {
            if (
              kpi.wrapper &&
              kpi.wrapper.complitedKpiService &&
              Array.isArray(kpi.wrapper.complitedKpiService)
            ) {
              await Promise.all(
                kpi.wrapper.complitedKpiService?.map(async (service, index) => {
                  if (service.uniqueClientId === uid) {
                    minusFromCompletedKpiTotal += parseInt(
                      service.service.segmentValue
                    )

                    const updatedComplitedKpiService =
                      kpi.wrapper.complitedKpiService?.filter(
                        (_, i) => i !== index
                      )
                    await updateDoc(doc(db, 'kpi', kpi.wrapper.kpiuuid), {
                      wrapper: {
                        ...(kpi.wrapper || {}),
                        complitedKpiTotal:
                          Number(kpi.wrapper.complitedKpiTotal) -
                          Number(minusFromCompletedKpiTotal),
                        complitedKpiService: updatedComplitedKpiService,
                      },
                    })
                  }
                })
              )
            }
          })
        )
      }
    }
    toast.success('Data deleted successfully!', { id: 'deleteClient' })
  } catch (error) {
    // console.log(error)
    // toast.error(error.message)
  }
}

export const getReceiptByUuid = async uuid => {
  const querySnapshot = await getDocs(collection(db, 'receipt'))
  const receipts = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    receipts.push(data)
  })
  const filteredReceipt = receipts.filter(receipt =>
    Object.keys(receipt.wrapper).some(
      key => receipt.wrapper[key][0]?.clientId === uuid
    )
  )
  return filteredReceipt[0]
}

export const createReceipt = async (uuid, receiptId, receiptInput) => {
  // Firstly check if the receiptId already exists with the specified uuid
  // If exists, then keep the previous receipt and add the new receipt
  // If not exists, then create a new receipt with the specified receiptId

  try {
    const receiptDocRef = doc(db, 'receipt', uuid)
    const receiptDocSnap = await getDoc(receiptDocRef)

    if (receiptDocSnap.exists()) {
      const existingReceipt = receiptDocSnap.data()
      const updatedReceipt = {
        ...existingReceipt.wrapper,
        [receiptId]: receiptInput,
      }
      await updateDoc(doc(db, 'receipt', uuid), {
        wrapper: updatedReceipt,
      })
    } else {
      await setDoc(doc(db, 'receipt', uuid), {
        wrapper: {
          [receiptId]: receiptInput,
        },
      })
    }
    // toast.success('Data submitted successfully!')
  } catch (error) {
    toast.error('Something went wrong!')
  }
}

export const getTheLatestReceipt = async uuid => {
  const clientReceipts = await getReceiptByUuid(uuid)
  if (!clientReceipts) {
    // toast.error('No receipt found!')
    return null
  }

  let latestReceiptArray = null
  let latestCreatedOn = null

  Object.keys(clientReceipts.wrapper).forEach(key => {
    const receipts = clientReceipts.wrapper[key]

    receipts.forEach(receipt => {
      const currentCreatedOn = new Date(receipt.createdOn)

      if (!latestReceiptArray || currentCreatedOn > latestCreatedOn) {
        latestReceiptArray = receipts
        latestCreatedOn = currentCreatedOn
      }
    })
  })

  return latestReceiptArray
}
