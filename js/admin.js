import { db } from "./firebase.js";
import {
  collection, getDocs, updateDoc, doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const bookingSnap = await getDocs(collection(db, "bookings"));
for (const booking of bookingSnap.docs) {
  const data = booking.data();
  const userDoc = await getDoc(doc(db, "users", data.userId));
  const user = userDoc.data();
  bookings.innerHTML += `
    <div class="table-card">
      <p><b>Name:</b> ${user.name}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Address:</b> ${user.address}</p>
      <p><b>Status:</b> ${data.status}</p>
      <button onclick="approve('${booking.id}', '${data.userId}')">
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
  alert("Booking approved and cylinder count updated");
  location.reload();
};
window.addNotice = async () => {
  await addDoc(collection(db, "notices"), {
    text: notice.value,
    createdAt: new Date().toISOString()
  });

  alert("Notice posted");
};
