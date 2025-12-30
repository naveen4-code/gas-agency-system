import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.register = async () => {
  try {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const passwordInput = document.getElementById("password");

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const addressVal = addressInput.value.trim();
    const passwordVal = passwordInput.value;

    if (!nameVal || !emailVal || !addressVal || !passwordVal) {
      alert("All fields are required");
      return;
    }

    const cred = await createUserWithEmailAndPassword(
      auth,
      emailVal,
      passwordVal
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      name: nameVal,
      email: emailVal,
      address: addressVal,
      role: "user",
      cylindersLeft: 12,
      createdAt: new Date().toISOString()
    });

    alert("Registration successful. Please login.");
    location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
};

window.login = async () => {
  try {
    const emailVal = document.getElementById("email").value.trim();
    const passwordVal = document.getElementById("password").value;

    const cred = await signInWithEmailAndPassword(
      auth,
      emailVal,
      passwordVal
    );

    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists()) {
      alert("User record not found");
      return;
    }

    if (snap.data().role === "admin") {
      location.href = "admin-dashboard.html";
    } else {
      location.href = "user-dashboard.html";
    }

  } catch (error) {
    alert(error.message);
  }
};

window.logout = async () => {
  await signOut(auth);
  location.href = "index.html";
};
