import firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDhwMlOvpCnPysohV9-BN_133mDeEFwXWQ",
  authDomain: "price-calculator-24b10.firebaseapp.com",
  databaseURL: "https://price-calculator-24b10.firebaseio.com",
  projectId: "price-calculator-24b10",
  storageBucket: "price-calculator-24b10.appspot.com",
  messagingSenderId: "827570675331",
  appId: "1:827570675331:web:af5953f20b92f947e2c5b6",
  measurementId: "G-8GHFKEBL6S"
});

const db = firebaseApp.firestore();

export { db };
