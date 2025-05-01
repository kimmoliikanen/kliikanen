import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBLWQeq6o_eUwVlU4L1rivAKbYMQXk7lns",
    authDomain: "pilvi-vite-9db75.firebaseapp.com",
    projectId: "pilvi-vite-9db75",
    sstorageBucket: "pilvi-vite-9db75.firebasestorage.app",
    messagingSenderId: "771775700006",
    appId: "1:771775700006:web:1d1336cd8bb07d74669ae7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };