import { auth, db } from "./firebase-config.js";
import { collection, addDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Ensure Firestore is initialized
const firestore = getFirestore();

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  // Redirect if not logged in
  if (!userId) {
    window.location.href = "signin.html";
    return;
  }

  // Handle search submission
  document.getElementById("waste-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchTerm = document.getElementById("waste-items").value.trim();
    if (!searchTerm) return;

    try {
      const historyRef = collection(db, "users", userId, "searchHistory");

      // Save search history
      await addDoc(historyRef, { searchTerm, timestamp: new Date().toISOString() });

      // Update user credits (+10 per search)
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { credits: increment(10) });

      console.log("Search saved successfully!");
      displaySearchHistory(); // Refresh displayed search history
    } catch (error) {
      console.error("Error saving search:", error);
    }
  });

  // Function to display search history in the profile page
  async function displaySearchHistory() {
    const searchHistoryList = document.getElementById("search-history");
    if (!searchHistoryList) return; // Only run if the profile page exists

    searchHistoryList.innerHTML = ""; // Clear previous history

    try {
      const historyRef = collection(db, "users", userId, "searchHistory");
      const querySnapshot = await getDocs(historyRef);

      querySnapshot.forEach((doc) => {
        const searchData = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `🔍 ${searchData.searchTerm} - ${new Date(searchData.timestamp).toLocaleString()}`;
        searchHistoryList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  }

  displaySearchHistory(); // Load search history on page load
});
