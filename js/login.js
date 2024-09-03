import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBvRN1-6-HrENzmGc-LjO5bGoAGyYfrpw",
  authDomain: "repulic-bank.firebaseapp.com",
  projectId: "repulic-bank",
  storageBucket: "repulic-bank.appspot.com",
  messagingSenderId: "568676865932",
  appId: "1:568676865932:web:b473711289ee4afbb0e8a9",
  measurementId: "G-Z8MBEN588B",
};

//send mail

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//user login
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["username"].value;
  const password = loginForm["password"].value;
  const loginCode = Math.floor(1000 + Math.random() * 9000);
  const loginCodeString = loginCode.toString();
  function sendMail() {
    let params = {
      message: "Your Login Code Is " + loginCodeString,
      email: email,
    };
    emailjs
      .send("service_izeeins", "template_ejsb7we", params)
      .then(console.log("successful"))
      .catch((error) => console.log(error.message));
    console.log("email function ran");
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      await sendMail();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location = "/otp.html";
      }, 1500);
      loginForm.reset();
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
});
