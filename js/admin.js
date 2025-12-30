import { db } from "./firebase.js";
import {
  collection, getDocs, getDoc, doc, updateDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tbody = document.getElementById("bookings");

const snap = await getDocs(collection(db, "bookings"));

for (const b of snap.docs) {
  const booking = b.data();
  const userSnap = await getDoc(doc(db, "users", booking.userId));
  const user = userSnap.data();

  tbody.innerHTML += `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.address}</td>
      <td>${booking.status}</td>
      <td>
        <button onclick="approve('${b.id}','${booking.userId}')">
          Approve
        </button>
      </td>
    </tr>`;
}

window.approve = async (bookingId, userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  await updateDoc(userRef, {
    cylindersLeft: userSnap.data().cylindersLeft - 1
  });

  await updateDoc(doc(db, "bookings", bookingId), {
    status: "Approved"
  });

  alert("Approved");
  location.reload();
};

window.addNotice = async () => {
  await addDoc(collection(db, "notices"), {
    text: notice.value,
    createdAt: new Date().toISOString()
  });
  notice.value = "";
};
