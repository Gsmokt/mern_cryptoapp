import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFUf9me3Oz5Pd0TIFpknKU7u05S4_-7Bg",
  authDomain: "whatsappclone-b00e5.firebaseapp.com",
  projectId: "whatsappclone-b00e5",
  storageBucket: "whatsappclone-b00e5.appspot.com",
  messagingSenderId: "877783254367",
  appId: "1:877783254367:web:510f3082a62d45d32d62ea",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
