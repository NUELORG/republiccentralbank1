import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

const transactionForm = document.getElementById("transactionFormBox");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Transactions", user.email);
  const docSnap = await getDoc(docRef);
  transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      transactionForm["beneficiaryAccount"].value == "" ||
      transactionForm["beneficiaryBank"].value == "" ||
      transactionForm["amount"].value == "" ||
      transactionForm["beneficiaryName"].value == "" ||
      transactionForm["accountType"].value == "" ||
      transactionForm["frequency"].value == "" ||
      transactionForm["date"].value == ""
    ) {
      alert(`Empty Fields Not Allowed`);
    } else {
      var getDate = new Date();
      const account = transactionForm["beneficiaryAccount"].value;
      const name = transactionForm["beneficiaryName"].value;
      const bank = transactionForm["beneficiaryBank"].value;
      const amount = transactionForm["amount"].value;
      const date = transactionForm["date"].value;

      const accountType = transactionForm["accountType"].value;
      const frequency = transactionForm["frequency"].value;

      // if (docSnap.exists()) {
      updateDoc(docRef, {
        Transaction: arrayUnion({
          date: date,
          account: account,
          name: name,
          bank: bank,
          amount: amount,
          status: "Pending",
          accountType: accountType,
          frequency: frequency,
          transferType: "Direct Deposit",
        }),
      });

      Swal.fire({
        title: "Pending",
        text: "Transaction Pending",
        icon: "warning",
      });
      transactionForm.reset();
    }
  });
});
