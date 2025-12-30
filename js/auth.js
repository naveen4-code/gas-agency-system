import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
window.register = async () => {
  const user = await createUserWithEmailAndPassword(auth,email.value,password.value);
  await setDoc(doc(db,"users",user.user.uid),{
    name:name.value,email:email.value,role:"user",cylindersLeft:12
  });
  logAction("REGISTER", email.value);
  location.href="index.html";
};
window.login = async () => {
  const user = await signInWithEmailAndPassword(auth,email.value,password.value);
  const snap = await getDoc(doc(db,"users",user.user.uid));
  location.href = snap.data().role==="admin" ? "admin-dashboard.html" : "user-dashboard.html";
};
window.logout = () => signOut(auth);