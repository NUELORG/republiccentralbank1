import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);
//User Signup
const signupForm = document.querySelector("#signupForm");
console.log(auth);
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const confirmPassword = signupForm["confirmPassword"].value;
  const firstName = signupForm["first_name"].value;
  const lastName = signupForm["last_name"].value;
  const dob = signupForm["dob"].value;
  const iban = signupForm["iban"].value;
  const ssn = signupForm["ssn"].value;
  const maiden = signupForm["maiden"].value;
  const address = signupForm["address"].value;
  const country = signupForm["country"].value;
  const zip = signupForm["zip"].value;
  const city = signupForm["city"].value;
  const state = signupForm["state"].value;
  const phone = signupForm["phone"].value;
  const accountType = signupForm["accountType"].value;
  const accountNumber = signupForm["accountNumber"].value;
  const routingNumber = signupForm["routingNumber"].value;

  if (password.length < 6) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Should Be More Than 6 Characters",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (password != confirmPassword) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Doesnt Match",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
        setDoc(doc(db, "Transactions", email), {});
        setDoc(doc(db, "Users", email), {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          iban: iban,
          ssn: ssn,
          maiden_name: maiden,
          address: address,
          country: country,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
          accountType: accountType,
          accountNumber: accountNumber,
          routingNumber: routingNumber,
          accountStatus: "Pending",
          balance: "0",
        }).then(function () {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            window.location = "/login.html";
          }, 1500);
          signupForm.reset();
        });
      })

      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  }
});
