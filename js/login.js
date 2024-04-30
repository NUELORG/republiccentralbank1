import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5OuWml2CUnS1vgRjGDlcvl6CQ0CtIZbU",
  authDomain: "bank-app-7e582.firebaseapp.com",
  projectId: "bank-app-7e582",
  appId: "1:554400021133:web:0dcff0b7aa6c85024bc0c4",
};

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

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/dashboard.html";
      loginForm.reset();
    })
    .catch((error) => {
      alert(error.message);
    });
});
