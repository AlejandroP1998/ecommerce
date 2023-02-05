import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnrgjFnjEw88OxwHd6l01pzmcca5yd51c",
  authDomain: "e-commerce-react-01.firebaseapp.com",
  projectId: "e-commerce-react-01",
  storageBucket: "e-commerce-react-01.appspot.com",
  messagingSenderId: "837703558768",
  appId: "1:837703558768:web:dce5992fb88ba01dd5b6b5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()