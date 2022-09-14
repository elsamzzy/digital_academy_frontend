import firebase from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl_v-QOMrWI0BdZI9NjTe2LTi_yKA2c6Q",
  authDomain: "digital-academy-9bcb6.firebaseapp.com",
  projectId: "digital-academy-9bcb6",
  storageBucket: "digital-academy-9bcb6.appspot.com",
  messagingSenderId: "844524931026",
  appId: "1:844524931026:web:5465e039b1132dc4636a0b",
};

const firbaseAuth = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firbaseAuth };
