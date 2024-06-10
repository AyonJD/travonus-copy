import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import PrintableTable from 'src/@core/components/tables/PrintableTable'
import Loader from 'src/@core/components/loader'
import { getClientPeruniqueClientId } from 'src/Utils/func'

const clientID = () => {
  const [clientId, setClientId] = useState('')
  const [loading, setLoading] = useState(true)
  const [clientData, setClientData] = useState([])
  const [manualFields, setManualFields] = useState({})
  const router = useRouter()

  //--------------------> Get clientID from URL <---------------
  useEffect(() => {
    const pathname = router.asPath
    const clientId = pathname.split('/')[2]
    setClientId(clientId)

    const query = router.query.invoicetData

    if (query) {
      const invoicetData = JSON.parse(decodeURIComponent(query))
      setManualFields(invoicetData)
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
      const client = await getClientPeruniqueClientId(clientId)
     
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.close()
        }
      }, 2000)
      setClientData(client[0])
      setLoading(false)
    }

    fetchData()
  }, [clientId])

  if (loading) return <Loader />

  return (
    <>
      <PrintableTable clientData={clientData} manualFields={manualFields} />
    </>
  )
}

export default clientID
