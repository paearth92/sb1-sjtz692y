import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBl2H_GyBE_ANWiMo-FDJWSzaHW0a-iaQM",
  authDomain: "boost-hotsheet.firebaseapp.com",
  projectId: "boost-hotsheet",
  storageBucket: "boost-hotsheet.firebasestorage.app",
  messagingSenderId: "1032040361190",
  appId: "1:1032040361190:web:8dba2ba7749262245c1f27",
  measurementId: "G-0J8E4YP6NM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);