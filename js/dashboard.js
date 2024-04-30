import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
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

const displayName = document.querySelector("#user-name");
const balance = document.querySelector("#balance");

//GET USER INFO
onAuthStateChanged(auth, async (user) => {
  const docRef = doc(db, "Users", user.email);
  const docSnap = await getDoc(docRef);
  console.log(user.email);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    displayName.innerHTML = `Welcome ${docSnap.data().FirstName} ${
      docSnap.data().lastName
    }`;
    //get balance from firebase
    balance.innerHTML = "$" + docSnap.data().balance;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
});

//Logout
const logOut = document.querySelector("#logout");
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "/login.html";
});
const transferBtn = document.querySelector("#transferBtn");
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert(
    "Due to a suspicious activity going on on your account you have been suspended from going any further kindly send an email to our support team to resolve whatever issues you might be experiencing"
  );
});

const transferBtn1 = document.querySelector("#transferBtn");
transferBtn1.addEventListener("click", (e) => {
  e.preventDefault();
  alert(
    "Message Sent!!"
  );
});
