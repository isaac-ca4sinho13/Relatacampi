import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "iachat-64b06.firebaseapp.com",
  projectId: "iachat-64b06",
  storageBucket: "iachat-64b06.appspot.com",
  messagingSenderId: "942351916367",
  appId: "1:942351916367:web:...",
  measurementId: "G-..."
};

const app = initializeApp(firebaseConfig);

const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { database };