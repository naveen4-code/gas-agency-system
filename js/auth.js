import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.register = async () => {
  const name = name.value.trim();
  const emailVal = email.value.trim();
  const addressVal = address.value.trim();
  const passwordVal = password.value;

  if (!name || !emailVal || !addressVal || !passwordVal) {
    alert("All fields required");
    return;
  }

  const cred = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email: emailVal,
    address: addressVal,
    role: "user",
    cylindersLeft: 12
  });

  location.href = "index.html";
};

window.login = async () => {
  const cred = await signInWithEmailAndPassword(auth, email.value, password.value);
  const snap = await getDoc(doc(db, "users", cred.user.uid));

  if (snap.data().role === "admin") {
    location.href = "admin-dashboard.html";
  } else {
    location.href = "user-dashboard.html";
  }
};

window.logout = () => signOut(auth);