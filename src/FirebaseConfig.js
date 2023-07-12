// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6zfstQXybPPtIzbxRhd04_Uq8cn14r00',
  authDomain: 'reactshop-coderhouse.firebaseapp.com',
  projectId: 'reactshop-coderhouse',
  storageBucket: 'reactshop-coderhouse.appspot.com',
  messagingSenderId: '162777741058',
  appId: '1:162777741058:web:09a2e97159c6789798741b',
  measurementId: 'G-ZZ8GXFFD92',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
