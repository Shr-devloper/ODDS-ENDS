// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPNsPDBFiUQoT9beOv1P-TmlTTZwsZN7U",
  authDomain: "waste2craft-6abcb.firebaseapp.com",
  projectId: "waste2craft-6abcb",
  storageBucket: "waste2craft-6abcb.firebasestorage.app",
  messagingSenderId: "591514904548",
  appId: "1:591514904548:web:d6e3b0f0495a82099049f1",
  measurementId: "G-JKTMTCWFF0"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };  // Export the auth and db for use in other files

