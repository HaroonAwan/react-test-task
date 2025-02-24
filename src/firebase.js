import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-WI3t0AmxC-yUGoo21nYNv1Qb2CJcUeY",
  authDomain: "paths-d886b.firebaseapp.com",
  projectId: "paths-d886b",
  storageBucket: "paths-d886b.firebasestorage.app",
  messagingSenderId: "897389602311",
  appId: "1:897389602311:web:f412c8150a19d914d96ca2",
  measurementId: "G-SF1DT09MD2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export auth correctly