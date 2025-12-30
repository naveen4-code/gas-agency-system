import { auth, db } from "./firebase.js";
import {
  collection, getDocs, query, where, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.makePayment = async () => {

  if (!auth.currentUser) {
    alert("Login required");
    return;
  }

  const q = query(
    collection(db, "bookings"),
    where("userId", "==", auth.currentUser.uid),
    where("status", "==", "Approved")
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    alert("No approved booking found");
    return;
  }

  const bookingDoc = snap.docs[0];

  await updateDoc(doc(db, "bookings", bookingDoc.id), {
    status: "Paid",
    paidAt: new Date().toISOString(),
    amount: 900
  });

  alert("Payment successful");
  location.href = "history.html";
};
