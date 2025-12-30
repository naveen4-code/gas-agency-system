import { db } from "./firebase.js";
import {
  collection, getDocs, getDoc, doc, updateDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const bookingsDiv = document.getElementById("bookings");
const snap = await getDocs(collection(db, "bookings"));
for (const b of snap.docs) {
  const booking = b.data();
  const userSnap = await getDoc(doc(db, "users", booking.userId));
  const user = userSnap.data();
  bookingsDiv.innerHTML += `
    <div class="table-card">
      <p><b>Name:</b> ${user.name}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Address:</b> ${user.address}</p>
      <p><b>Status:</b> ${booking.status}</p>
      <button onclick="approve('${b.id}', '${booking.userId}')">
        Approve
      </button>
    </div>
  `;
}
window.approve = async (bookingId, userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  await updateDoc(userRef, {
    cylindersLeft: userSnap.data().cylindersLeft - 1
  });

  await updateDoc(doc(db, "bookings", bookingId), {
    status: "Approved",
    approvedAt: new Date().toISOString()
  });

  alert("Approved. Cylinder count updated.");
  location.reload();
};
window.addNotice = async () => {
  await addDoc(collection(db, "notices"), {
    text: notice.value,
    createdAt: new Date().toISOString()
  });
  alert("Notice posted");
};