import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_EgQ-ccLViGPJf_ydgA8UKWeb8igcqQI",
    authDomain: "chat-192b4.firebaseapp.com",
    projectId: "chat-192b4",
    storageBucket: "chat-192b4.appspot.com",
    messagingSenderId: "784720733661",
    appId: "1:784720733661:web:68b2f4bbb7e7a1e8c68234",
    measurementId: "G-TP745YMWVN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()