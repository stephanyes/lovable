import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm_K3WydbYT6OIJ0Saz0dE_dC66SX2M48",
  authDomain: "lovable-qr.firebaseapp.com",
  databaseURL: "https://lovable-qr.firebaseio.com",
  projectId: "lovable-qr",
  storageBucket: "lovable-qr.appspot.com",
  messagingSenderId: "34303700789",
  appId: "1:34303700789:web:7e3ad4f8cf2d2a380c267c"
};

const service = firebase.initializeApp(firebaseConfig);

export default service;
