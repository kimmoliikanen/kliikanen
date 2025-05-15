import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDP1Cy3omile_BMT_ZCN8dMW_Sk5hb69_c",
  authDomain: "paivakoti-c2a08.firebaseapp.com",
  projectId: "paivakoti-c2a08",
  storageBucket: "paivakoti-c2a08.appspot.com",
  messagingSenderId: "951664629812",
  appId: "1:951664629812:web:1b0f0caa31660eacef1261",
  measurementId: "G-6Q8G0FVE65"
};

// Alusta Firebase
const app = initializeApp(firebaseConfig);

// Exporttaa autentikointi ja tietokanta käyttöön muualla sovelluksessa
export const auth = getAuth(app);
export const db = getFirestore(app); 