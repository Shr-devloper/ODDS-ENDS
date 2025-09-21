import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

// Elements
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard');
const sidebarUsername = document.getElementById('sidebar-username');
const creditsDisplay = document.getElementById('credits-display');
const logoutBtn = document.getElementById('logout-btn');

// Handle login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // Sign in user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Store data in localStorage
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('credits', userData.credits);

      // Hide login and show dashboard
      loginSection.style.display = 'none';
      dashboardSection.style.display = 'block';

      // Update the sidebar with the user's data
      sidebarUsername.innerText = `Welcome, ${userData.username}!`;
      creditsDisplay.innerText = userData.credits;
    }

  } catch (error) {
    console.error('Error during login: ', error.message);
    alert('Error during login: ' + error.message);
  }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      localStorage.clear();
      loginSection.style.display = 'block';
      dashboardSection.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error during logout: ', error.message);
    });
});
