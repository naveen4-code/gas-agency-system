import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
window.register = async () => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    await setDoc(doc(db, "users", user.user.uid), {
      name: name.value,
      email: email.value,
      role: "user",
      cylindersLeft: 12
    });
    alert("Registration successful. Please login.");
    location.href = "index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please login instead.");
    } else if (error.code === "auth/weak-password") {
      alert("Password should be at least 6 characters.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format.");
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