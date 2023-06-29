// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwyIv6ZsP0UynmcZ4cJrwPxA6_efXTv_A",
  authDomain: "brevi-8800c.firebaseapp.com",
  projectId: "brevi-8800c",
  storageBucket: "brevi-8800c.appspot.com",
  messagingSenderId: "192451930912",
  appId: "1:192451930912:web:26f3bd8a160c90efcd8545"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;