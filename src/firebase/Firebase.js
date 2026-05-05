import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmS0pgFQgAuoTx2HfnpXOwphkgHnQujz4",
  authDomain: "chat-project-3586c.firebaseapp.com",
  projectId: "chat-project-3586c",
  storageBucket: "chat-project-3586c.firebasestorage.app",
  messagingSenderId: "867196935561",
  appId: "1:867196935561:web:219b72f2297192d7b3d558",
  measurementId: "G-ZWC1KWS8WC"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app);

export {db,auth}