
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAB_UIUoinmAblq6NRBOfOSKlA5SJnPxJc",
  authDomain: "nexus-e4168.firebaseapp.com",
  projectId: "nexus-e4168",
  storageBucket: "nexus-e4168.firebasestorage.app",
  messagingSenderId: "469673231022",
  appId: "1:469673231022:web:416335a818322b04bb633f",
  measurementId: "G-P2F0WCQYWM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
