// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {

getFirestore,

collection,

addDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import{

getDocs

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Paste YOUR config here
const firebaseConfig = {

    apiKey: "AIzaSyDUuMbWKa5XNhTHPZ6oumpKIvhppji9s5s",

    authDomain: "aceinterview-3c3fd.firebaseapp.com",

    projectId: "aceinterview-3c3fd",

    storageBucket: "aceinterview-3c3fd.firebasestorage.app",

    messagingSenderId: "657141453626",

    appId: "1:657141453626:web:bb8ca0a7686d1a17367603"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Export
export{

auth,

provider,

signInWithPopup,

db,

collection,

addDoc,

getDocs

}