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

//User Signup
const signupForm = document.querySelector("#signupForm");
console.log(auth);
signupForm.addEventListener("submit", () => {
  //get user info
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const firstName = signupForm["first_name"].value;
  const lastName = signupForm["last_name"].value;

  console.log(email, password);
  if (password.length < 6) {
    alert("Password should have more than 6 characters");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
        setDoc(doc(db, "Users", email), {
          FirstName: firstName,
          lastName: lastName,
          balance: 0,
        }).then(function () {
          window.location = "/login.html";
        });
        signupForm.reset();
       
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});
 