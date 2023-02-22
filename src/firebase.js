// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfotPPSOH_ySUJbDDRVQiY526MMBpWiRQ",
  authDomain: "thegreenspoon-9a653.firebaseapp.com",
  projectId: "thegreenspoon-9a653",
  storageBucket: "thegreenspoon-9a653.appspot.com",
  messagingSenderId: "828296946258",
  appId: "1:828296946258:web:d0fe8b7a0c4a38b091358b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)