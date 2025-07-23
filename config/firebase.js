import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChrk8SPawtc6HFVjqC9m5CNRRvE_yH1b0",
  authDomain: "iachat-64b06.firebaseapp.com",
  projectId: "iachat-64b06",
  storageBucket: "iachat-64b06.appspot.com",
  messagingSenderId: "942351916367",
  appId: "1:942351916367:web:a94db36933049f6a87f93a",
};

const app = initializeApp(firebaseConfig);

const database = initializeFirestore(app, {
  localCache: persistentLocalCache(), 
  experimentalForceLongPolling: true, 
  useFetchStreams: false,
});

export { database };
