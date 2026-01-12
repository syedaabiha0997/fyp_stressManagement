import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7CwJcBcEfvAZQt1LzT5exVXpx4-aZpS0",
  authDomain: "stressmanagementfyp.firebaseapp.com",
  projectId: "stressmanagementfyp",
  storageBucket: "stressmanagementfyp.firebasestorage.app",
  messagingSenderId: "7574848560",
  appId: "1:7574848560:web:8f836913bdb133060419f5",
  measurementId: "G-XR0YX4XQER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;