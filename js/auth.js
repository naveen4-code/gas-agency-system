import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
window.register = async () => {
  try {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !address || !password) {
      alert("All fields are required");
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      address,
      role: "user",
      cylindersLeft: 12,
      createdAt: new Date().toISOString()
    });

    alert("Registration successful. Please login.");
    location.href = "index.html";

  } catch (err) {
    alert(err.message);
  }
};
window.login = async () => {
  const user = await signInWithEmailAndPassword(auth,email.value,password.value);
  const snap = await getDoc(doc(db,"users",user.user.uid));
  location.href = snap.data().role==="admin" ? "admin-dashboard.html" : "user-dashboard.html";
};
window.logout = () => signOut(auth);