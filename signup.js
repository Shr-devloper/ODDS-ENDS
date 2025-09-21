import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      username: username,
      email: email,
      credits: 0,
    });

    localStorage.setItem("userId", user.uid);
    localStorage.setItem("username", username);
    localStorage.setItem("credits", 0);

    window.location.href = "index.html";
  } catch (error) {
    console.error("Signup Error: ", error.message);
    alert("Error: " + error.message);
  }
});
