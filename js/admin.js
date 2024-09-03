import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
const app = initializeApp(firebaseConfig);
//TRY LOGGING THIS FIRST TO MAKE SURE JS FILE IS LOADED BY HTML
console.log("fsf");
//auth and firestore references

const generateCardBtn = document.getElementById("generateCard");
const transactionPage = document.getElementById("transactionStatus");
const getUser = document.getElementById("getUserDetails");

generateCardBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  var email = document.getElementById("username").value;
  const db = getFirestore(app);
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  if (email == "") {
    alert("Empty Fields Not Allowed");
  } else {
    const number = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    );
    const cvv = Math.floor(100 + Math.random() * 900);
    var expMonth = Math.floor(Math.random() * (13 - 1) + 1);
    const expYear = Math.floor(Math.random() * (2030 - 2025) + 2025);

    const numberString = number.toString();
    const cvvString = cvv.toString();
    var expMonthString = expMonth.toString();
    const expYearString = expYear.toString();

    expMonth < 10 ? (expMonthString = `0${expMonth}`) : (expMonth = expMonth);
    if (docSnap.exists()) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "ATM Generated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      updateDoc(docRef, {
        number: numberString,
        cvv: cvvString,
        expiryMonth: expMonthString,
        expiryYear: expYearString,
      });
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "User Not Found",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});

transactionPage.addEventListener("click", async (e) => {
  e.preventDefault();
  var email = document.getElementById("username").value;
  const db = getFirestore(app);
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  if (email == "" || typeof email != "string") {
    alert("Empty Fields Not Allowed");
  } else {
    if (docSnap.exists()) {
      window.location = `/status.html?email=${email}`;
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "User Not Found",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});

getUser.addEventListener("click", async (e) => {
  e.preventDefault();
  var email = document.getElementById("username").value;
  const db = getFirestore(app);
  const userDocRef = doc(db, "Users", email);
  const userDocSnap = await getDoc(userDocRef);
  const name = document.getElementById("name");
  const iban = document.getElementById("iban");
  const ssn = document.getElementById("ssn");
  if (userDocSnap.exists()) {
    name.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
    iban.innerHTML = userDocSnap.data().iban;
    ssn.innerHTML = userDocSnap.data().ssn;
  } else {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "User Not Found",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
