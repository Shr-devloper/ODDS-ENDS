// // login.js
// import { auth, db } from './firebase-config.js';
// import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
// import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

// // Handle Login form submission
// document.getElementById('login-form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   try {
//     // Sign in the user with Firebase Authentication
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Fetch user data from Firestore
//     const userRef = doc(db, 'users', user.uid);
//     const docSnap = await getDoc(userRef);

//     if (docSnap.exists()) {
//       const userData = docSnap.data();
//       console.log('User data retrieved: ', userData);

//       // Store user data locally (sessionStorage or localStorage)
//       localStorage.setItem('username', userData.username);
//       localStorage.setItem('credits', userData.credits);

//       // Show user's credits and other data on the main page
//       document.getElementById('username-display').innerText = `Welcome, ${userData.username}!`;
//       document.getElementById('credits-display').innerText = `Credits: ${userData.credits}`;

//       // Redirect to the main page or dashboard after successful login
//       window.location.href = 'index.html'; // Redirect to your dashboard page
//     } else {
//       console.log('No such document!');
//     }

//   } catch (error) {
//     console.error('Error during login: ', error.message);
//     alert('Error during login: ' + error.message);
//   }
// });


// import { auth, db } from './firebase-config.js';
// import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
// import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

// // Handle Login form submission
// document.getElementById('login-form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   try {
//     // Sign in the user with Firebase Authentication
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Fetch user data from Firestore
//     const userRef = doc(db, 'users', user.uid);
//     const docSnap = await getDoc(userRef);

//     if (docSnap.exists()) {
//       const userData = docSnap.data();
//       console.log('User data retrieved: ', userData);

//       // Store user data locally (sessionStorage or localStorage)
//       localStorage.setItem('username', userData.username);
//       localStorage.setItem('credits', userData.credits);
//       localStorage.setItem('userId', user.uid);

//       // Redirect to the main page (index.html) after successful login
//       window.location.href = 'index.html';
//     } else {
//       console.log('No such document!');
//     }

//   } catch (error) {
//     console.error('Error during login: ', error.message);
//     alert('Error during login: ' + error.message);
//   }
// });



import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem("userId", user.uid);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("credits", userData.credits);
        window.location.href = "index.html";
      } else {
        console.error("User document missing after login.");
      }
    });
  } catch (error) {
    console.error("Login Error: ", error.message);
    alert("Error: " + error.message);
  }
});
