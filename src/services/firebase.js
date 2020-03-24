import app from "firebase/app";
import "firebase/auth";
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

//Utility class
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    //reference to auth api
    this.auth = app.auth()
    //access to cloud firestore
    this.db = app.firestore()
  }

  login(email, password) {
    //Nos retorna una promesa, lo manejamos mas adelante
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser.displayName
  }


}

export default new Firebase()
