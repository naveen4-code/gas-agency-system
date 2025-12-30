import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
window.register = async () => {
  try {
    const userName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const userPassword = document.getElementById("password").value;
    if (!userName || !userEmail || !userPassword) {
      alert("All fields are required");
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: userName,
      email: userEmail,
      role: "user",
      cylindersLeft: 12,
      createdAt: new Date().toISOString()
    });
    alert("Registration successful. Please login.");
    location.href = "index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please login.");
    } else if (error.code === "auth/weak-password") {
      alert("Password must be at least 6 characters.");
    } else {
      alert(error.message);
    }
  }
};
window.login = async () => {
  const user = await signInWithEmailAndPassword(auth,email.value,password.value);
  const snap = await getDoc(doc(db,"users",user.user.uid));
  location.href = snap.data().role==="admin" ? "admin-dashboard.html" : "user-dashboard.html";
};
window.logout = () => signOut(auth);