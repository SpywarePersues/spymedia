import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-p48u-V-yNJwf2WXkcwR_8CMo6wH9PaQ",
    authDomain: "byte-it-project.firebaseapp.com",
    projectId: "byte-it-project",
    storageBucket: "byte-it-project.appspot.com",
    messagingSenderId: "18304181492",
    appId: "1:18304181492:web:008096a1c0b34c4e50eaa1"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
