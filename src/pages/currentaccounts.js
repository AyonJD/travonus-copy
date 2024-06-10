import UserCard from 'src/@core/components/userCard/UserCard'
import AccountsCard from './accountscard'
import AccountsTable from './accuontstable'
import { getAllClient, loadStorage } from 'src/Utils/func'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CurrentAccounts = () => {
  const user = loadStorage('cura_user')
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [date, setDate] = useState(new Date())
  const [allClient, setAllClient] = useState([])
  const [filterAccount, setFilterAccount] = useState([])

  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const [monthYear, setMonthYear] = useState(`${month} ${year}`)

  useEffect(() => {
    setMonthYear(`${month} ${year}`)
  }, [month, year, date])

  useEffect(async () => {
    const allClientData = await getAllClient()
    setAllClient(allClientData)
  }, [])

  const filterByMonth = async account => {
    if (account.length > 0) {
      const filteredAccount = account.filter(acc => {
        const leadMonthYear = new Date(
          acc.wrapper.createdOn
        ).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })

        return leadMonthYear === monthYear
      })
      setFilterAccount(filteredAccount)
    }
  }

  useEffect(() => {
    filterByMonth(allClient)
  }, [monthYear, allClient])

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  // ---------For pagination
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const slicedData = filterAccount.slice(startIndex, endIndex)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // ---------For pagination

  const multiSearch = (acc, searchTerm) => {
    if (acc.length > 0) {
      return acc.filter(i => {
        return Object.values(i.wrapper.formData).some(val => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }
  }

  const handleSearch = () => {
    if (!searchText || searchText === '') {
      setFilterAccount(allClient)
    } else {
      const results = multiSearch(allClient, searchText)
      setFilterAccount(results)
    }
  }
  return (
    <>
      {/* {user?.role !== 'admin' && (
        <>
          {' '}
          <UserCard /> <br />
        </>
      )} */}
      <AccountsCard monthYear={monthYear} filterAccount={filterAccount} />
      <br></br>
      <AccountsTable
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        date={date}
        setDate={setDate}
        slicedData={slicedData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        filterAccount={filterAccount}
        startIndex={startIndex}
      />
    </>
  )
}

export default CurrentAccounts
