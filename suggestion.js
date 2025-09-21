import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        window.location.href = "signin.html";
        return;
    }

    const suggestionForm = document.getElementById("suggestion-form");
    const ideaList = document.getElementById("idea-list");
    const sidebar = document.getElementById("idea-sidebar");
    const toggleSidebarBtn = document.getElementById("toggle-sidebar");

    // Toggle sidebar visibility
    toggleSidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    suggestionForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("idea-title").value.trim();
        const description = document.getElementById("idea-description").value.trim();

        if (!title || !description) {
            alert("Please fill out all fields!");
            return;
        }

        try {
            const userIdeasRef = collection(db, "users", userId, "ideas");
            await addDoc(userIdeasRef, {
                title,
                description,
                timestamp: new Date().toISOString(),
            });

            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { credits: increment(20) });

            alert("🎉 Idea submitted successfully! You earned 20 credits.");

            // Refresh the sidebar list
            displayUserIdeas();
        } catch (error) {
            console.error("Error submitting idea: ", error);
        }

        document.getElementById("idea-title").value = "";
        document.getElementById("idea-description").value = "";
    });

    async function displayUserIdeas() {
        ideaList.innerHTML = "";

        const userIdeasRef = collection(db, "users", userId, "ideas");
        const querySnapshot = await getDocs(userIdeasRef);

        querySnapshot.forEach((doc) => {
            const idea = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `<strong>🎨 ${idea.title}</strong><br>${idea.description} <br><small>🕒 ${new Date(idea.timestamp).toLocaleString()}</small>`;
            ideaList.appendChild(li);
        });
    }

    // Load existing ideas
    displayUserIdeas();
});
