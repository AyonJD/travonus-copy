// ** React Imports
import { useEffect, useState } from 'react'
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { TextareaAutosize } from '@mui/base'
import Swal from 'sweetalert2'

// ** Third Party Imports
import toast, { Toaster } from 'react-hot-toast'

// ** Icons Imports
import Box from '@mui/material/Box'
import Popup from './Popup/Popup'
import {
  addClient,
  loadStorage,
  getAllKpi,
  queryKpi,
  updateClient,
  getLeadPerUuid,
  getQueryKpiPerUuid,
  updateQueryKpi,
  getClientPeruniqueClientId,
  returnTotal,
  handleMakeId,
  createReceipt,
  generateUniqueChar,
  getTheLatestReceipt,
} from 'src/Utils/func'
import fileUploader from 'src/FileUploader/fileUploader'
import { useRouter } from 'next/router'
import LeadDetailsPopup from './Popup/LeadDetailsPopup'

// Images
import {
  visaIcon,
  ticketingIcon,
  hotelIcon,
  airAmbulanceIcon,
  airportMeetIcon,
  doctorSelectionIcon,
  guideManageIcon,
  healthInsuranceIcon,
  hospitalSelectionIcon,
  languageIcon,
  localTransportIcon,
  telemedicineIcon,
  dateOptions,
} from 'src/Utils/Utils'
import ServiceHeader from 'src/@core/components/service_header/ServiceHeader'
import { calculatePassportExpiryDate } from 'src/Utils/calculationFunctions'
import { CircularProgress } from '@mui/material'
import SpinnerPopup from './Popup/SpinnerPopup'

