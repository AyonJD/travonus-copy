import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
// import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBjopd_nWfDj4DiINblEABTHHN9DC_HCPA',
  authDomain: 'cms-travonus-27cfa.firebaseapp.com',
  projectId: 'cms-travonus-27cfa',
  storageBucket: 'cms-travonus-27cfa.appspot.com',
  messagingSenderId: '321312710127',
  appId: '1:321312710127:web:cd9f7f1b98d5f2d983aa1a',
  measurementId: 'G-4L6Y1QNRNV',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

export { auth, db, storage }
