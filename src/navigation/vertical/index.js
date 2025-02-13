// ** Icon imports
import Login from 'mdi-material-ui/Login'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import {
  AccountMultipleOutline,
  Calculator,
  ChartTimeline,
  ClipboardListOutline,
  TextAccount,
} from 'mdi-material-ui'
import AddchartIcon from '@mui/icons-material/Addchart'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import { useRouter } from 'next/router'

const navigation = () => {
  const router = useRouter()
  const user =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('cura_user')
      : false
  const userRole = user ? JSON.parse(user).role : false
  const uuid = user ? JSON.parse(user).uuid : false

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  const adminArray = [
    {
      sectionTitle: 'KPI',
    },
    {
      title: 'KPI Overview',
      icon: AddchartIcon,
      path: '/kpi',
      openInNewTab: false,
    },
    {
      title: 'KPI Details',
      icon: DisplaySettingsIcon,
      path: '/details/[kpiUUID]',
      openInNewTab: false,
    },
    {
      title: 'KPI List',
      icon: ClipboardListOutline,
      path: '/kpi-list',
      openInNewTab: false,
    },
    {
      sectionTitle: 'LEAD',
    },
    {
      title: 'Lead Records',
      icon: ClipboardListOutline,
      path: '/leadrecords',
      openInNewTab: false,
    },
    {
      sectionTitle: 'CLIENT',
    },
    {
      title: 'Client List',
      icon: AccountMultipleOutline,
      path: '/clientlist',
      openInNewTab: false,
    },
    // {
    //   title: 'Client Information',
    //   icon: TextAccount,
    //   path: '/addclient',
    //   openInNewTab: false,
    // },
    {
      sectionTitle: 'TIMELINE',
    },
    {
      title: 'Timeline',
      icon: ChartTimeline,
      path: '/gantt',
      openInNewTab: false,
    },
    {
      sectionTitle: 'ACCOUNTS',
    },
    {
      title: 'Current Accounts',
      icon: Calculator,
      path: '/currentaccounts',
      openInNewTab: false,
    },
    {
      title: 'Accounts Records',
      icon: ClipboardListOutline,
      path: '/accountsrecords',
      openInNewTab: false,
    },
    {
      sectionTitle: 'ANALYTICS',
    },
    {
      title: 'Analytics',
      icon: AddchartIcon,
      path: '/analytics',
      openInNewTab: false,
    },

    {
      title: 'Log Out',
      icon: Login,
      path: '/login',
      openInNewTab: false,
    },
  ]

  const supervisorArray = [
    {
      sectionTitle: 'Tourism CRM',
    },
    {
      title: 'Lead Assign',
      icon: AccountPlusOutline,
      path: '/onboardingalt',
      openInNewTab: false,
    },
    {
      title: 'Lead Records',
      icon: ClipboardListOutline,
      path: '/leadrecords',
      openInNewTab: false,
    },
    {
      title: 'Client List',
      icon: AccountMultipleOutline,
      path: '/clientlist',
      openInNewTab: false,
    },
    {
      title: 'Timeline',
      icon: ChartTimeline,
      path: '/gantt',
      openInNewTab: false,
    },
    {
      title: 'KPI Overview',
      icon: AddchartIcon,
      path: '/kpi',
      openInNewTab: false,
    },
    {
      title: 'KPI List',
      icon: ClipboardListOutline,
      path: '/kpi-list',
      openInNewTab: false,
    },
    {
      title: 'KPI Details',
      icon: DisplaySettingsIcon,
      path: '/details/[kpiUUID]',
      openInNewTab: false,
    },

    {
      title: 'Log Out',
      icon: Login,
      path: '/login',
      openInNewTab: false,
    },
  ]

  const executiveArray = [
    {
      sectionTitle: 'Tourism CRM',
    },
    {
      title: 'Lead Status',
      icon: ClipboardListOutline,
      path: '/lead',
      openInNewTab: false,
    },
    {
      title: 'Lead Records',
      icon: ClipboardListOutline,
      path: '/leadrecords',
      openInNewTab: false,
    },
    // {
    //   title: 'Client Information',
    //   icon: TextAccount,
    //   path: '/addclient',
    //   openInNewTab: false,
    // },
    {
      title: 'Client List',
      icon: AccountMultipleOutline,
      path: '/clientlist',
      openInNewTab: false,
    },
    {
      title: 'Timeline',
      icon: ChartTimeline,
      path: '/gantt',
      openInNewTab: false,
    },
    {
      title: 'KPI',
      icon: ClipboardListOutline,
      path: '/kpi',
      openInNewTab: false,
    },
    {
      title: 'KPI Details',
      icon: ClipboardListOutline,
      path: '/details/[kpiUUID]',
      openInNewTab: false,
    },

    {
      title: 'Log Out',
      icon: Login,
      path: '/login',
      openInNewTab: false,
    },
  ]

  const accountArray = [
    {
      sectionTitle: 'Tourism CRM',
    },

    // {
    //   title: 'Client Information',
    //   icon: TextAccount,
    //   path: '/addclient',
    //   openInNewTab: false,
    // },
    {
      title: 'Client List',
      icon: AccountMultipleOutline,
      path: '/clientlist',
      openInNewTab: false,
    },
    {
      title: 'Current Accounts',
      icon: Calculator,
      path: '/currentaccounts',
      openInNewTab: false,
    },
    {
      title: 'Accounts Records',
      icon: ClipboardListOutline,
      path: '/accountsrecords',
      openInNewTab: false,
    },
    {
      title: 'Log Out',
      icon: Login,
      path: '/login',
      openInNewTab: false,
    },
  ]

  const renderArray =
    userRole === 'admin'
      ? adminArray
      : userRole === 'supervisor'
      ? supervisorArray
      : userRole === 'executive'
      ? executiveArray
      : userRole === 'accountant'
      ? accountArray
      : []

  return renderArray
}

export default navigation