const AddClient = () => {
  const router = useRouter()
  const [kpiToUpdate, setKpiToUpdate] = React.useState({})
  const [lead, setLead] = useState({})
  const [opdFollowup, setOpdFollowup] = useState([])
  const [ipdFollowup, setIpdFollowup] = useState([])
  const [newFollowup, setNewFollowup] = useState('')
  const [newFollowupIpd, setNewFollowupIpd] = useState('')
  const user = loadStorage('cura_user')
  const leaduuid = loadStorage('cura_navigate')
  const [openPopup, setOpenPopup] = useState(false)
  const [leadPopup, setLeadPopup] = useState(leaduuid ? true : false)
  const [uniqueClientId, setUniqueClientId] = useState('')
  const [queryKpiFromDb, setQueryKpiKpiFromDb] = useState({})
  const [isSpinner, setIsSpinner] = useState(false)

  const [visa, setVisa] = React.useState(false)
  const [reservation, setReservation] = React.useState(false)
  const [insurance, setInsurance] = React.useState(false)
  const [hotel, setHotel] = React.useState(false)
  const [transport, setTransport] = React.useState(false)
  const [airportMeet, setAirportMeet] = React.useState(false)
  const [airAmbulance, setAirAmbulance] = React.useState(false)
  const [doctorOPD, setDoctorOPD] = React.useState(false)
  const [doctorIPD, setDoctorIPD] = React.useState(false)
  const [telemedicine, setTelemedicine] = React.useState(false)
  const [treatmentPlan, setTreatmentPlan] = React.useState(false)
  const [interpreter, setInterpreter] = React.useState(false)
  const [excursion, setExcursion] = React.useState(false)

  //--------------> Multi Form Variables <------------------
  const [firstForm, setFirstForm] = useState(true)
  const [secondForm, setSecondForm] = useState(false)
  const [thirdForm, setThirdForm] = useState(false)

  //-----------------> All inpute variables <-----------------
  const [kpiCount, setKpiCount] = useState({
    // Segment Complete Information

    // ------------> VISA
    visaSegment: 0, // max 100%

    // ------------> Reservation Ticketing
    reservationSegment: 0, // max 100%

    // -----------> Hotel
    hotelSegment: 0, // max 100%

    // ------------> Health Insurance
    insuranceSegment: 0, // max 100%

    // -------------> Local Transport
    transportSegment: 0, // max 100%

    // -------------> Airport Meet & Greet
    airportMeetSegment: 0, // max 80%

    // -------------> Air Ambulance
    airAmbulanceSegment: 0, // max 90%

    // -------------> Doctor OPD
    doctorOPDSegment: 0, // max 60%

    // -------------> Doctor IPD
    doctorIPDSegment: 0, // max 60%

    // -------------> Telemedicine
    telemedicineSegment: 0, // max 100%

    // -------------> Treatment Plan
    treatmentPlanSegment: 0, // max 60%

    // -------------> Execusion
    excursionSegment: 0, // max 100%
  })
  const [input, setInput] = useState({
    serviceArr: [],
    // Taken service
    visa: false,
    reservation: false,
    insurance: false,
    hotel: false,
    transport: false,
    airportMeet: false,
    airAmbulance: false,
    doctorOPD: false,
    doctorIPD: false,
    telemedicine: false,
    treatmentPlan: false,
    interpreter: false,
    excursion: false,

    // Basic Information
    clientName: '',
    contactNumber: '',
    whatsappNumber: '',
    email: '',
    address: '',

    // Passport Information
    passportNumber: '',
    dateOfBirth: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportImage: '',

    // Account Information
    totalPayment: 0,
    totalPaid: 0,
    currentlyDue: 0,

    // Comment
    comment: '',

    // Visa Information
    visaDocumentCollected: false,
    visaRequestForVisa: false,
    visaCollectionOfPassport: false,
    visaIssueDate: '',
    visaExpiryDate: '',

    // Visa Payment
    visaPaymentAmount: 0,
    visapaidAmount: 0,
    visaDueAmount: 0,
    visapaidToSupplier: 0,
    visaProfitOrLoss: 0,
    visaRemarksOrRequirement: '',
    visaInvoiceComment: '',
    visaInvoice: '',
    visaMoneyReceipt: '',

    // Reservation Ticketing Information
    reservationBookingDate: '', // reservation ? new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
    reservationIsReturnDate: false,
    reservationTravelDate: '',
    reservationReturnDateOrOneWay: '',
    reservationTicketingTimeLimit: 0,
    reservationIssuingDate: '',
    reservationReSchedule: '',
    reservationTicketDocument: '',
    reservationReScheduleDate: '',
    reservationReIssueDate: '',
    reservationReIssueTicketDocument: '',
    reservationRctivationAxularyService: false,
    reservationSelectedAxularyServices: [],

    // Reservation Payment
    reservationPaymentAmount: 0,
    reservationpaidAmount: 0,
    reservationDueAmount: 0,
    reservationpaidToSupplier: 0,
    reservationProfitOrLoss: 0,
    reservationRemarksOrRequirement: '',
    reservationInvoiceComment: '',
    reservationInvoice: '',
    reservationMoneyReceipt: '',

    // Health Insurance Information
    healthInsuranceAddress: '',
    healthInsuranceContactNumber: '',
    healthInsuranceIssueDate: '',
    healthInsuranceIssueDateDocument: '',
    healthInsuranceNumberIfDaysCovered: 0,
    healthInsuranceExpiryDate: '',

    // Health Insurance Payment
    healthInsurancePaymentAmount: 0,
    healthInsurancepaidAmount: 0,
    healthInsuranceDueAmount: 0,
    healthInsurancepaidToSupplier: 0,
    healthInsuranceProfitOrLoss: 0,
    healthInsuranceRemarksOrRequirement: '',
    healthInsuranceInvoiceComment: '',
    healthInsuranceInvoice: '',
    healthInsuranceMoneyReceipt: '',

    // Hotel Information
    hotelName: '',
    hotelPhoneOrEmail: '',
    hotelCheckInDate: '',
    hotelCheckInDateDocument: '',
    hotelCheckInDateDocumentUploadOn: '',
    hotelCheckOutDate: '',
    hotelNumberOfAdultsOrChildren: 0,
    hotelNumberOfRooms: 0,

    // Hotel Payment
    hotelPaymentAmount: 0,
    hotelpaidAmount: 0,
    hotelDueAmount: 0,
    hotelpaidToSupplier: 0,
    hotelProfitOrLoss: 0,
    hotelRemarksOrRequirement: '',
    hotelInvoiceComment: '',
    hotelInvoice: '',
    hotelMoneyReceipt: '',

    // Local Transport Information
    localTransportLocation: '',
    localTransportDate: '',
    localTransportTime: '',

    // Local Transport Payment
    localTransportPaymentAmount: 0,
    localTransportpaidAmount: 0,
    localTransportDueAmount: 0,
    localTransportpaidToSupplier: 0,
    localTransportProfitOrLoss: 0,
    localTransportRemarksOrRequirement: '',
    localTransportInvoiceComment: '',
    localTransportInvoice: '',
    localTransportMoneyReceipt: '',

    // Airport meet and greet
    airportTicket: '',
    airportRegularPicture: false,

    // Airport meet and greet payment
    airportPaymentAmount: 0,
    airportpaidAmount: 0,
    airportDueAmount: 0,
    airportpaidToSupplier: 0,
    airportProfitOrLoss: 0,
    airportRemarksOrRequirement: '',
    airportInvoiceComment: '',
    airportInvoice: '',
    airportMoneyReceipt: '',

    // Airambulance
    airAmbulanceMedicalDocument: '',
    airAmbulanceMedicalConditionDetails: '',
    airAmbulanceNumberOfAttendance: 0,
    airAmbulanceActivationOfVisa: false,
    airAmbulanceActivationOfTicket: false,

    // Airambulance Payment
    airAmbulancePaymentAmount: 0,
    airAmbulancepaidAmount: 0,
    airAmbulanceDueAmount: 0,
    airAmbulancepaidToSupplier: 0,
    airAmbulanceProfitOrLoss: 0,
    airAmbulanceRemarksOrRequirement: '',
    airAmbulanceInvoiceComment: '',
    airAmbulanceInvoice: '',
    airAmbulanceMoneyReceipt: '',

    // Doctor Appointment OPD
    opdLatestMedicalDocument: '',
    opdAppointmentForm: '',
    opdDraftPrepared: false,
    opdMailSentToHospital: false,
    opdReplyFromHospital: false,
    opdBriefToTeam: false,
    opdDeliveredToPatient: false,
    opdDate: '',
    opdReturnDateFromHospital: '',
    opdFollowupData: [],

    // Doctor Appointment OPD Payment
    opdPaymentAmount: 0,
    opdpaidAmount: 0,
    opdDueAmount: 0,
    opdpaidToSupplier: 0,
    opdProfitOrLoss: 0,
    opdRemarksOrRequirement: '',
    opdInvoiceComment: '',
    opdInvoice: '',
    opdMoneyReceipt: '',

    // Doctor Appointment IPD
    ipdLatestMedicalDocument: '',
    ipdAppointmentForm: '',
    ipdDraftPrepared: false,
    ipdMailSentToHospital: false,
    ipdReplyFromHospital: false,
    ipdBriefToTeam: false,
    ipdDeliveredToPatient: false,
    ipdDate: '',
    ipdReturnDateFromHospital: '',
    ipdFollowupData: [],

    // Doctor Appointment IPD Payment
    ipdPaymentAmount: 0,
    ipdpaidAmount: 0,
    ipdDueAmount: 0,
    ipdpaidToSupplier: 0,
    ipdProfitOrLoss: 0,
    ipdRemarksOrRequirement: '',
    ipdInvoiceComment: '',
    ipdInvoice: '',
    ipdMoneyReceipt: '',

    // Telimedeicine
    telimedeicineLatestMedicalDocument: '',
    telimedeicineAppointmentForm: '',
    telimedeicineDraftPrepared: false,
    telimedeicineMailSentToHospital: false,
    telimedeicineReplyFromHospital: false,
    telimedeicineBriefToTeam: false,
    telimedeicineDeliveredToPatient: false,
    telimedeicineDate: '',

    // Telimedeicine Payment
    telimedeicinePaymentAmount: 0,
    telimedeicinepaidAmount: 0,
    telimedeicineDueAmount: 0,
    telimedeicinepaidToSupplier: 0,
    telimedeicineProfitOrLoss: 0,
    telimedeicineRemarksOrRequirement: '',
    telimedicineInvoiceComment: '',
    telimedeicineInvoice: '',
    telimedeicineMoneyReceipt: '',

    // Treatment Plan
    treatmentPlanLatestMedicalDocument: '',
    treatmentPlanDraftPrepared: false,
    treatmentPlanMailSentToHospital: false,
    treatmentPlanReplyFromHospital: false,
    treatmentPlanBriefToTeam: false,
    treatmentPlanDeliveredToPatient: false,
    treatmentPlanExicutedDate: '',

    // Treatment Plan Payment
    treatmentPlanPaymentAmount: 0,
    treatmentPlanpaidAmount: 0,
    treatmentPlanDueAmount: 0,
    treatmentPlanpaidToSupplier: 0,
    treatmentPlanProfitOrLoss: 0,
    treatmentPlanRemarksOrRequirement: '',
    treatmentPlanInvoiceComment: '',
    treatmentPlanInvoice: '',
    treatmentPlanMoneyReceipt: '',

    // Exicution Plan
    excursionScanedPassport: '',
    excursionPhotograph: '',
    excursionThiVisaExpireDate: '',
    excursionThiVisaExpireDateDocument: '',
    excursionEliteVisaOrStamp: false,
    excursionMarriageCertificate: '',
    excursionBirthCertificate: '',
    excursionPresentAddress: '',
    excursionPermanentAddress: '',
    excursionEmail: '',
    excursionPhone: '',
    excursionOccupation: '',
    excursionBusinessName: '',
    excursionConfirmationLetterFromThiland: '',

    // Exicution Plan Payment
    excursionPaymentAmount: 0,
    excursionpaidAmount: 0,
    excursionDueAmount: 0,
    excursionpaidToSupplier: 0,
    excursionProfitOrLoss: 0,
    excursionRemarksOrRequirement: '',
    excursionInvoiceComment: '',
    excursionInvoice: '',
    excursionMoneyReceipt: '',
  })
  const [receiptServices, setReceiptServices] = useState([])

  //-------------------> Service taken by the executive <-------------------
  const [takenServiceState, setTakenServiceState] = useState([
    {
      clientName: input.clientName,
      willRender: false,
      visa: false,
      queryName: 'visa',
      kpiCount,
      service: { name: 'Visa', serviceIcon: visaIcon, segmentValue: 100 },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      reservation: false,
      queryName: 'reservation',
      kpiCount,
      service: {
        name: 'Reservation',
        serviceIcon: ticketingIcon,
        segmentValue: 100,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      insurance: false,
      queryName: 'insurance',
      kpiCount,
      service: {
        name: 'Health Insurance',
        serviceIcon: healthInsuranceIcon,
        segmentValue: 100,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      hotel: false,
      queryName: 'hotel',
      kpiCount,
      service: { name: 'Hotel', serviceIcon: hotelIcon, segmentValue: 85 },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      transport: false,
      queryName: 'transport',
      kpiCount,
      service: {
        name: 'Local Transport',
        serviceIcon: localTransportIcon,
        segmentValue: 100,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      airportMeet: false,
      queryName: 'airportMeet',
      kpiCount,
      service: {
        name: 'Airport Meet & Greet',
        serviceIcon: airportMeetIcon,
        segmentValue: 80,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      airAmbulance: false,
      queryName: 'airAmbulance',
      kpiCount,
      service: {
        name: 'Air Ambulance',
        serviceIcon: airAmbulanceIcon,
        segmentValue: 90,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      doctorOPD: false,
      queryName: 'doctorOPD',
      kpiCount,
      service: {
        name: 'OPD',
        serviceIcon: doctorSelectionIcon,
        segmentValue: 60,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      doctorIPD: false,
      queryName: 'doctorIPD',
      kpiCount,
      service: {
        name: 'IPD',
        serviceIcon: doctorSelectionIcon,
        segmentValue: 60,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      telemedicine: false,
      queryName: 'telemedicine',
      kpiCount,
      service: {
        name: 'Telemedicine',
        serviceIcon: telemedicineIcon,
        segmentValue: 100,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      treatmentPlan: false,
      queryName: 'treatmentPlan',
      kpiCount,
      service: {
        name: 'Treatment Plan',
        serviceIcon: hospitalSelectionIcon,
        segmentValue: 60,
      },
      user: user,
    },
    {
      clientName: input.clientName,
      willRender: false,
      excursion: false,
      queryName: 'excursion',
      kpiCount,
      service: {
        name: 'Execusion',
        serviceIcon: guideManageIcon,
        segmentValue: 100,
      },
      user: user,
    },
  ])

  // ------------------> Restrict admin to interact with this page <------------------
  useEffect(() => {
    if (user.role === 'admin') {
      const formElements = document.querySelectorAll('input, textarea, select')
      formElements.forEach(element => {
        element.disabled = true
      })
    }
  }, [])

  //--------------------> Read the Data from database <--------------------
  useEffect(async () => {
    const kpiArray = await getAllKpi()

    const kpiToUpdate = await kpiArray.find(
      obj =>
        obj.wrapper.executive.toLowerCase().trim() ===
        user.name.toLowerCase().trim()
    )
    setKpiToUpdate(kpiToUpdate)
    const queryKpi = await getQueryKpiPerUuid(kpiToUpdate?.wrapper?.kpiuuid)
    if (queryKpi) {
      const takenService = await queryKpi?.wrapper?.takenService
      setQueryKpiKpiFromDb(queryKpi)

      setTakenServiceState([
        {
          clientName: takenService[0]?.clientName,
          willRender: takenService[0]?.willRender,
          visa: takenService[0]?.visa,
          queryName: 'visa',
          kpiCount: takenService[0]?.kpiCount,
          service: { name: 'Visa', serviceIcon: visaIcon, segmentValue: 100 },
          user: user,
        },
        {
          clientName: takenService[1]?.clientName,
          willRender: takenService[1]?.willRender,
          reservation: takenService[1]?.reservation,
          queryName: 'reservation',
          kpiCount: takenService[1]?.kpiCount,
          service: {
            name: 'Reservation',
            serviceIcon: ticketingIcon,
            segmentValue: 100,
          },
          user: user,
        },
        {
          clientName: takenService[2]?.clientName,
          willRender: takenService[2]?.willRender,
          insurance: takenService[2]?.insurance,
          queryName: 'insurance',
          kpiCount: takenService[2]?.kpiCount,
          service: {
            name: 'Health Insurance',
            serviceIcon: healthInsuranceIcon,
            segmentValue: 100,
          },
          user: user,
        },
        {
          clientName: takenService[3]?.clientName,
          willRender: takenService[3]?.willRender,
          hotel: takenService[3]?.hotel,
          queryName: 'hotel',
          kpiCount: takenService[3]?.kpiCount,
          service: { name: 'Hotel', serviceIcon: hotelIcon, segmentValue: 100 },
          user: user,
        },
        {
          clientName: takenService[4]?.clientName,
          willRender: takenService[4]?.willRender,
          transport: takenService[4]?.transport,
          queryName: 'transport',
          kpiCount: takenService[4]?.kpiCount,
          service: {
            name: 'Local Transport',
            serviceIcon: localTransportIcon,
            segmentValue: 100,
          },
          user: user,
        },
        {
          clientName: takenService[5]?.clientName,
          willRender: takenService[5]?.willRender,
          airportMeet: takenService[5]?.airportMeet,
          queryName: 'airportMeet',
          kpiCount: takenService[5]?.kpiCount,
          service: {
            name: 'Airport Meet & Greet',
            serviceIcon: airportMeetIcon,
            segmentValue: 80,
          },
          user: user,
        },
        {
          clientName: takenService[6]?.clientName,
          willRender: takenService[6]?.willRender,
          airAmbulance: takenService[6]?.airAmbulance,
          queryName: 'airAmbulance',
          kpiCount: takenService[6]?.kpiCount,
          service: {
            name: 'Air Ambulance',
            serviceIcon: airAmbulanceIcon,
            segmentValue: 90,
          },
          user: user,
        },
        {
          clientName: takenService[7]?.clientName,
          willRender: takenService[7]?.willRender,
          doctorOPD: takenService[7]?.doctorOPD,
          queryName: 'doctorOPD',
          kpiCount: takenService[7]?.kpiCount,
          service: {
            name: 'OPD',
            serviceIcon: doctorSelectionIcon,
            segmentValue: 60,
          },
          user: user,
        },
        {
          clientName: takenService[8]?.clientName,
          willRender: takenService[8]?.willRender,
          doctorIPD: takenService[8]?.doctorIPD,
          queryName: 'doctorIPD',
          kpiCount: takenService[8]?.kpiCount,
          service: {
            name: 'IPD',
            serviceIcon: doctorSelectionIcon,
            segmentValue: 60,
          },
          user: user,
        },
        {
          clientName: takenService[9]?.clientName,
          willRender: takenService[9]?.willRender,
          telemedicine: takenService[9]?.telemedicine,
          queryName: 'telemedicine',
          kpiCount: takenService[9]?.kpiCount,
          service: {
            name: 'Telemedicine',
            serviceIcon: telemedicineIcon,
            segmentValue: 100,
          },
          user: user,
        },
        {
          clientName: takenService[10]?.clientName,
          willRender: takenService[10]?.willRender,
          treatmentPlan: takenService[10]?.treatmentPlan,
          queryName: 'treatmentPlan',
          kpiCount: takenService[10]?.kpiCount,
          service: {
            name: 'Treatment Plan',
            serviceIcon: hospitalSelectionIcon,
            segmentValue: 60,
          },
          user: user,
        },
        {
          clientName: takenService[11]?.clientName,
          willRender: takenService[11]?.willRender,
          excursion: takenService[11]?.excursion,
          queryName: 'excursion',
          kpiCount: takenService[11]?.kpiCount,
          service: {
            name: 'Execusion',
            serviceIcon: guideManageIcon,
            segmentValue: 100,
          },
          user: user,
        },
      ])
    }
  }, [])

  //------------------------> Remove the cura_navigate from localStorage after the page leave <-------------------
  useEffect(() => {
    function clearLocalStorage() {
      localStorage.removeItem('cura_navigate')
      window.location.reload()
    }

    window.addEventListener('beforeunload', clearLocalStorage)

    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage)
    }
  }, [])

  //-----------------------> Get the lead <-------------------
  useEffect(() => {
    const _retriveLead = async () => {
      if (leaduuid) {
        const singleLead = await getLeadPerUuid(leaduuid)
        setLead(singleLead)
      }
    }
    _retriveLead()
  }, [])

  /**
   * The handleChange function updates the input state based on the name and value of the input field,
   * and displays an error message if the user is not authorized to change certain fields.
   * @param name - a string representing the name of the input field being changed
   * @param e - The "e" parameter is an event object that is passed to the function when an event (such
   * as a change event) is triggered on an input element. It contains information about the event, such
   * as the target element and the value of the input.
   * @returns If the user's role is not 'accountant' and the name of the field being changed is one of
   * the specified fields, an error message is displayed and the function returns. Otherwise, the
   * function updates the state based on the name of the field being changed and the value entered by
   * the user, and returns the updated state.
   */
  const handleChange = (name, e) => {
    if (
      (user.role !== 'accountant' && name === 'visapaidToSupplier') ||
      name === 'visaProfitOrLoss' ||
      name === 'visaRemarksOrRequirement' ||
      name === 'visaInvoice' ||
      name === 'visaMoneyReceipt' ||
      name === 'reservationpaidToSupplier' ||
      name === 'reservationProfitOrLoss' ||
      name === 'reservationRemarksOrRequirement' ||
      name === 'reservationInvoice' ||
      name === 'reservationMoneyReceipt' ||
      name === 'healthInsurancepaidToSupplier' ||
      name === 'healthInsuranceProfitOrLoss' ||
      name === 'healthInsuranceRemarksOrRequirement' ||
      name === 'healthInsuranceInvoice' ||
      name === 'healthInsuranceMoneyReceipt' ||
      name === 'hotelpaidToSupplier' ||
      name === 'hotelProfitOrLoss' ||
      name === 'hotelRemarksOrRequirement' ||
      name === 'hotelInvoice' ||
      name === 'hotelMoneyReceipt' ||
      name === 'localTransportpaidToSupplier' ||
      name === 'localTransportProfitOrLoss' ||
      name === 'localTransportRemarksOrRequirement' ||
      name === 'localTransportInvoice' ||
      name === 'localTransportMoneyReceipt' ||
      name === 'airportpaidToSupplier' ||
      name === 'airportProfitOrLoss' ||
      name === 'airportRemarksOrRequirement' ||
      name === 'airportInvoice' ||
      name === 'airportMoneyReceipt' ||
      name === 'airAmbulancepaidToSupplier' ||
      name === 'airAmbulanceProfitOrLoss' ||
      name === 'airAmbulanceRemarksOrRequirement' ||
      name === 'airAmbulanceInvoice' ||
      name === 'airAmbulanceMoneyReceipt' ||
      name === 'opdpaidToSupplier' ||
      name === 'opdProfitOrLoss' ||
      name === 'opdRemarksOrRequirement' ||
      name === 'opdInvoice' ||
      name === 'opdMoneyReceipt' ||
      name === 'ipdpaidToSupplier' ||
      name === 'ipdProfitOrLoss' ||
      name === 'ipdRemarksOrRequirement' ||
      name === 'ipdInvoice' ||
      name === 'ipdMoneyReceipt' ||
      name === 'telimedeicinepaidToSupplier' ||
      name === 'telimedeicineProfitOrLoss' ||
      name === 'telimedeicineRemarksOrRequirement' ||
      name === 'telimedeicineInvoice' ||
      name === 'telimedeicineMoneyReceipt' ||
      name === 'treatmentPlanpaidToSupplier' ||
      name === 'treatmentPlanProfitOrLoss' ||
      name === 'treatmentPlanRemarksOrRequirement' ||
      name === 'treatmentPlanInvoice' ||
      name === 'treatmentPlanMoneyReceipt' ||
      name === 'excursionpaidToSupplier' ||
      name === 'excursionProfitOrLoss' ||
      name === 'excursionRemarksOrRequirement' ||
      name === 'excursionInvoice' ||
      name === 'excursionMoneyReceipt'
    ) {
      toast.error('You are not authorized to change this field')
      return
    }

    if (name === 'passportIssueDate' || name === 'passportExpiryDate') {
      // year cant be more than 2099
      const year = e.target.value.split('-')[0]
      if (year > 2099) {
        toast.error('Year cant be more than 2099')
        return
      }
    }

    const value = e.target.value
    switch (name) {
      case 'visaPaymentAmount':
      case 'visapaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const visaDueAmount =
            Number(updatedState.visaPaymentAmount) -
            Number(updatedState.visapaidAmount)
          return { ...updatedState, visaDueAmount }
        })
        break
      case 'reservationPaymentAmount':
      case 'reservationpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const reservationDueAmount =
            updatedState.reservationPaymentAmount -
            updatedState.reservationpaidAmount
          return { ...updatedState, reservationDueAmount }
        })
        break
      case 'healthInsurancePaymentAmount':
      case 'healthInsurancepaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const healthInsuranceDueAmount =
            updatedState.healthInsurancePaymentAmount -
            updatedState.healthInsurancepaidAmount
          return { ...updatedState, healthInsuranceDueAmount }
        })
        break
      case 'hotelPaymentAmount':
      case 'hotelpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const hotelDueAmount =
            updatedState.hotelPaymentAmount - updatedState.hotelpaidAmount
          return { ...updatedState, hotelDueAmount }
        })
        break
      case 'localTransportPaymentAmount':
      case 'localTransportpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const localTransportDueAmount =
            updatedState.localTransportPaymentAmount -
            updatedState.localTransportpaidAmount
          return { ...updatedState, localTransportDueAmount }
        })
        break
      case 'airportPaymentAmount':
      case 'airportpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const airportDueAmount =
            updatedState.airportPaymentAmount - updatedState.airportpaidAmount
          return { ...updatedState, airportDueAmount }
        })
        break
      case 'airAmbulancePaymentAmount':
      case 'airAmbulancepaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const airAmbulanceDueAmount =
            updatedState.airAmbulancePaymentAmount -
            updatedState.airAmbulancepaidAmount
          return { ...updatedState, airAmbulanceDueAmount }
        })
        break
      case 'opdPaymentAmount':
      case 'opdpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const opdDueAmount =
            updatedState.opdPaymentAmount - updatedState.opdpaidAmount
          return { ...updatedState, opdDueAmount }
        })
        break
      case 'ipdPaymentAmount':
      case 'ipdpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const ipdDueAmount =
            updatedState.ipdPaymentAmount - updatedState.ipdpaidAmount
          return { ...updatedState, ipdDueAmount }
        })
        break
      case 'telimedeicinePaymentAmount':
      case 'telimedeicinepaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const telimedeicineDueAmount =
            updatedState.telimedeicinePaymentAmount -
            updatedState.telimedeicinepaidAmount
          return { ...updatedState, telimedeicineDueAmount }
        })
        break
      case 'treatmentPlanPaymentAmount':
      case 'treatmentPlanpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const treatmentPlanDueAmount =
            updatedState.treatmentPlanPaymentAmount -
            updatedState.treatmentPlanpaidAmount
          return { ...updatedState, treatmentPlanDueAmount }
        })
        break
      case 'excursionPaymentAmount':
      case 'excursionpaidAmount':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const excursionDueAmount =
            updatedState.excursionPaymentAmount -
            updatedState.excursionpaidAmount
          return { ...updatedState, excursionDueAmount }
        })
        break
      case 'visaPaymentAmount':
      case 'visapaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const visaProfitOrLoss =
            updatedState.visaPaymentAmount - updatedState.visapaidToSupplier
          return { ...updatedState, visaProfitOrLoss }
        })
        break
      case 'reservationPaymentAmount':
      case 'reservationpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const reservationProfitOrLoss =
            updatedState.reservationPaymentAmount -
            updatedState.reservationpaidToSupplier
          return { ...updatedState, reservationProfitOrLoss }
        })
        break
      case 'healthInsurancePaymentAmount':
      case 'healthInsurancepaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const healthInsuranceProfitOrLoss =
            updatedState.healthInsurancePaymentAmount -
            updatedState.healthInsurancepaidToSupplier
          return { ...updatedState, healthInsuranceProfitOrLoss }
        })
        break
      case 'hotelPaymentAmount':
      case 'hotelpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const hotelProfitOrLoss =
            updatedState.hotelPaymentAmount - updatedState.hotelpaidToSupplier
          return { ...updatedState, hotelProfitOrLoss }
        })
        break
      case 'localTransportPaymentAmount':
      case 'localTransportpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const localTransportProfitOrLoss =
            updatedState.localTransportPaymentAmount -
            updatedState.localTransportpaidToSupplier
          return { ...updatedState, localTransportProfitOrLoss }
        })
        break
      case 'airportPaymentAmount':
      case 'airportpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const airportProfitOrLoss =
            updatedState.airportPaymentAmount -
            updatedState.airportpaidToSupplier
          return { ...updatedState, airportProfitOrLoss }
        })
        break
      case 'airAmbulancePaymentAmount':
      case 'airAmbulancepaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const airAmbulanceProfitOrLoss =
            updatedState.airAmbulancePaymentAmount -
            updatedState.airAmbulancepaidToSupplier
          return { ...updatedState, airAmbulanceProfitOrLoss }
        })
        break
      case 'opdPaymentAmount':
      case 'opdpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const opdProfitOrLoss =
            updatedState.opdPaymentAmount - updatedState.opdpaidToSupplier
          return { ...updatedState, opdProfitOrLoss }
        })
        break
      case 'ipdPaymentAmount':
      case 'ipdpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const ipdProfitOrLoss =
            updatedState.ipdPaymentAmount - updatedState.ipdpaidToSupplier
          return { ...updatedState, ipdProfitOrLoss }
        })
        break
      case 'telimedeicinePaymentAmount':
      case 'telimedeicinepaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const telimedeicineProfitOrLoss =
            updatedState.telimedeicinePaymentAmount -
            updatedState.telimedeicinepaidToSupplier
          return { ...updatedState, telimedeicineProfitOrLoss }
        })
        break
      case 'treatmentPlanPaymentAmount':
      case 'treatmentPlanpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const treatmentPlanProfitOrLoss =
            updatedState.treatmentPlanPaymentAmount -
            updatedState.treatmentPlanpaidToSupplier
          return { ...updatedState, treatmentPlanProfitOrLoss }
        })
        break
      case 'excursionPaymentAmount':
      case 'excursionpaidToSupplier':
        setInput(prevState => {
          const updatedState = { ...prevState, [name]: value }
          const excursionProfitOrLoss =
            updatedState.excursionPaymentAmount -
            updatedState.excursionpaidToSupplier
          return { ...updatedState, excursionProfitOrLoss }
        })
        break
      default:
        setInput(prevState => ({ ...prevState, [name]: value }))
        break
    }
  }

  // Passport Expiry date auto fill (issue date plus 5 years minus 1 day)
  const handlePassportExpiryDate = value => {
    const expiryDate = calculatePassportExpiryDate(value)
    setInput(prevState => ({ ...prevState, passportExpiryDate: expiryDate }))
  }

  // Handle Receipt Services
  const handleReceiptServices = serviceName => {
    const serviceArr = [...receiptServices]
    const serviceIndex = serviceArr.indexOf(serviceName)
    if (serviceIndex !== -1) {
      serviceArr.splice(serviceIndex, 1)
    } else {
      serviceArr.push(serviceName)
    }
    setReceiptServices(serviceArr)
  }

  //----------------------> Handle service status <----------------------
  const handleServiceStatus = serviceName => {
    const serviceArr = input.serviceArr
    const serviceIndex = serviceArr.indexOf(serviceName)
    if (serviceIndex !== -1) {
      serviceArr.splice(serviceIndex, 1)
    } else {
      serviceArr.push(serviceName)
    }

    setInput({ ...input, [serviceName]: !input[serviceName] })

    const index = takenServiceState.findIndex(
      service => service.queryName === serviceName
    )
    const serviceToUpdate = { ...takenServiceState[index] }
    serviceToUpdate[serviceName] = !serviceToUpdate[serviceName]
    serviceToUpdate.willRender = !serviceToUpdate.willRender // toggle willRender
    const updatedServices = [...takenServiceState]
    updatedServices[index] = serviceToUpdate
    setTakenServiceState(updatedServices)
  }

  // ----------------------> Handle service status to prevent multiple count <----------------------

  const [visaProcessedFields, setVisaProcessedFields] = useState({
    clientName: false,
    contactNumber: false,
    whatsappNumber: false,
    email: false,
    passportNumber: false,
    dateOfBirth: false,
    passportIssueDate: false,
    passportExpiryDate: false,
    visaDocumentCollected: false,
    visaRequestForVisa: false,
    visaCollectionOfPassport: false,
    visaIssueDate: false,
    visaExpiryDate: false,
    visaPaymentAmount: false,
    visapaidAmount: false,
    visapaidToSupplier: false,
    visaDueAmount: false,
  })

  const [reservationProcessedFields, setReservationProcessedFields] = useState({
    clientName: false,
    contactNumber: false,
    whatsappNumber: false,
    email: false,
    passportNumber: false,
    dateOfBirth: false,
    passportIssueDate: false,
    passportExpiryDate: false,
    reservationBookingDate: false,
    reservationTravelDate: false,
    reservationReturnDateOrOneWay: false,
    reservationTicketingTimeLimit: false,
    reservationIssuingDate: false,
    reservationReSchedule: false,
    reservationReIssueDate: false,
    reservationRctivationAxularyService: false,
    reservationPaymentAmount: false,
    reservationpaidAmount: false,
    reservationpaidToSupplier: false,
    reservationDueAmount: false,
  })

  const [healthInsuranceProcessedFields, setHealthInsuranceProcessedFields] =
    useState({
      clientName: false,
      contactNumber: false,
      whatsappNumber: false,
      email: false,
      passportNumber: false,
      dateOfBirth: false,
      passportIssueDate: false,
      passportExpiryDate: false,
      healthInsuranceAddress: false,
      healthInsuranceContactNumber: false,
      healthInsuranceIssueDate: false,
      healthInsuranceNumberIfDaysCovered: false,
      healthInsuranceExpiryDate: false,
      healthInsurancePaymentAmount: false,
      healthInsurancepaidAmount: false,
      healthInsurancepaidToSupplier: false,
      healthInsuranceDueAmount: false,
    })

  const [hotelProcessedFields, setHotelProcessedFields] = useState({
    hotelName: false,
    hotelPhone: false,
    hotelCheckInDate: false,
    hotelCheckOutDate: false,
    hotelNumberOfAdultsOrChildren: false,
    hotelNumberOfRooms: false,
    hotelPaymentAmount: false,
    hotelpaidAmount: false,
    hotelpaidToSupplier: false,
    hotelDueAmount: false,
  })

  const [localTransportProcessedFields, setLocalTransportProcessedFields] =
    useState({
      name: false,
      contactNumber: false,
      location: false,
      date: false,
      time: false,
      paymentAmount: false,
      paidAmount: false,
      paidToSupplier: false,
      dueAmount: false,
    })

  const [airportProcessedFields, setAirportProcessedFields] = useState({
    ticketCopy: false,
    picture: false,
    paymentAmount: false,
    paidAmount: false,
    paidToSupplier: false,
    dueAmount: false,
  })

  const [airAmbulanceProcessedFields, setAirAmbulanceProcessedFields] =
    useState({
      latesemedicalDocument: false,
      medicalCondition: false,
      attendence: false,
      activationOfVisa: false,
      paymentAmount: false,
      paidAmount: false,
      paidToSupplier: false,
      dueAmount: false,
    })

  const [opdProcessedFields, setOpdProcessedFields] = useState({
    latesemedicalDocument: false,
    appointment: false,
  })

  const [ipdProcessedFields, setIpdProcessedFields] = useState({
    latesemedicalDocument: false,
    appointment: false,
  })

  const [telimedicineProcessedFields, setTelimedicineProcessedFields] =
    useState({
      latesemedicalDocument: false,
      appointment: false,
    })

  const [treatmentPlanProcessedFields, setTreatmentPlanProcessedFields] =
    useState({
      latesemedicalDocument: false,
    })

  const [excursionProcessedFields, setExcursionProcessedFields] = useState({
    scanPassport: false,
    photograph: false,
    thiVisa: false,
    emptyPages: false,
    marriageCertificate: false,
    birthCertificate: false,
    paymentAmount: false,
    paidAmount: false,
    paidToSupplier: false,
    dueAmount: false,
  })

  //-------------------------> Auto update kpi count on input change ---------------------------->
  useEffect(() => {
    if (
      input.clientName &&
      input.contactNumber &&
      !visaProcessedFields.clientName &&
      !visaProcessedFields.contactNumber
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        reservationSegment: Number(prevKpiCount.reservationSegment) + 10,
        visaSegment: Number(prevKpiCount.visaSegment) + 10,
        insuranceSegment: Number(prevKpiCount.insuranceSegment) + 10,
        hotelSegment: Number(prevKpiCount.hotelSegment) + 10,
        airportMeetSegment: prevKpiCount.airportMeetSegment + 10,
        airAmbulanceSegment: prevKpiCount.airAmbulanceSegment + 10,
        doctorOPDSegment: prevKpiCount.doctorOPDSegment + 10,
        doctorIPDSegment: prevKpiCount.doctorIPDSegment + 10,
        telemedicineSegment: prevKpiCount.telemedicineSegment + 10,
        treatmentPlanSegment: prevKpiCount.treatmentPlanSegment + 10,
        excursionSegment: prevKpiCount.excursionSegment + 10,
      }))
      setVisaProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        clientName: true,
        contactNumber: true,
      }))
    }

    if (
      input.passportNumber &&
      input.dateOfBirth &&
      input.passportIssueDate &&
      input.passportExpiryDate &&
      !visaProcessedFields.passportNumber &&
      !visaProcessedFields.dateOfBirth &&
      !visaProcessedFields.passportIssueDate &&
      !visaProcessedFields.passportExpiryDate
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        visaSegment: prevKpiCount.visaSegment + 10,
        // basicPassportSegment: 10,
        reservationSegment: prevKpiCount.reservationSegment + 10,
        insuranceSegment: prevKpiCount.insuranceSegment + 10,
        hotelSegment: prevKpiCount.hotelSegment + 10,
        airportMeetSegment: prevKpiCount.airportMeetSegment + 10,
        airAmbulanceSegment: prevKpiCount.airAmbulanceSegment + 10,
        doctorOPDSegment: prevKpiCount.doctorOPDSegment + 10,
        doctorIPDSegment: prevKpiCount.doctorIPDSegment + 10,
        telemedicineSegment: prevKpiCount.telemedicineSegment + 10,
        treatmentPlanSegment: prevKpiCount.treatmentPlanSegment + 10,
      }))
      setVisaProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        passportNumber: true,
        dateOfBirth: true,
        passportIssueDate: true,
        passportExpiryDate: true,
      }))
    }

    if (
      input.visaDocumentCollected &&
      input.visaRequestForVisa &&
      input.visaCollectionOfPassport &&
      input.visaExpiryDate &&
      !visaProcessedFields.visaIssueDate &&
      !visaProcessedFields.visaExpiryDate &&
      !visaProcessedFields.visaDocumentCollected &&
      !visaProcessedFields.visaRequestForVisa &&
      !visaProcessedFields.visaCollectionOfPassport
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        visaSegment: prevKpiCount.visaSegment + 40,
      }))
      setVisaProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        visaDocumentCollected: true,
        visaRequestForVisa: true,
        visaCollectionOfPassport: true,
        visaIssueDate: true,
        visaExpiryDate: true,
      }))
    }

    if (
      input.visaPaymentAmount &&
      input.visapaidAmount &&
      !visaProcessedFields.visaPaymentAmount &&
      !visaProcessedFields.visapaidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        visaSegment: prevKpiCount.visaSegment + 20,
      }))
      setVisaProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        visaPaymentAmount: true,
        visapaidAmount: true,
      }))
    }
    if (input.visapaidToSupplier && !visaProcessedFields.visapaidToSupplier) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        visaSegment: prevKpiCount.visaSegment + 20,
      }))
      setVisaProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        visapaidToSupplier: true,
      }))
    }

    // Reservation KPI Count--------->

    if (
      input.reservationBookingDate &&
      input.reservationTravelDate &&
      input.reservationReturnDateOrOneWay &&
      input.reservationIssuingDate &&
      !reservationProcessedFields.reservationBookingDate &&
      !reservationProcessedFields.reservationTravelDate &&
      !reservationProcessedFields.reservationReturnDateOrOneWay &&
      !reservationProcessedFields.reservationIssuingDate
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        reservationSegment: prevKpiCount.reservationSegment + 40,
      }))
      setReservationProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        reservationBookingDate: true,
        reservationTravelDate: true,
        reservationReturnDateOrOneWay: true,
        reservationIssuingDate: true,
      }))
    }

    if (
      input.reservationPaymentAmount &&
      input.reservationpaidAmount &&
      !reservationProcessedFields.reservationPaymentAmount &&
      !reservationProcessedFields.reservationpaidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        reservationSegment: prevKpiCount.reservationSegment + 20,
      }))
      setReservationProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        reservationPaymentAmount: true,
        reservationpaidAmount: true,
      }))
    }

    if (
      input.reservationpaidToSupplier &&
      !reservationProcessedFields.reservationpaidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        reservationSegment: prevKpiCount.reservationSegment + 20,
      }))
      setReservationProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        reservationpaidToSupplier: true,
      }))
    }

    // Health Insurance KPI Count--------->
    if (
      input.healthInsuranceAddress &&
      input.healthInsuranceContactNumber &&
      input.healthInsuranceIssueDate &&
      input.healthInsuranceExpiryDate &&
      !healthInsuranceProcessedFields.healthInsuranceAddress &&
      !healthInsuranceProcessedFields.healthInsuranceContactNumber &&
      !healthInsuranceProcessedFields.healthInsuranceIssueDate &&
      !healthInsuranceProcessedFields.healthInsuranceExpiryDate
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        insuranceSegment: prevKpiCount.insuranceSegment + 40,
      }))
      setHealthInsuranceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        healthInsuranceAddress: true,
        healthInsuranceContactNumber: true,
        healthInsuranceIssueDate: true,
        healthInsuranceExpiryDate: true,
      }))
    }

    if (
      input.healthInsurancePaymentAmount &&
      input.healthInsurancepaidAmount &&
      !healthInsuranceProcessedFields.healthInsurancePaymentAmount &&
      !healthInsuranceProcessedFields.healthInsurancepaidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        insuranceSegment: prevKpiCount.insuranceSegment + 20,
      }))
      setHealthInsuranceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        healthInsurancePaymentAmount: true,
        healthInsurancepaidAmount: true,
      }))
    }

    if (
      input.healthInsurancepaidToSupplier &&
      !healthInsuranceProcessedFields.healthInsurancepaidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        insuranceSegment: prevKpiCount.insuranceSegment + 20,
      }))
      setHealthInsuranceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        healthInsurancepaidToSupplier: true,
      }))
    }

    // ----------------Hotel KPI Count----------------->
    if (
      input.hotelName &&
      input.hotelPhoneOrEmail &&
      input.hotelCheckInDate &&
      input.hotelCheckOutDate &&
      input.hotelNumberOfAdultsOrChildren &&
      input.hotelNumberOfRooms &&
      !hotelProcessedFields.hotelName &&
      !hotelProcessedFields.hotelPhone &&
      !hotelProcessedFields.hotelCheckInDate &&
      !hotelProcessedFields.hotelCheckOutDate &&
      !hotelProcessedFields.hotelNumberOfRooms &&
      !hotelProcessedFields.hotelNumberOfAdultsOrChildren
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        hotelSegment: prevKpiCount.hotelSegment + 25,
      }))
      setHotelProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        hotelName: true,
        hotelNumberOfRooms: true,
        hotelPhone: true,
        hotelCheckInDate: true,
        hotelCheckOutDate: true,
        hotelNumberOfAdultsOrChildren: true,
      }))
    }

    if (
      input.hotelPaymentAmount &&
      input.hotelpaidAmount &&
      !hotelProcessedFields.hotelPaymentAmount &&
      !hotelProcessedFields.hotelpaidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        hotelSegment: prevKpiCount.hotelSegment + 20,
      }))
      setHotelProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        hotelPaymentAmount: true,
        hotelpaidAmount: true,
      }))
    }

    if (
      input.hotelpaidToSupplier &&
      !hotelProcessedFields.hotelpaidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        hotelSegment: prevKpiCount.hotelSegment + 20,
      }))

      setHotelProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        hotelpaidToSupplier: true,
      }))
    }

    // ----------------Transport KPI Count----------------->
    if (
      input.clientName &&
      input.contactNumber &&
      !localTransportProcessedFields.name &&
      !localTransportProcessedFields.contactNumber
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        transportSegment: prevKpiCount.transportSegment + 30,
      }))
      setLocalTransportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        name: true,
        contactNumber: true,
      }))
    }

    if (
      input.localTransportDate &&
      input.localTransportTime &&
      input.localTransportLocation &&
      !localTransportProcessedFields.date &&
      !localTransportProcessedFields.time &&
      !localTransportProcessedFields.location
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        transportSegment: prevKpiCount.transportSegment + 30,
      }))
      setLocalTransportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        date: true,
        time: true,
        location: true,
      }))
    }

    if (
      input.localTransportPaymentAmount &&
      input.localTransportpaidAmount &&
      !localTransportProcessedFields.paymentAmount &&
      !localTransportProcessedFields.paidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        transportSegment: prevKpiCount.transportSegment + 20,
      }))
      setLocalTransportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paymentAmount: true,
        paidAmount: true,
      }))
    }

    if (
      input.localTransportpaidToSupplier &&
      !localTransportProcessedFields.paidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        transportSegment: prevKpiCount.transportSegment + 20,
      }))
      setLocalTransportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paidToSupplier: true,
      }))
    }

    // Airport meet and greet kpi count ------------->
    if (
      input.airportTicket &&
      input.airportRegularPicture &&
      !airportProcessedFields.ticketCopy &&
      !airportProcessedFields.picture
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airportMeetSegment: prevKpiCount.airportMeetSegment + 20,
      }))
      setAirportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        ticketCopy: true,
        picture: true,
      }))
    }

    if (
      input.airportPaymentAmount &&
      input.airportpaidAmount &&
      !airportProcessedFields.paymentAmount &&
      !airportProcessedFields.paidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airportMeetSegment: prevKpiCount.airportMeetSegment + 20,
      }))
      setAirportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paymentAmount: true,
        paidAmount: true,
      }))
    }

    if (input.airportpaidToSupplier && !airportProcessedFields.paidToSupplier) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airportMeetSegment: prevKpiCount.airportMeetSegment + 20,
      }))
      setAirportProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paidToSupplier: true,
      }))
    }

    // Air Ambulance kpi count ------------->
    if (
      input.airAmbulanceMedicalDocument &&
      input.airAmbulanceMedicalConditionDetails &&
      !airAmbulanceProcessedFields.latesemedicalDocument &&
      !airAmbulanceProcessedFields.medicalCondition
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airAmbulanceSegment: prevKpiCount.airAmbulanceSegment + 30,
      }))
      setAirAmbulanceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        latesemedicalDocument: true,
        medicalCondition: true,
      }))
    }

    if (
      input.airAmbulancePaymentAmount &&
      input.airAmbulancepaidAmount &&
      !airAmbulanceProcessedFields.paymentAmount &&
      !airAmbulanceProcessedFields.paidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airAmbulanceSegment: prevKpiCount.airAmbulanceSegment + 20,
      }))
      setAirAmbulanceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paymentAmount: true,
        paidAmount: true,
      }))
    }

    if (
      input.airAmbulancepaidToSupplier &&
      !airAmbulanceProcessedFields.paidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        airAmbulanceSegment: prevKpiCount.airAmbulanceSegment + 20,
      }))
      setAirAmbulanceProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paidToSupplier: true,
      }))
    }

    // Doctor OPD kpi count ------------->
    if (
      input.opdLatestMedicalDocument &&
      input.opdAppointmentForm &&
      !opdProcessedFields.latesemedicalDocument &&
      !opdProcessedFields.appointment
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        doctorOPDSegment: prevKpiCount.doctorOPDSegment + 40,
      }))
      setOpdProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        latesemedicalDocument: true,
        appointment: true,
      }))
    }

    // Doctor IPD kpi count ------------->
    if (
      input.ipdLatestMedicalDocument &&
      input.ipdAppointmentForm &&
      !ipdProcessedFields.latesemedicalDocument &&
      !ipdProcessedFields.appointment
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        doctorIPDSegment: prevKpiCount.doctorIPDSegment + 40,
      }))
      setIpdProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        latesemedicalDocument: true,
        appointment: true,
      }))
    }

    // Telimedicine kpi count ------------->
    if (
      input.telimedeicineLatestMedicalDocument &&
      input.telimedeicineAppointmentForm &&
      !telimedicineProcessedFields.latesemedicalDocument &&
      !telimedicineProcessedFields.appointment
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        telemedicineSegment: prevKpiCount.telemedicineSegment + 40,
      }))
      setTelimedicineProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        latesemedicalDocument: true,
        appointment: true,
      }))
    }

    if (
      input.telimedeicinePaymentAmount &&
      input.telimedeicinepaidAmount &&
      !telimedicineProcessedFields.paymentAmount &&
      !telimedicineProcessedFields.paidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        telemedicineSegment: prevKpiCount.telemedicineSegment + 20,
      }))
      setTelimedicineProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paymentAmount: true,
        paidAmount: true,
      }))
    }

    if (
      input.telimedeicinepaidToSupplier &&
      !telimedicineProcessedFields.paidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        telemedicineSegment: prevKpiCount.telemedicineSegment + 20,
      }))
      setTelimedicineProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paidToSupplier: true,
      }))
    }

    // Treatment Plan kpi count ------------->
    if (
      input.treatmentPlanLatestMedicalDocument &&
      !treatmentPlanProcessedFields.latesemedicalDocument
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        treatmentPlanSegment: prevKpiCount.treatmentPlanSegment + 40,
      }))
      setTreatmentPlanProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        latesemedicalDocument: true,
      }))
    }

    // Exemption kpi count ------------->
    if (
      input.excursionScanedPassport &&
      input.excursionPhotograph &&
      input.excursionThiVisaExpireDate &&
      input.excursionEliteVisaOrStamp &&
      !excursionProcessedFields.scanPassport &&
      !excursionProcessedFields.photograph &&
      !excursionProcessedFields.thiVisa &&
      !excursionProcessedFields.emptyPages
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        excursionSegment: prevKpiCount.excursionSegment + 10,
      }))
      setExcursionProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        scanPassport: true,
        photograph: true,
        thiVisa: true,
        emptyPages: true,
      }))
    }

    if (
      input.excursionMarriageCertificate &&
      input.excursionBirthCertificate &&
      !excursionProcessedFields.marriageCertificate &&
      !excursionProcessedFields.birthCertificate
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        excursionSegment: prevKpiCount.excursionSegment + 40,
      }))
      setExcursionProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,

        marriageCertificate: true,
        birthCertificate: true,
      }))
    }

    if (
      input.excursionPaymentAmount &&
      input.excursionpaidAmount &&
      !excursionProcessedFields.paymentAmount &&
      !excursionProcessedFields.paidAmount
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        excursionSegment: prevKpiCount.excursionSegment + 20,
      }))
      setExcursionProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paymentAmount: true,
        paidAmount: true,
      }))
    }

    if (
      input.excursionpaidToSupplier &&
      !excursionProcessedFields.paidToSupplier
    ) {
      setKpiCount(prevKpiCount => ({
        ...prevKpiCount,
        excursionSegment: prevKpiCount.excursionSegment + 20,
      }))
      setExcursionProcessedFields(prevProcessedFields => ({
        ...prevProcessedFields,
        paidToSupplier: true,
      }))
    }
  }, [input, visaProcessedFields])

  /**
   * The function handles file input and updates the input state with the uploaded file's download URL.
   * @param name - a string representing the name of the file input field being handled
   * @param e - e is an event object that is passed as an argument to the function. It is typically
   * triggered by an event listener and contains information about the event that occurred, such as the
   * target element and any data associated with the event. In this case, it is used to access the
   * uploaded file from the input
   * @param rest - rest is a variable that is passed as an argument to the handleFileInput function. It
   * is used to update the state of the input object along with the file upload. If rest is truthy, it
   * is used to set the value of a property in the input object to the current date in the
   * @returns The function `handleFileInput` returns nothing (`undefined`) if the user's role is
   * "executive" and the file input name is "visaInvoice" or "visaMoneyReceipt", and returns the
   * updated `input` object with the file download URL and optionally a date string if the `rest`
   * parameter is provided.
   */
  const handleFileInput = async (name, e, rest) => {
    if (
      (user.role === 'executive' && name === 'visaInvoice') ||
      name === 'visaMoneyReceipt'
    ) {
      toast.error('You are not authorized to change this field')
      return
    }
    const downloadUrl = await fileUploader(e.target.files[0])

    if (rest) {
      setInput({
        ...input,
        [name]: downloadUrl,
        [rest]: new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      })
    } else {
      setInput({ ...input, [name]: downloadUrl })
    }
  }

  /**
   * It takes two arguments, the first is the id of the input element you want to trigger, the second is
   * the event object.
   *
   * The function then prevents the default action of the event, and then triggers the click event on
   * the input element.
   * @param idName - The id of the input element
   * @param e - the event object
   */
  const handleUploadClick = (idName, e) => {
    e.preventDefault()
    document.getElementById(idName).click()
  }

  /**
   * It takes a target (the URL to open) and an event (the click event) and prevents the default action
   * of the event (opening the URL in the same window) and instead opens the URL in a new window.
   * @param target - The URL of the file to download.
   * @param e - the event object
   */
  const handleDownloadClick = (target, e) => {
    e.preventDefault()
    window.open(target, '_blank')
  }

  /**
   * When the user uploads a file, set the current date in the input field.
   * @param name - the name of the input field
   */
  const setCurrentDateWhileUpload = name => {
    setInput({ ...input, [name]: new Date() })
  }

  // ------------> Toggle functions for services starts <----------------
  const toggleVisa = () => {
    setVisa(!visa)
    handleServiceStatus('visa')
    handleReceiptServices('visa')
  }

  const toggleReservation = () => {
    setReservation(!reservation)
    handleServiceStatus('reservation')
    handleReceiptServices('reservation')
  }

  const toggleInsurance = () => {
    setInsurance(!insurance)
    handleServiceStatus('insurance')
    handleReceiptServices('healthInsurance')
  }

  const toggleHotel = () => {
    setHotel(!hotel)
    handleServiceStatus('hotel')
    handleReceiptServices('hotel')
  }

  const toggleTransport = () => {
    setTransport(!transport)
    handleServiceStatus('transport')
    handleReceiptServices('localTransport')
  }

  const toggleAirportMeet = () => {
    setAirportMeet(!airportMeet)
    handleServiceStatus('airportMeet')
    handleReceiptServices('airport')
  }

  const toggleAirAmbulance = () => {
    setAirAmbulance(!airAmbulance)
    handleServiceStatus('airAmbulance')
    handleReceiptServices('airAmbulance')
  }

  const toggleDoctorOPD = () => {
    setDoctorOPD(!doctorOPD)
    handleServiceStatus('doctorOPD')
    handleReceiptServices('opd')
  }

  const toggleDoctorIPD = () => {
    setDoctorIPD(!doctorIPD)
    handleServiceStatus('doctorIPD')
    handleReceiptServices('ipd')
  }

  const toggleTelemedicine = () => {
    setTelemedicine(!telemedicine)
    handleServiceStatus('telemedicine')
    handleReceiptServices('telimedeicine')
  }

  const toggleTreatmentPlan = () => {
    setTreatmentPlan(!treatmentPlan)
    handleServiceStatus('treatmentPlan')
    handleReceiptServices('treatmentPlan')
  }

  const toggleInterpreter = () => {
    setInterpreter(!interpreter)
    handleServiceStatus('interpreter')
  }

  const toggleExcursion = () => {
    setExcursion(!excursion)
    handleServiceStatus('excursion')
    handleReceiptServices('excursion')
  }

  // ------------> Toggle functions for services ends <----------------

  if (!user) {
    if (typeof window === 'undefined') return null
    router.push('/login')
  }

  //-------------------> Handle Multi Form-------------------->
  // First Form Next Button
  const gotToSecondForm = async () => {
    if (!input.clientName || !input.contactNumber) {
      toast.error('Please fill up the Name & Contact field')
      return
    }

    if (user.role !== 'executive') {
      toast.error('You are not authorized to change this field')
      return
    }

    setIsSpinner(true)

    const uniqueClientId = handleMakeId(input.clientName, user.name)
    setUniqueClientId(uniqueClientId)

    const clientInfo = await getClientPeruniqueClientId(uniqueClientId)

    // check the key is exist or not in retriveData
    if (clientInfo[0]?.wrapper?.uniqueClientId === uniqueClientId) {
      toast.error('Data already exist! Please update the data')
      return
    }

    if (!input.clientName || !input.contactNumber) {
      toast.error('Please fill up the Name & Contact field')
      return
    }

    if (!kpiToUpdate) {
      toast.error('You are not assigned any KPI')
      return
    }

    const timeStamp = new Date().getTime()

    const isAdded = await addClient(uniqueClientId, {
      clientDetails: user,
      formData: input,
      createdAtAlt: timeStamp,
      createdOn: new Date().toLocaleDateString('en-US', {
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      uniqueClientId,
    })

    if (!isAdded) {
      toast.error('Something went wrong! Please try again')
    }

    localStorage.setItem('uniqueClientId', uniqueClientId)

    const updatedTakenServiceState = takenServiceState.map(serviceItem => ({
      ...serviceItem,
      kpiCount: { ...kpiCount }, // Update kpiCount in service object
      // kpi: { ...kpiToUpdate },
      clientName: input.clientName,
      uniqueClientId,
    }))

    setTakenServiceState(updatedTakenServiceState)

    // Check the kpiToUpdate is empty object or not if empty then return false else true


    if (Object?.keys(kpiToUpdate)?.length === 0) {
      toast.error('You are not assigned any KPI')
      return
    } else {
      if (kpiToUpdate.wrapper.complitedKpiTotal) {
        dataForDb = {
          complitedKpiTotal:
            Number(kpiToUpdate.wrapper.complitedKpiTotal) +
            Number(returnTotal(updatedTakenServiceState)),
          cleintName: input.clientName,
        }
      } else {
        dataForDb = {
          complitedKpiTotal: Number(returnTotal(updatedTakenServiceState)),
          cleintName: input.clientName,
        }
      }
    }

    queryKpi(uniqueClientId, {
      takenService: updatedTakenServiceState,
      kpiuuid: kpiToUpdate?.wrapper?.kpiuuid,
      uniqueClientId,
      complitedKpiTotal: returnTotal(updatedTakenServiceState),
      cleintName: input.clientName,
    })

    setTimeout(() => {
      setIsSpinner(false)
      Swal.fire({
        title: `Order ID of ${input.clientName} has been created successfully`,
        width: 600,
        padding: '1rem',
        color: '#716add',
        background: '#fff url(/images/second_bg_popup.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        zIndex: 9999,
        customClass: {
          title: 'my-swal-title',
        },
      })

      setSecondForm(true)
    }, 3000)
  }

  // Second form Next Button
  const gotToThirdForm = async () => {

     if (input.passportIssueDate && input.passportExpiryDate) {
      // year cant be more than 2099
       const year1 = input.passportIssueDate.split('-')[0]
       const year2 = input.passportExpiryDate.split('-')[0]
      if (year1 > 2099 || year2 > 2099) {
        toast.error('Year cant be more than 2099')
        return
      }
    }

    if (
      !visa &&
      !reservation &&
      !insurance &&
      !hotel &&
      !transport &&
      !airportMeet &&
      !airAmbulance &&
      !doctorOPD &&
      !doctorIPD &&
      !telemedicine &&
      !treatmentPlan &&
      !interpreter &&
      !excursion
    ) {
      toast.error('Please select at list one service to continue')
      return
    }

    const isUpdated = await updateClient(uniqueClientId, input)
    if (!isUpdated) {
      toast.error('Something went wrong! Please try again')
    }

    const updatedKpiCount = { ...kpiCount }
    setKpiCount(updatedKpiCount)

    const updatedTakenServiceState = takenServiceState.map(serviceItem => ({
      ...serviceItem,
      kpiCount: { ...kpiCount }, // Update kpiCount in service object
      // kpi: { ...kpiToUpdate },
      clientName: input.clientName,
    }))
    setTakenServiceState(updatedTakenServiceState)

    let dataForDb = {}

    if (Object?.keys(kpiToUpdate)?.length === 0) {
      toast.error('You are not assigned any KPI')
      return
    } else {
      if (kpiToUpdate.wrapper.complitedKpiTotal) {
        dataForDb = {
          complitedKpiTotal:
            Number(kpiToUpdate.wrapper.complitedKpiTotal) +
            Number(returnTotal(updatedTakenServiceState)),
          cleintName: input.clientName,
        }
      } else {
        dataForDb = {
          complitedKpiTotal: Number(returnTotal(updatedTakenServiceState)),
          cleintName: input.clientName,
        }
      }
    }

    const dataToSend = {
      takenService: updatedTakenServiceState,
      kpiuuid: kpiToUpdate?.wrapper?.kpiuuid,
      uniqueClientId,
      complitedKpiTotal: Number(returnTotal(updatedTakenServiceState)),
      cleintName: input.clientName,
    }

    await updateQueryKpi(uniqueClientId, dataToSend)
    setThirdForm(true)

    toast.success('Client added successfully', {
      id: 'submit_client',
    })
  }

  // Data send to database
  // Third Form Submit Button
  const handleSubmit = async () => {
    const isUpdated = await updateClient(uniqueClientId, input)
    if (!isUpdated) {
      toast.error('Something went wrong! Please try again')
    }
    const receipt = await getTheLatestReceipt(uniqueClientId)
    let receiptId = ''
    if (receipt?.length > 0) {
      const receiptID = receipt[0].wrapper.receiptId
      const receiptNum = receiptID.split('-')[0]
      const receiptNumPast = receiptNum.split('R')[1]
      const receiptNumNew = Number(receiptNumPast) + 1
      receiptId = `R${receiptNumNew}-${uniqueClientId}`
    } else {
      receiptId = `R1-${uniqueClientId}`
    }
    // const receiptId = generateUniqueChar()
    let dataToSetForReceipt = []
    receiptServices.map(service => {
      const data = {
        clientId: uniqueClientId,
        receiptId,
        clientName: input.clientName,
        clientAddress: input.address,
        clientEmail: input.email,
        clientContact: input.contactNumber,
        serviceName: service,
        paidAmount: input[`${service}paidAmount`],
        createdOn: new Date().toLocaleString('en-US', dateOptions),
      }
      dataToSetForReceipt.push(data)
    })

    await createReceipt(uniqueClientId, receiptId, dataToSetForReceipt)

    const updatedKpiCount = { ...kpiCount }
    setKpiCount(updatedKpiCount)

    const updatedTakenServiceState = takenServiceState.map(serviceItem => ({
      ...serviceItem,
      kpiCount: { ...kpiCount }, // Update kpiCount in service object
      // kpi: { ...kpiToUpdate },
      clientName: input.clientName,
    }))
    setTakenServiceState(updatedTakenServiceState)

    let dataForDb = {}
    if (kpiToUpdate.wrapper.complitedKpiTotal) {
      dataForDb = {
        complitedKpiTotal:
          Number(kpiToUpdate.wrapper.complitedKpiTotal) +
          Number(returnTotal(updatedTakenServiceState)),
        cleintName: input.clientName,
      }
    } else {
      dataForDb = {
        complitedKpiTotal: Number(returnTotal(updatedTakenServiceState)),
        cleintName: input.clientName,
      }
    }

    await updateQueryKpi(uniqueClientId, {
      takenService: updatedTakenServiceState,
      kpiuuid: kpiToUpdate?.wrapper?.kpiuuid,
      uniqueClientId,
      complitedKpiTotal: Number(returnTotal(updatedTakenServiceState)),
      cleintName: input.clientName,
    })

    toast.success('Client added successfully', {
      id: 'submit_client',
    })

    router.push('/clientlist')
  }

  useEffect(() => {
    handleTotalPayment()
  }, [
    input.visaPaymentAmount,
    input.hotelPaymentAmount,
    input.healthInsurancePaymentAmount,
    input.localTransportPaymentAmount,
    input.airportPaymentAmount,
    input.airAmbulancePaymentAmount,
    input.opdPaymentAmount,
    input.ipdPaymentAmount,
    input.telimedeicinePaymentAmount,
    input.treatmentPlanPaymentAmount,
    input.excursionPaymentAmount,
    input.reservationPaymentAmount,
  ])

  useEffect(() => {
    handleTotalpaid()
  }, [
    input.visapaidAmount,
    input.hotelpaidAmount,
    input.healthInsurancepaidAmount,
    input.localTransportpaidAmount,
    input.airportpaidAmount,
    input.airAmbulancepaidAmount,
    input.opdpaidAmount,
    input.ipdpaidAmount,
    input.telimedeicinepaidAmount,
    input.treatmentPlanpaidAmount,
    input.excursionpaidAmount,
    input.reservationpaidAmount,
  ])

  useEffect(() => {
    handleTotalDue()
  }, [input.totalPayment, input.totalPaid])

  // Handle Total Payment, Total Paid, Total Due ---------------------------
  const handleTotalPayment = () => {
    const total =
      Number(input.visaPaymentAmount) +
      Number(input.hotelPaymentAmount) +
      Number(input.healthInsurancePaymentAmount) +
      Number(input.localTransportPaymentAmount) +
      Number(input.airportPaymentAmount) +
      Number(input.airAmbulancePaymentAmount) +
      Number(input.opdPaymentAmount) +
      Number(input.ipdPaymentAmount) +
      Number(input.telimedeicinePaymentAmount) +
      Number(input.treatmentPlanPaymentAmount) +
      Number(input.excursionPaymentAmount) +
      Number(input.reservationPaymentAmount)
    setInput({ ...input, totalPayment: total })
  }
  const handleTotalpaid = () => {
    const total =
      Number(input.visapaidAmount) +
      Number(input.hotelpaidAmount) +
      Number(input.healthInsurancepaidAmount) +
      Number(input.localTransportpaidAmount) +
      Number(input.airportpaidAmount) +
      Number(input.airAmbulancepaidAmount) +
      Number(input.opdpaidAmount) +
      Number(input.ipdpaidAmount) +
      Number(input.telimedeicinepaidAmount) +
      Number(input.treatmentPlanpaidAmount) +
      Number(input.excursionpaidAmount) +
      Number(input.reservationpaidAmount)
    setInput({ ...input, totalPaid: total })
  }

  const handleTotalDue = () => {
    const total = Number(input.totalPayment) - Number(input.totalPaid)
    setInput({ ...input, currentlyDue: total })
  }

  // Render followup grid-----------------------------
  const handleAddFollowup = e => {
    setOpdFollowup(prevData => [...prevData, newFollowup])
    setInput(prevInput => ({
      ...prevInput,
      opdFollowupData: [...prevInput.opdFollowupData, newFollowup],
    }))
    setNewFollowup('')
  }

  const handleAddFollowupIpd = e => {
    setIpdFollowup(prevData => [...prevData, newFollowupIpd])
    setInput(prevInput => ({
      ...prevInput,
      ipdFollowupData: [...prevInput.ipdFollowupData, newFollowupIpd],
    }))
    setNewFollowupIpd('')
  }

  //------------------------> set followup data <----------------
  const handleFollowupData = (field, event) => {
    if (field === 'opdFollowupData') {
      const newFollowupData = [...input.opdFollowupData]
      newFollowupData[event.target.dataset.index] = event.target.value
      setInput(prevInput => ({ ...prevInput, [field]: newFollowupData }))
    } else {
      setInput(prevInput => ({ ...prevInput, [field]: event.target.value }))
    }
  }

  const handleFollowupDataIpd = (field, event) => {
    if (field === 'ipdFollowupData') {
      const newFollowupData = [...input.ipdFollowupData]
      newFollowupData[event.target.dataset.index] = event.target.value
      setInput(prevInput => ({ ...prevInput, [field]: newFollowupData }))
    } else {
      setInput(prevInput => ({ ...prevInput, [field]: event.target.value }))
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
      <Card>
        <Typography
          sx={{
            mb: 2.5,
            paddingTop: '20px',
            letterSpacing: '0.15px !important',
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#6C6583',
            fontWeight: 500,
            marginBottom: 0,
          }}
          className="heading_drop_shadow"
        >
          Client Information
        </Typography>
        <Typography
          sx={{
            mb: 7,
            textAlign: 'center',
            fontSize: '.9rem',
            fontWeight: 500,
            marginBottom: 5,
          }}
        >
          {user?.role === 'executive'
            ? `For ${user?.name}`
            : 'Login as Executive to add service'}
        </Typography>
        <Divider sx={{ margin: 0 }} />

        <Divider sx={{ margin: 0 }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            {/* First Form */}
            {firstForm && (
              <>
                <Grid sx={{ marginBottom: 5 }} container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      onChange={e => handleChange('clientName', e)}
                      fullWidth
                      label="Client Name"
                      placeholder="First Last"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      onChange={e => {
                        handleChange('contactNumber', e)
                        handleChange('whatsappNumber', e)
                      }}
                      fullWidth
                      required
                      type="phone"
                      label="Contact Number"
                      placeholder="+880 1234567890"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      onChange={e => handleChange('whatsappNumber', e)}
                      value={input?.whatsappNumber}
                      fullWidth
                      type="phone"
                      label="Whatsapp Number(Optional)"
                      placeholder="+880 1234567890"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      onChange={e => handleChange('email', e)}
                      fullWidth
                      type="email"
                      label="Email(Optional)"
                      placeholder="someone@email.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      onChange={e => handleChange('address', e)}
                      fullWidth
                      label="Address(Optional)"
                      placeholder="Client Address"
                    />
                  </Grid>
                  <Grid item xs={6} sm={5} md={3}>
                    <Button
                      onClick={gotToSecondForm}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {' '}
                      Next{' '}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Second form Service section */}

            {!excursion && secondForm && (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Passport Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={e => handleChange('passportNumber', e)}
                    fullWidth
                    label="Passport No"
                    placeholder=""
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={e => handleChange('dateOfBirth', e)}
                    focused
                    label="Date of Birth"
                    type="date"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={e => {
                      handleChange('passportIssueDate', e)
                      handlePassportExpiryDate(e.target.value)
                    }}
                    focused
                    type="date"
                    fullWidth
                    label="Passport Date of Issue"
                    placeholder="26/03/2019"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={e => handleChange('passportExpiryDate', e)}
                    value={input.passportExpiryDate}
                    focused
                    type="date"
                    fullWidth
                    label="Passport Date of Expiry"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="upload_wrapper">
                    <TextField
                      disabled
                      value={input?.passportImage ? 'Yes' : 'No'}
                      type="text"
                      fullWidth
                      label="Passport Image"
                    />

                    {input.passportImage ? (
                      <>
                        <Button
                          onClick={e =>
                            handleDownloadClick(input.passportImage, e)
                          }
                          className="upload_button"
                          variant="contained"
                        >
                          Download
                        </Button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="passportImage"
                          style={{ display: 'none' }}
                          onChange={e => handleFileInput('passportImage', e)}
                        />

                        <Button
                          onClick={e => handleUploadClick('passportImage', e)}
                          className="upload_button"
                          variant="contained"
                        >
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </Grid>
              </Grid>
            )}

            {secondForm && (
              <>
                <Divider sx={{ margin: 0, marginTop: 5 }} />

                <CardActions>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={visa ? 'visa_background' : 'initial'}
                        onClick={toggleVisa}
                      >
                        Visa
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={
                          reservation ? 'reservation_background' : 'initial'
                        }
                        onClick={toggleReservation}
                      >
                        Reservation & Ticketing
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={
                          insurance ? 'insurance_background' : 'initial'
                        }
                        onClick={toggleInsurance}
                      >
                        Health Insurance
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={hotel ? 'hotel_background' : 'initial'}
                        onClick={toggleHotel}
                      >
                        Hotel
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={transport ? 'local_background' : 'initial'}
                        onClick={toggleTransport}
                      >
                        Local Transport
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={
                          airportMeet ? 'airport_background' : 'initial'
                        }
                        onClick={toggleAirportMeet}
                      >
                        Airport Meet & Greet
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={
                          airAmbulance ? 'air_ambulance_background' : 'initial'
                        }
                        onClick={toggleAirAmbulance}
                      >
                        Air Ambulance
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={doctorOPD ? 'opd_background' : 'initial'}
                        onClick={toggleDoctorOPD}
                      >
                        Doctor's appointment (OPD)
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        className={doctorIPD ? 'ipd_background' : 'initial'}
                        onClick={toggleDoctorIPD}
                      >
                        Doctor's appointment (IPD)
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        className={
                          telemedicine ? 'telimedicine_background' : 'initial'
                        }
                        onClick={toggleTelemedicine}
                      >
                        Telemedicine
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        className={
                          treatmentPlan ? 'treatment_background' : 'initial'
                        }
                        onClick={toggleTreatmentPlan}
                      >
                        Treatment Plan & Cost estimation
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        fullWidth
                        className={
                          interpreter ? 'interpreter_background' : 'initial'
                        }
                        onClick={toggleInterpreter}
                      >
                        Interpreter / Translator Guide / Guardian
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        fullWidth
                        className={
                          excursion ? 'execursion_background' : 'initial'
                        }
                        onClick={toggleExcursion}
                      >
                        Requirement for 5 Years Elite Family Excursion Program
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={5} md={3}>
                    <Button
                      onClick={gotToThirdForm}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {' '}
                      Next{' '}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            <Divider sx={{ marginBottom: 5 }} />

            {visa && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader icon={visaIcon} title={'Visa'} />

                  <Grid item xs={12}>
                    <Typography
                      className="visa_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Visa Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.visaDocumentCollected ? 'Yes' : 'No'}
                        type="text"
                        fullWidth
                        label="Document Collected"
                      />

                      {input.visaDocumentCollected ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.visaDocumentCollected,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="visaDocumentCollected"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('visaDocumentCollected', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('visaDocumentCollected', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.visaRequestForVisa ? 'Yes' : 'No'}
                        type="text"
                        fullWidth
                        label="Requested for visa"
                        placeholder=""
                      />
                      {input.visaRequestForVisa ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.visaRequestForVisa, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="visaRequestForVisa"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('visaRequestForVisa', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('visaRequestForVisa', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.visaCollectionOfPassport ? 'Yes' : 'No'}
                        onChange={e =>
                          handleChange('visaCollectionOfPassport', e)
                        }
                        type="text"
                        fullWidth
                        label="Collection of Passpoarts"
                        placeholder=""
                      />

                      {input.visaCollectionOfPassport ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.visaCollectionOfPassport,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="visaCollectionOfPassport"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('visaCollectionOfPassport', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('visaCollectionOfPassport', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('visaIssueDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Visa Issue Date"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={e => handleChange('visaExpiryDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Visa Expiry Date"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="visa_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Visa Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('visaPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('visapaidAmount', e)
                        // // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.visaPaymentAmount) -
                        Number(input.visapaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('visaDueAmount', e)
                        // // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          onChange={e => handleChange('visapaidToSupplier', e)}
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          value={
                            Number(input.visaPaymentAmount) -
                            Number(input.visapaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          onChange={e =>
                            handleChange('visaRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          onChange={e => handleChange('visaInvoiceComment', e)}
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.visaInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.visaInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.visaInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="visaInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('visaInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('visaInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.visaMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.visaMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.visaMoneyReceipt, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="visaMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('visaMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('visaMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {reservation && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={ticketingIcon}
                    title={'Reservation & Ticketing'}
                  />

                  <Grid item xs={12} className="grid_item">
                    {/* <Grid xs={12} sm={6}> */}
                    <Typography
                      className="reservation_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Reservation & Ticketing Information
                    </Typography>
                    {/* </Grid>
                      <Grid xs={12} sm={6}> */}
                    <Button
                      onClick={() => setOpenPopup(true)}
                      variant="contained"
                    >
                      Ticketing
                    </Button>
                    {/* </Grid> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        value={input.reservationBookingDate}
                        onChange={e =>
                          handleChange('reservationBookingDate', e)
                        }
                        focused
                        type="date"
                        fullWidth
                        label="Booking Date(PNR)"
                        placeholder=""
                      />
                    </div>
                  </Grid>

                  {/* Travel Date condition */}
                  <Grid item xs={12} sm={input.reservationTravelDate ? 3 : 6}>
                    <TextField
                      value={input.reservationTravelDate}
                      onChange={e => handleChange('reservationTravelDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Travel Date"
                      placeholder=""
                    />
                  </Grid>
                  {input.reservationTravelDate && (
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="form-layouts-separator-multiple-select-label">
                          Return Date
                        </InputLabel>
                        <Select
                          single
                          value={input.reservationIsReturnDate}
                          onChange={e =>
                            handleChange('reservationIsReturnDate', e)
                          }
                          id="form-layouts-separator-multiple-select"
                          labelId="form-layouts-separator-multiple-select-label"
                          input={
                            <OutlinedInput
                              label="Language"
                              id="select-multiple-language"
                            />
                          }
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  {input.reservationIsReturnDate && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={input.reservationReturnDateOrOneWay}
                        onChange={e =>
                          handleChange('reservationReturnDateOrOneWay', e)
                        }
                        focused
                        type="date"
                        fullWidth
                        label="Return Date/ One-way"
                        placeholder=""
                      />
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    sm={input.reservationIsReturnDate ? 6 : 12}
                  >
                    <TextField
                      value={input.reservationTicketingTimeLimit}
                      onChange={e =>
                        handleChange('reservationTicketingTimeLimit', e)
                      }
                      fullWidth
                      label="Ticketing time limit"
                      placeholder=""
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={6}>
                      <TextField onChange={(e) => handleChange('reservationTicketingTimeLimit', e)} fullWidth label='Ticketing time limit' placeholder='' />
                    </Grid> */}
                  <Grid item xs={12} sm={4}>
                    {/* <div className="upload_wrapper"> */}
                    <TextField
                      value={input.reservationIssuingDate}
                      onChange={e => handleChange('reservationIssuingDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Issuing Date"
                      placeholder=""
                    />

                    {/* {
                          input.reservationIssuingDateDocument ? (
                            <>
                              <Button onClick={(e) => handleDownloadClick(input.reservationIssuingDateDocument, e)} className='upload_button' variant="contained">Download</Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="reservationIssuingDateDocument"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  handleFileInput('reservationIssuingDateDocument', e, 'reservationIssuingDate')
                                }}
                              />

                              <Button onClick={(e) => handleUploadClick('reservationIssuingDateDocument', e)} className='upload_button' variant="contained">Upload</Button>
                            </>
                          )
                        } */}
                    {/* </div> */}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input.reservationTicketDocument ? 'Yes' : 'No'}
                        focused
                        type="text"
                        fullWidth
                        label="Ticketing Document"
                        placeholder=""
                      />

                      {input.reservationTicketDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.reservationTicketDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="reservationTicketDocument"
                            style={{ display: 'none' }}
                            onChange={e => {
                              handleFileInput(
                                'reservationTicketDocument',
                                e,
                                'reservationReSchedule'
                              )
                            }}
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('reservationTicketDocument', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onChange={e =>
                        handleChange('reservationReScheduleDate', e)
                      }
                      focused
                      type="date"
                      fullWidth
                      label="Reservation re-issue Date"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input.reservationReIssueTicketDocument ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Re issue ticket document"
                        placeholder=""
                      />

                      {input.reservationReIssueTicketDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.reservationReIssueTicketDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="reservationReIssueTicketDocument"
                            style={{ display: 'none' }}
                            onChange={e => {
                              handleFileInput(
                                'reservationReIssueTicketDocument',
                                e,
                                'reservationReIssueDate'
                              )
                            }}
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'reservationReIssueTicketDocument',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={input.reservationRctivationAxularyService ? 3 : 6}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Activation Auxililary Services
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={input.reservationRctivationAxularyService}
                        label="Activation Auxililary Services"
                        onChange={e =>
                          handleChange('reservationRctivationAxularyService', e)
                        }
                        displayEmpty
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {input.reservationRctivationAxularyService && (
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Please select the services
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={input.reservationSelectedAxularyServices}
                          label="Please select the services"
                          onChange={e =>
                            handleChange(
                              'reservationSelectedAxularyServices',
                              e
                            )
                          }
                          displayEmpty
                          multiple
                          sx={{ width: '100%' }}
                        >
                          <MenuItem value={undefined}>
                            Please select the services
                          </MenuItem>
                          <MenuItem value={'Wheelchair'}>Wheelchair</MenuItem>
                          <MenuItem value={'Seat Assignment'}>
                            Seat Assignment
                          </MenuItem>
                          <MenuItem value={'Meal Request'}>
                            Meal Request
                          </MenuItem>
                          <MenuItem value={'Check in Bags'}>
                            Check in Bags
                          </MenuItem>
                          <MenuItem value={'Baby Bassinet'}>
                            Baby Bassinet
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="reservation_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Reservation & Ticketing Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('reservationPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('reservationpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.reservationPaymentAmount) -
                        Number(input.reservationpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('reservationDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('reservationpaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.reservationPaymentAmount) -
                            Number(input.reservationpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('reservationRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('reservationInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.reservationInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.reservationInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.reservationInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="reservationInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('reservationInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('reservationInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.reservationMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.reservationMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.reservationMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="reservationMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('reservationMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'reservationMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {insurance && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={healthInsuranceIcon}
                    title={'Health Insurance'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="insurance_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Insurance Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('healthInsuranceAddress', e)}
                      fullWidth
                      label="Address"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e =>
                        handleChange('healthInsuranceContactNumber', e)
                      }
                      fullWidth
                      label="Contact Number"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input.healthInsuranceIssueDate
                            ? input.healthInsuranceIssueDate
                            : new Date().toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                        }
                        focused
                        type="text"
                        fullWidth
                        label="Issue Date/ Date of Purchase"
                        placeholder=""
                      />

                      {input.healthInsuranceIssueDateDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.healthInsuranceIssueDateDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="healthInsuranceIssueDateDocument"
                            style={{ display: 'none' }}
                            onChange={e => {
                              handleFileInput(
                                'healthInsuranceIssueDateDocument',
                                e,
                                'healthInsuranceIssueDate'
                              )
                            }}
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'healthInsuranceIssueDateDocument',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e =>
                        handleChange('healthInsuranceNumberIfDaysCovered', e)
                      }
                      fullWidth
                      label="Number of days covered"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={e =>
                        handleChange('healthInsuranceExpiryDate', e)
                      }
                      focused
                      type="date"
                      fullWidth
                      label="Expiry Date/ Period of coverage"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="insurance_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Health Insurance Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('healthInsurancePaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('healthInsurancepaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.healthInsurancePaymentAmount) -
                        Number(input.healthInsurancepaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('healthInsuranceDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('healthInsurancepaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.healthInsurancePaymentAmount) -
                            Number(input.healthInsurancepaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange(
                              'healthInsuranceRemarksOrRequirement',
                              e
                            )
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('healthInsuranceInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.healthInsuranceInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.healthInsuranceInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.healthInsuranceInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="healthInsuranceInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('healthInsuranceInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('healthInsuranceInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.healthInsuranceMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.healthInsuranceMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.healthInsuranceMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="healthInsuranceMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput(
                                    'healthInsuranceMoneyReceipt',
                                    e
                                  )
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'healthInsuranceMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {hotel && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader icon={hotelIcon} title={'Hotel'} />

                  <Grid item xs={12}>
                    <Typography
                      className="hotel_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Hotel Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('hotelName', e)}
                      fullWidth
                      label="Hotel Name/ Location"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('hotelPhoneOrEmail', e)}
                      fullWidth
                      label="Phone | Line | Eamil"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('hotelCheckInDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Check-in-date"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input.hotelCheckInDateDocumentUploadOn
                            ? input.hotelCheckInDateDocumentUploadOn
                            : new Date().toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                        }
                        focused
                        type="text"
                        fullWidth
                        label="Check In Doc Upload on"
                        placeholder=""
                      />

                      {input.hotelCheckInDateDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.hotelCheckInDateDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="hotelCheckInDateDocument"
                            style={{ display: 'none' }}
                            onChange={e => {
                              handleFileInput(
                                'hotelCheckInDateDocument',
                                e,
                                'hotelCheckInDateDocumentUploadOn'
                              )
                            }}
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('hotelCheckInDateDocument', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onChange={e => handleChange('hotelCheckOutDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Check-out-date"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onChange={e =>
                        handleChange('hotelNumberOfAdultsOrChildren', e)
                      }
                      fullWidth
                      label="Number of Adults | Children"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onChange={e => handleChange('hotelNumberOfRooms', e)}
                      fullWidth
                      label="Number of Rooms"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="hotel_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Hotel Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('hotelPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('hotelpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.hotelPaymentAmount) -
                        Number(input.hotelpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('hotelDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('hotelpaidToSupplier', e)}
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.hotelPaymentAmount) -
                            Number(input.hotelpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('hotelRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('hotelInvoiceComment', e)}
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.hotelInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.hotelInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.hotelInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="hotelInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('hotelInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('hotelInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.hotelMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.hotelMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.hotelMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="hotelMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('hotelMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('hotelMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {transport && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={localTransportIcon}
                    title={'Local Transport'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="local_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Local Transport
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('localTransportLocation', e)}
                      fullWidth
                      label="Location"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('localTransportDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Date"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={e => handleChange('localTransportTime', e)}
                      fullWidth
                      label="Time"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="local_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Local Transport Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('localTransportPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('localTransportpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.localTransportPaymentAmount) -
                        Number(input.localTransportpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('localTransportDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('localTransportpaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.localTransportPaymentAmount) -
                            Number(input.localTransportpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange(
                              'localTransportRemarksOrRequirement',
                              e
                            )
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('localTransportInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.localTransportInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.localTransportInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.localTransportInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="localTransportInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('localTransportInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('localTransportInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.localTransportMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.localTransportMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.localTransportMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="localTransportMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput(
                                    'localTransportMoneyReceipt',
                                    e
                                  )
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'localTransportMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {airportMeet && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={airportMeetIcon}
                    title={'Airport Meet & Greet'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="airport_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Airport Meet & Greet
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('airportTicket', e)}
                      fullWidth
                      label="Ticket copy"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('airportRegularPicture', e)}
                      fullWidth
                      label="Regular Picture(if any)"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="airport_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Airport Meet & Greet Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('airportPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('airportpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.airportPaymentAmount) -
                        Number(input.airportpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('airportDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airportpaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.airportPaymentAmount) -
                            Number(input.airportpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airportRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airportInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.airportInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.airportInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.airportInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="airportInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('airportInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('airportInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.airportMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.airportMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.airportMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="airportMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('airportMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('airportMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {airAmbulance && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={airAmbulanceIcon}
                    title={'Air Ambulance'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="air_ambulance_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Air Ambulance
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.airAmbulanceMedicalDocument ? 'Yes' : 'No'
                        }
                        focused
                        type="text"
                        fullWidth
                        label="Latest Medical Document"
                        placeholder=""
                      />

                      {input.airAmbulanceMedicalDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.airAmbulanceMedicalDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="airAmbulanceMedicalDocument"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('airAmbulanceMedicalDocument', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'airAmbulanceMedicalDocument',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.airAmbulanceMedicalConditionDetails
                            ? 'Yes'
                            : 'No'
                        }
                        fullWidth
                        label="Medical Condition Details"
                        placeholder=""
                      />

                      {input.airAmbulanceMedicalConditionDetails ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.airAmbulanceMedicalConditionDetails,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="airAmbulanceMedicalConditionDetails"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'airAmbulanceMedicalConditionDetails',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'airAmbulanceMedicalConditionDetails',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e =>
                        handleChange('airAmbulanceNumberOfAttendance', e)
                      }
                      fullWidth
                      label="No of Attendance"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      onChange={e =>
                        handleChange('airAmbulanceActivationOfVisa', e)
                      }
                      fullWidth
                      label="Activation of Visas"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={input.airAmbulanceActivationOfTicket}
                      onChange={e =>
                        handleChange('airAmbulanceActivationOfTicket', e)
                      }
                      fullWidth
                      label="Activation of Tickets"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="air_ambulance_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Air Ambulance Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role !== 'executive' && user.role !== 'supervisor'
                        ? 3
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('airAmbulancePaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role !== 'executive' && user.role !== 'supervisor'
                        ? 3
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('airAmbulancepaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role !== 'executive' && user.role !== 'supervisor'
                        ? 3
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.airAmbulancePaymentAmount) -
                        Number(input.airAmbulancepaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('airAmbulanceDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airAmbulancepaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.airAmbulancePaymentAmount) -
                            Number(input.airAmbulancepaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airAmbulanceRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('airAmbulanceInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.airAmbulanceInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.airAmbulanceInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.airAmbulanceInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="airAmbulanceInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('airAmbulanceInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('airAmbulanceInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.airAmbulanceMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.airAmbulanceMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.airAmbulanceMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="airAmbulanceMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('airAmbulanceMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'airAmbulanceMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {doctorOPD && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={doctorSelectionIcon}
                    title={"Doctor's appointment(OPD)"}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="opd_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Doctor's appointment(OPD)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        type="text"
                        focused
                        value={input?.opdLatestMedicalDocument ? 'Yes' : 'No'}
                        fullWidth
                        label="Latest Medical Document"
                        placeholder=""
                      />

                      {input.opdLatestMedicalDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.opdLatestMedicalDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="opdLatestMedicalDocument"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('opdLatestMedicalDocument', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('opdLatestMedicalDocument', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        type="text"
                        focused
                        value={input?.opdAppointmentForm ? 'Yes' : 'No'}
                        fullWidth
                        label="Appoint form(if any)"
                        placeholder=""
                      />

                      {input.opdAppointmentForm ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.opdAppointmentForm, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="opdAppointmentForm"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('opdAppointmentForm', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('opdAppointmentForm', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.opdDraftPrepared ? 'Yes' : 'No'}
                        fullWidth
                        label="Draft Prepared(Y/N)"
                        placeholder=""
                      />

                      {input.opdDraftPrepared ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.opdDraftPrepared, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="opdDraftPrepared"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('opdDraftPrepared', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('opdDraftPrepared', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.opdMailSentToHospital ? 'Yes' : 'No'}
                        fullWidth
                        label="Mail sent to Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.opdMailSentToHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.opdMailSentToHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="opdMailSentToHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('opdMailSentToHospital', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('opdMailSentToHospital', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.opdReplyFromHospital ? 'Yes' : 'No'}
                        fullWidth
                        label="Reply from Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.opdReplyFromHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.opdReplyFromHospital, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="opdReplyFromHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('opdReplyFromHospital', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('opdReplyFromHospital', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Brief to Team
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={input.opdBriefToTeam}
                        label="Brief to Team"
                        onChange={e => handleChange('opdBriefToTeam', e)}
                        displayEmpty
                        sx={{ width: '100%' }} // Add this line
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Delived to Patient
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={input.opdDeliveredToPatient}
                        label="Delived to Patient"
                        onChange={e => handleChange('opdDeliveredToPatient', e)}
                        displayEmpty
                        sx={{ width: '100%' }} // Add this line
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('opdDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Doctor's appointment-OPD(Date)"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={input.opdReturnDateFromHospital}
                      onChange={e =>
                        handleChange('opdReturnDateFromHospital', e)
                      }
                      focused
                      type="date"
                      fullWidth
                      label="Return Date From Hospital"
                      placeholder=""
                    />
                  </Grid>

                  {opdFollowup.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <div className="upload_wrapper">
                        <TextField
                          onChange={e =>
                            handleFollowupData('opdFollowupData', e)
                          }
                          fullWidth
                          label="Followup Data"
                          placeholder=""
                          value={item}
                        />
                      </div>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        fullWidth
                        label="Followup Data"
                        placeholder=""
                        value={newFollowup}
                        onChange={e => {
                          setNewFollowup(e.target.value)
                          handleFollowupData('opdFollowupData', e)
                        }}
                      />
                      <Button
                        className="upload_button"
                        onClick={handleAddFollowup}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </div>
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="opd_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Doctor Appointment(OPD) Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('opdPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('opdpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.opdPaymentAmount) -
                        Number(input.opdpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('opdDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('opdpaidToSupplier', e)}
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.opdPaymentAmount) -
                            Number(input.opdpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('opdRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('opdInvoiceComment', e)}
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.opdInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.opdInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.opdInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="opdInvoice"
                                style={{ display: 'none' }}
                                onChange={e => handleFileInput('opdInvoice', e)}
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('opdInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.opdMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.opdMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.opdMoneyReceipt, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="opdMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('opdMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('opdMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {doctorIPD && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={doctorSelectionIcon}
                    title={"Doctor's appointment(IPD)"}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="ipd_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Doctor's appointment(IPD)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        type="text"
                        focused
                        value={input?.ipdLatestMedicalDocument ? 'Yes' : 'No'}
                        fullWidth
                        label="Latest Medical Document"
                        placeholder=""
                      />

                      {input.ipdLatestMedicalDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.ipdLatestMedicalDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdLatestMedicalDocument"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdLatestMedicalDocument', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdLatestMedicalDocument', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        type="text"
                        focused
                        value={input?.ipdAppointmentForm ? 'Yes' : 'No'}
                        fullWidth
                        label="Appoint form(if any)"
                        placeholder=""
                      />

                      {input.ipdAppointmentForm ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.ipdAppointmentForm, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdAppointmentForm"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdAppointmentForm', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdAppointmentForm', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.ipdDraftPrepared ? 'Yes' : 'No'}
                        fullWidth
                        label="Draft Prepared(Y/N)"
                        placeholder=""
                      />

                      {input.ipdDraftPrepared ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.ipdDraftPrepared, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdDraftPrepared"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdDraftPrepared', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdDraftPrepared', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.ipdMailSentToHospital ? 'Yes' : 'No'}
                        fullWidth
                        label="Mail sent to Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.ipdMailSentToHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.ipdMailSentToHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdMailSentToHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdMailSentToHospital', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdMailSentToHospital', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.ipdReplyFromHospital ? 'Yes' : 'No'}
                        fullWidth
                        label="Reply from Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.ipdReplyFromHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.ipdReplyFromHospital, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdReplyFromHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdReplyFromHospital', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdReplyFromHospital', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.ipdBriefToTeam ? 'Yes' : 'No'}
                        fullWidth
                        label="Brief to team(Y/N)"
                        placeholder=""
                      />

                      {input.ipdBriefToTeam ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.ipdBriefToTeam, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdBriefToTeam"
                            style={{ display: 'none' }}
                            onChange={e => handleFileInput('ipdBriefToTeam', e)}
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdBriefToTeam', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.ipdDeliveredToPatient ? 'Yes' : 'No'}
                        fullWidth
                        label="Delived to Patient(Y/N)"
                        placeholder=""
                      />

                      {input.ipdDeliveredToPatient ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.ipdDeliveredToPatient,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="ipdDeliveredToPatient"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('ipdDeliveredToPatient', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('ipdDeliveredToPatient', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('ipdDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Doctor's appointment-IPD(Date)"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={input.ipdReturnDateFromHospital}
                      onChange={e =>
                        handleChange('ipdReturnDateFromHospital', e)
                      }
                      focused
                      type="date"
                      fullWidth
                      label="Return Date From Hospital"
                      placeholder=""
                    />
                  </Grid>

                  {ipdFollowup.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <div className="upload_wrapper">
                        <TextField
                          onChange={e =>
                            handleFollowupDataIpd('ipdFollowupData', e)
                          }
                          fullWidth
                          label="Followup Data"
                          placeholder=""
                          value={item}
                        />
                      </div>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        fullWidth
                        label="Followup Data"
                        placeholder=""
                        value={newFollowupIpd}
                        onChange={e => {
                          setNewFollowupIpd(e.target.value)
                          handleFollowupDataIpd('ipdFollowupData', e)
                        }}
                      />
                      <Button
                        className="upload_button"
                        onClick={handleAddFollowupIpd}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </div>
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography
                      className="ipd_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Doctor Appointment(IPD) Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('ipdPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('ipdpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.ipdPaymentAmount) -
                        Number(input.ipdpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('ipdDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('ipdpaidToSupplier', e)}
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.ipdPaymentAmount) -
                            Number(input.ipdpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('ipdRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => handleChange('ipdInvoiceComment', e)}
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.ipdInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.ipdInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.ipdInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="ipdInvoice"
                                style={{ display: 'none' }}
                                onChange={e => handleFileInput('ipdInvoice', e)}
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('ipdInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.ipdMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.ipdMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.ipdMoneyReceipt, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="ipdMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('ipdMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('ipdMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {telemedicine && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={telemedicineIcon}
                    title={'Telemedicine'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="telimedicine_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Telemedicine
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.telimedeicineLatestMedicalDocument
                            ? 'Yes'
                            : 'No'
                        }
                        fullWidth
                        label="Latest Medical Document"
                        placeholder=""
                      />

                      {input.telimedeicineLatestMedicalDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineLatestMedicalDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineLatestMedicalDocument"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'telimedeicineLatestMedicalDocument',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'telimedeicineLatestMedicalDocument',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.telimedeicineAppointmentForm ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Appoint form(if any)"
                        placeholder=""
                      />

                      {input.telimedeicineAppointmentForm ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineAppointmentForm,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineAppointmentForm"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('telimedeicineAppointmentForm', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'telimedeicineAppointmentForm',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.telimedeicineDraftPrepared ? 'Yes' : 'No'}
                        fullWidth
                        label="Draft Prepared(Y/N)"
                        placeholder=""
                      />

                      {input.telimedeicineDraftPrepared ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineDraftPrepared,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineDraftPrepared"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('telimedeicineDraftPrepared', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('telimedeicineDraftPrepared', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.telimedeicineMailSentToHospital ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Mail sent to Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.telimedeicineMailSentToHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineMailSentToHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineMailSentToHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'telimedeicineMailSentToHospital',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'telimedeicineMailSentToHospital',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.telimedeicineReplyFromHospital ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Reply from Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.telimedeicineReplyFromHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineReplyFromHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineReplyFromHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'telimedeicineReplyFromHospital',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'telimedeicineReplyFromHospital',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.telimedeicineBriefToTeam ? 'Yes' : 'No'}
                        fullWidth
                        label="Brief to team(Y/N)"
                        placeholder=""
                      />

                      {input.telimedeicineBriefToTeam ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineBriefToTeam,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineBriefToTeam"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('telimedeicineBriefToTeam', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('telimedeicineBriefToTeam', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.telimedeicineDeliveredToPatient ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Delived to Patient(Y/N)"
                        placeholder=""
                      />

                      {input.telimedeicineDeliveredToPatient ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.telimedeicineDeliveredToPatient,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="telimedeicineDeliveredToPatient"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'telimedeicineDeliveredToPatient',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'telimedeicineDeliveredToPatient',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('telimedeicineDate', e)}
                      focused
                      type="date"
                      fullWidth
                      label="Telemedicine(Date)"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Telimedicine Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('telimedeicinePaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('telimedeicinepaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.telimedeicinePaymentAmount) -
                        Number(input.telimedeicinepaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('telimedeicineDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('telimedeicinepaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.telimedeicinePaymentAmount) -
                            Number(input.telimedeicinepaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('telimedeicineRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('telimedicineInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.telimedeicineInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.telimedeicineInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.telimedeicineInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="telimedeicineInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('telimedeicineInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('telimedeicineInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.telimedeicineMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.telimedeicineMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.telimedeicineMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="telimedeicineMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput(
                                    'telimedeicineMoneyReceipt',
                                    e
                                  )
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'telimedeicineMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
            {treatmentPlan && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={hospitalSelectionIcon}
                    title={'Treatment Plan & Cost estimation'}
                  />

                  <Grid item xs={12}>
                    <Typography
                      className="treatment_color"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Treatment Plan & Cost estimation
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.treatmentPlanLatestMedicalDocument
                            ? 'Yes'
                            : 'No'
                        }
                        fullWidth
                        label="Latest Medical Document"
                        placeholder=""
                      />

                      {input.treatmentPlanLatestMedicalDocument ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanLatestMedicalDocument,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanLatestMedicalDocument"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'treatmentPlanLatestMedicalDocument',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'treatmentPlanLatestMedicalDocument',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.treatmentPlanDraftPrepared ? 'Yes' : 'No'}
                        fullWidth
                        label="Draft Prepared(Y/N)"
                        placeholder=""
                      />

                      {input.treatmentPlanDraftPrepared ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanDraftPrepared,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanDraftPrepared"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('treatmentPlanDraftPrepared', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('treatmentPlanDraftPrepared', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.treatmentPlanMailSentToHospital ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Mail sent to Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.treatmentPlanMailSentToHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanMailSentToHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanMailSentToHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'treatmentPlanMailSentToHospital',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'treatmentPlanMailSentToHospital',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.treatmentPlanReplyFromHospital ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Reply from Hospital(Y/N)"
                        placeholder=""
                      />

                      {input.treatmentPlanReplyFromHospital ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanReplyFromHospital,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanReplyFromHospital"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'treatmentPlanReplyFromHospital',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'treatmentPlanReplyFromHospital',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.treatmentPlanBriefToTeam ? 'Yes' : 'No'}
                        fullWidth
                        label="Brief to team(Y/N)"
                        placeholder=""
                      />

                      {input.treatmentPlanBriefToTeam ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanBriefToTeam,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanBriefToTeam"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('treatmentPlanBriefToTeam', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('treatmentPlanBriefToTeam', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={
                          input?.treatmentPlanDeliveredToPatient ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Delived to Patient(Y/N)"
                        placeholder=""
                      />

                      {input.treatmentPlanDeliveredToPatient ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.treatmentPlanDeliveredToPatient,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="treatmentPlanDeliveredToPatient"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'treatmentPlanDeliveredToPatient',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'treatmentPlanDeliveredToPatient',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={e =>
                        handleChange('treatmentPlanExicutedDate', e)
                      }
                      focused
                      type="date"
                      fullWidth
                      label="Exicuted Date of Hospital Visit"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Treatment Plan & Cost Estimation Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('treatmentPlanPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('treatmentPlanpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.treatmentPlanPaymentAmount) -
                        Number(input.treatmentPlanpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('treatmentPlanDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('treatmentPlanpaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.treatmentPlanPaymentAmount) -
                            Number(input.treatmentPlanpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('treatmentPlanRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('treatmentPlanInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Commnet"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.treatmentPlanInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.treatmentPlanInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.treatmentPlanInvoice,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="treatmentPlanInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('treatmentPlanInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('treatmentPlanInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={
                              input?.treatmentPlanMoneyReceipt ? 'Yes' : 'No'
                            }
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.treatmentPlanMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.treatmentPlanMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="treatmentPlanMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput(
                                    'treatmentPlanMoneyReceipt',
                                    e
                                  )
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick(
                                    'treatmentPlanMoneyReceipt',
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {interpreter && thirdForm && (
              <Grid
                className="devider_color"
                sx={{ marginBottom: 5 }}
                container
                spacing={5}
              >
                <ServiceHeader
                  icon={guideManageIcon}
                  title={'Interpreter | Translator Guide | Guardian'}
                />

                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Interpreter | Translator Guide | Guardian
                  </Typography>
                </Grid>
              </Grid>
            )}

            {excursion && thirdForm && (
              <>
                <Grid
                  className="devider_color"
                  sx={{ marginBottom: 5 }}
                  container
                  spacing={5}
                >
                  <ServiceHeader
                    icon={guideManageIcon}
                    title={'Requirement for 5 Years EFEP'}
                  />

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Requirement for 5 Years EFEP
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={input?.excursionScanedPassport ? 'Yes' : 'No'}
                        fullWidth
                        label="Scan passport with stamp pages"
                        placeholder=""
                      />

                      {input.excursionScanedPassport ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.excursionScanedPassport,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionScanedPassport"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('excursionScanedPassport', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('excursionScanedPassport', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={input?.excursionPhotograph ? 'Yes' : 'No'}
                        fullWidth
                        label="Photograph(White background)(soft copy) size 4.5 x 3.5"
                        placeholder=""
                      />

                      {input.excursionPhotograph ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(input.excursionPhotograph, e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionPhotograph"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('excursionPhotograph', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('excursionPhotograph', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      focused
                      value={input.excursionThiVisaExpireDate}
                      onChange={e =>
                        handleChange('excursionThiVisaExpireDate', e)
                      }
                      fullWidth
                      label="Do you have any Thai visa now? If yes, what is the expiry date & visa issued"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        value={input?.excursionEliteVisaOrStamp ? 'Yes' : 'No'}
                        fullWidth
                        label="Do you have at least 3 empty pages on your passport for Elite visa and custom stamp"
                        placeholder=""
                      />

                      {input.excursionEliteVisaOrStamp ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.excursionEliteVisaOrStamp,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionEliteVisaOrStamp"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('excursionEliteVisaOrStamp', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('excursionEliteVisaOrStamp', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.excursionMarriageCertificate ? 'Yes' : 'No'
                        }
                        fullWidth
                        label="Marriage Certificate(if wige do Elite visa)"
                        placeholder=""
                      />

                      {input.excursionMarriageCertificate ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.excursionMarriageCertificate,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionMarriageCertificate"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('excursionMarriageCertificate', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'excursionMarriageCertificate',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={input?.excursionBirthCertificate ? 'Yes' : 'No'}
                        fullWidth
                        label="Birth Certificate of child(if child do Elite visa)"
                        placeholder=""
                      />

                      {input.excursionBirthCertificate ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.excursionBirthCertificate,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionBirthCertificate"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput('excursionBirthCertificate', e)
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick('excursionBirthCertificate', e)
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('excursionPresentAddress', e)}
                      fullWidth
                      label="Present address"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e =>
                        handleChange('excursionPermanentAddress', e)
                      }
                      fullWidth
                      label="Parmanent address"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('excursionEmail', e)}
                      fullWidth
                      label="Email address"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('excursionPhone', e)}
                      fullWidth
                      label="Phone number"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('excursionOccupation', e)}
                      fullWidth
                      label="Occupation/Status"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={e => handleChange('excursionBusinessName', e)}
                      fullWidth
                      label="Business Name and Business Card"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="upload_wrapper">
                      <TextField
                        disabled
                        focused
                        type="text"
                        value={
                          input?.excursionConfirmationLetterFromThiland
                            ? 'Yes'
                            : 'No'
                        }
                        fullWidth
                        label="Confirmation letter received from Thiland Elite"
                        placeholder=""
                      />

                      {input.excursionConfirmationLetterFromThiland ? (
                        <>
                          <Button
                            onClick={e =>
                              handleDownloadClick(
                                input.excursionConfirmationLetterFromThiland,
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="excursionConfirmationLetterFromThiland"
                            style={{ display: 'none' }}
                            onChange={e =>
                              handleFileInput(
                                'excursionConfirmationLetterFromThiland',
                                e
                              )
                            }
                          />

                          <Button
                            onClick={e =>
                              handleUploadClick(
                                'excursionConfirmationLetterFromThiland',
                                e
                              )
                            }
                            className="upload_button"
                            variant="contained"
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Grid sx={{ marginBottom: 15 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Excursion Program Payment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('excursionPaymentAmount', e)
                        // handleTotalPayment()
                      }}
                      fullWidth
                      label="Payment Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      onChange={e => {
                        handleChange('excursionpaidAmount', e)
                        // handleTotalpaid()
                      }}
                      fullWidth
                      label="Paid Amount"
                      placeholder=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      user.role === 'executive' || user.role === 'supervisor'
                        ? 4
                        : 6
                    }
                  >
                    <TextField
                      value={
                        Number(input.excursionPaymentAmount) -
                        Number(input.excursionpaidAmount)
                      }
                      disabled
                      onChange={e => {
                        handleChange('excursionDueAmount', e)
                        // handleTotalDue()
                      }}
                      fullWidth
                      label="Due Amount"
                      placeholder=""
                    />
                  </Grid>
                  {user.role !== 'executive' && user.role !== 'supervisor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('excursionpaidToSupplier', e)
                          }
                          fullWidth
                          label="paid to supplier"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={
                            Number(input.excursionPaymentAmount) -
                            Number(input.excursionpaidToSupplier)
                          }
                          disabled
                          fullWidth
                          label="Profit/Loss"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('excursionRemarksOrRequirement', e)
                          }
                          fullWidth
                          label="Remarks/Requirement"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e =>
                            handleChange('excursionInvoiceComment', e)
                          }
                          fullWidth
                          label="Invoice Comment"
                          placeholder=""
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.excursionInvoice ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Invoice"
                          />

                          {input.excursionInvoice ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(input.excursionInvoice, e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="excursionInvoice"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('excursionInvoice', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('excursionInvoice', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="upload_wrapper">
                          <TextField
                            disabled
                            value={input?.excursionMoneyReceipt ? 'Yes' : 'No'}
                            type="text"
                            fullWidth
                            label="Money Receipt"
                          />

                          {input.excursionMoneyReceipt ? (
                            <>
                              <Button
                                onClick={e =>
                                  handleDownloadClick(
                                    input.excursionMoneyReceipt,
                                    e
                                  )
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Download
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                id="excursionMoneyReceipt"
                                style={{ display: 'none' }}
                                onChange={e =>
                                  handleFileInput('excursionMoneyReceipt', e)
                                }
                              />

                              <Button
                                onClick={e =>
                                  handleUploadClick('excursionMoneyReceipt', e)
                                }
                                className="upload_button"
                                variant="contained"
                              >
                                Upload
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            {thirdForm && (
              <>
                <Divider sx={{ marginBottom: 5, marginTop: 7 }} />

                <Grid sx={{ marginBottom: 5 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Account Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      value={input.totalPayment}
                      onChange={e => handleChange('totalPayment', e)}
                      fullWidth
                      label="Total Payment"
                      placeholder="BDT"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      value={input.totalPaid}
                      onChange={e => handleChange('totalPaid', e)}
                      fullWidth
                      label="Total Paid"
                      placeholder="BDT"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      value={input.currentlyDue}
                      onChange={e => handleChange('currentlyDue', e)}
                      fullWidth
                      label="Currently Due"
                      placeholder=""
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ marginBottom: 5, marginTop: 7 }} />

                <Grid sx={{ marginBottom: 5 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Feedback
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      onChange={e => handleChange('comment', e)}
                      className="custom_focus"
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Comment"
                      style={{
                        width: '100%',
                        height: 55,
                        borderRadius: 6,
                        border: '1px solid #ced4da',
                        padding: 10,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>

          {thirdForm && (
            <>
              <Divider sx={{ margin: 0 }} />
              <CardActions>
                <Button
                  onClick={handleSubmit}
                  size="large"
                  type="submit"
                  sx={{ mr: 2 }}
                  variant="contained"
                >
                  Submit
                </Button>
                <Button size="large" color="secondary" variant="outlined">
                  Cancel
                </Button>
              </CardActions>
            </>
          )}
        </form>
      </Card>

      {isSpinner && <SpinnerPopup setOpenPopup={setIsSpinner} />}

      {reservation && openPopup && (
        <Popup setReservation={setReservation} setOpenPopup={setOpenPopup} />
      )}

      {leadPopup && (
        <LeadDetailsPopup setOpenPopup={setLeadPopup} data={lead} />
      )}

      {/* <Toaster /> */}
    </>
  )
}

export default AddClient
