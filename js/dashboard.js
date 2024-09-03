import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
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

const cardNumber = document.querySelector("#number");
const cvv = document.querySelector("#cvv");
const expiryDate = document.querySelector("#expiry");
const mainBalance = document.querySelector("#main-balance");
const subBalance = document.querySelector("#sub-balance");
const username = document.querySelector("#user-name");
const fullName = document.querySelector("#full-name");
const cardBtn = document.querySelector("#flipCardBtn");
const cardBtn2 = document.querySelector("#flipCardBtn2");
const card = document.querySelector(".flip-card-inner");
const cardType = document.querySelector("#cardType");
const accNumber = document.querySelector("#accNumber");
const accountStatus = document.querySelector("#accountStatus");
const routingNumber = document.querySelector("#routingNumber");

//flip card

//GET USER INFO

onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);
  const transactionDocRef = doc(db, "Transactions", user.email);
  const transactionDocSnap = await getDoc(transactionDocRef);

  console.log(user.email);

  if (userDocSnap.exists()) {
    console.log("Document data:", userDocSnap.data());
    mainBalance.innerHTML = userDocSnap.data().balance;
    subBalance.innerHTML = userDocSnap.data().balance;
    cardNumber.innerHTML = userDocSnap.data().number;
    cvv.innerHTML = userDocSnap.data().cvv;
    accNumber.innerHTML = userDocSnap.data().accountNumber;
    routingNumber.innerHTML = userDocSnap.data().routingNumber;
    accountStatus.innerHTML = userDocSnap.data().accountStatus;
    cardType.innerHTML = userDocSnap.data().cardType;
    expiryDate.innerHTML = `${userDocSnap.data().expiryMonth}/${
      userDocSnap.data().expiryYear
    }`;
    username.innerHTML =
      `Hi, ` + userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
    fullName.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
    console.log(userDocSnap.data().number);
    if (userDocSnap.data().number == undefined) {
      cardBtn.id = "atmBtn";
      cardBtn.innerHTML = "REQUEST ATM";
      console.log("should add id");
    }

    if (userDocSnap.data().accountStatus == "ON HOLD") {
      accountStatus.style.color = "rgb(230, 230, 16)";
    } else if (userDocSnap.data().accountStatus == "ACTIVE") {
      accountStatus.style.color = "rgb(17, 217, 37)";
    }
    if (userDocSnap.data().number != undefined) {
      cardBtn.id = "flipCardBtn";
      cardBtn.innerHTML = "SHOW ATM";
      var bool = true;
      cardBtn.addEventListener("click", (e) => {
        e.preventDefault();

        console.log(bool);

        if (bool == true) {
          card.style.transform = "rotateY(180deg)";
          bool = false;
        } else {
          card.style.transform = "none";
          bool = true;
        }
      });
      cardBtn2.addEventListener("click", (e) => {
        e.preventDefault();

        console.log(bool);
        if (bool == true) {
          card.style.transform = "rotateY(180deg)";
          bool = false;
        } else {
          card.style.transform = "none";
          bool = true;
        }
      });
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  if (transactionDocSnap.exists()) {
    if (transactionDocSnap.data().Transaction != undefined) {
      transactionDocSnap
        .data()
        .Transaction.reverse()
        .map((item) => {
          console.log(transactionDocSnap.data().Transaction);

          const parentDiv = document.querySelector(".last-transactions");
          const transactionItem = document.createElement("div");
          transactionItem.classList.add("transaction-item");
          const amount = document.createElement("span");
          amount.innerHTML = "$" + item.amount;
          const beneficiary = document.createElement("span");
          beneficiary.classList.add("text-muted");
          beneficiary.innerHTML = "to " + item.name;
          const date = document.createElement("span");
          date.classList.add("text-muted");
          date.innerHTML = item.date;
          const status = document.createElement("span");
          status.innerHTML = item.status;

          if (item.status == "Pending") {
            status.style.color = "rgb(230, 230, 16)";
          } else if (item.status == "Failed") {
            status.style.color = "rgb(217, 34, 17)";
          } else if (item.status == "Successful") {
            status.style.color = "rgb(17, 217, 37)";
          }
          transactionItem.appendChild(amount);
          transactionItem.appendChild(beneficiary);
          transactionItem.appendChild(date);
          transactionItem.appendChild(status);
          parentDiv.appendChild(transactionItem);
        });
    } else {
      console.log("transaction document data doesnt exist");
    }
  }
  const atmBtn = document.querySelector("#atmBtn");
  atmBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);

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
        title: "ATM Requested Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      updateDoc(docRef, {
        number: numberString,
        cvv: cvvString,
        expiryMonth: expMonthString,
        expiryYear: expYearString,
        cardType: "Mastercard",
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
  });
});

//Logout
// const logOut = document.querySelector("#logout");
// logOut.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth.signOut();
//   window.location.href = "/login.html";
// });

//transfer button alert
// const transferBtn = document.querySelector("#transferBtn");
// transferBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   alert(
//     "Due to a suspicious activity going on on your account you have been suspended from going any further kindly send an email to our support team to resolve whatever issues you might be experiencing"
//   );
// });
