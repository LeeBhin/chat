import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAv59zYmtwMzQEoRwo5hR_n5IXaL-EGSNc",
    authDomain: "chatchat-f6990.firebaseapp.com",
    projectId: "chatchat-f6990",
    storageBucket: "chatchat-f6990.appspot.com",
    messagingSenderId: "145214701507",
    appId: "1:145214701507:web:796ce3ee03b1f599c50776",
    measurementId: "G-4P0LXGQESW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()