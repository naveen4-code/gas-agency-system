import { auth, db } from "./firebase.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.bookCylinder = async () => {
  await addDoc(collection(db, "bookings"), {
    userId: auth.currentUser.uid,
    status: "Pending",
    requestedAt: new Date().toISOString()
  });

  alert("Cylinder request sent");
};
