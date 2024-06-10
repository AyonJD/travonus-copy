import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Loader from 'src/@core/components/loader'
import { getTheLatestReceipt } from 'src/Utils/func'
import PrintableReceipt from 'src/@core/components/tables/PrintableReceipt'

const clientID = () => {
  const [clientId, setClientId] = useState('')
  const [loading, setLoading] = useState(true)
  const [receiptData, setReceiptData] = useState([])
  const [addedData, setAddedData] = useState([])
  const router = useRouter()
  const [orgData, setOrgData] = useState('')

  // const serviceFromStorage = typeof window !== "undefined" ? window.localStorage.getItem('serviceFromStorage') : false

  //--------------------> Get clientID from URL <---------------
  useEffect(() => {
    const pathname = router.asPath
    const clientId = pathname.split('/')[2]
    setClientId(clientId)
    const manualData = router.query.receiptData
    const org = router.query.manualData

    if (manualData) {
      const receiptData = JSON.parse(decodeURIComponent(manualData))
      setAddedData(receiptData)
    }

    if (org) {
      const parsedTerms = JSON.parse(decodeURIComponent(org))
      setOrgData(parsedTerms)
    }

    setLoading(false)
  }, [router])

  /* This `useEffect` hook is fetching client data from the server based on the `clientId` state
    variable. It sets the `loading` state to `true` initially, then calls an asynchronous function
    `fetchData` which checks if the `clientId` is not equal to the string '[clientID]'. If it is
    not, it calls the `getClientPeruniqueClientId` function with the `clientId` as an argument to
    fetch the client data from the server. Once the data is fetched, it sets the `clientData` state
    variable to the first element of the returned array and sets the `loading` state to `false`.
    This `useEffect` hook is triggered whenever the `clientId` state variable changes. */
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      if (clientId === '[clientID]') return
      const receipt = await getTheLatestReceipt(clientId)
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.close()
        }
      }, 2000)
      setReceiptData(receipt)
      setLoading(false)
    }

    fetchData()
  }, [clientId])

  if (loading) return <Loader />
  if (!receiptData || receiptData.length === 0)
    return <h1>No Receipt found. Please get one</h1>

  return (
    <>
      <PrintableReceipt
        receiptData={receiptData}
        addedData={addedData}
        orgData={orgData}
      />
    </>
  )
}

export default clientID
