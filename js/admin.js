import { db } from "./firebase.js";
import {
  collection, getDocs, getDoc, doc, updateDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const stockEl = document.getElementById("stock");
const bookingsBody = document.getElementById("bookings");

// 🔹 LOAD GLOBAL STOCK
const globalRef = doc(db, "settings", "global");
const globalSnap = await getDoc(globalRef);

if (globalSnap.exists()) {
  stockEl.innerText =
    "Cylinders Available: " + globalSnap.data().cylindersAvailable;
}

// 🔹 LOAD BOOKINGS
const bookingsSnap = await getDocs(collection(db, "bookings"));

for (const b of bookingsSnap.docs) {
  const booking = b.data();
  if (booking.status !== "Pending") continue;

  const userSnap = await getDoc(doc(db, "users", booking.userId));
  const user = userSnap.data();

  bookingsBody.innerHTML += `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.address}</td>
      <td>${booking.status}</td>
      <td>
        <button onclick="approve('${b.id}')">Approve</button>
      </td>
    </tr>`;
}

// 🔹 APPROVE BOOKING (REDUCE STOCK)
window.approve = async (bookingId) => {
  const globalSnap = await getDoc(globalRef);
  const available = globalSnap.data().cylindersAvailable;

  if (available <= 0) {
    alert("No cylinders available");
    return;
  }

  await updateDoc(globalRef, {
    cylindersAvailable: available - 1
  });

  await updateDoc(doc(db, "bookings", bookingId), {
    status: "Approved",
    approvedAt: new Date().toISOString()
  });

  alert("Booking approved");
  location.reload();
};

// 🔹 UPDATE STOCK MANUALLY
window.updateStock = async () => {
  const value = document.getElementById("newStock").value;

  if (value === "" || value < 0) {
    alert("Enter valid stock number");
    return;
  }

  await updateDoc(globalRef, {
    cylindersAvailable: Number(value)
  });

  alert("Stock updated");
  location.reload();
};

// 🔹 ADD NOTICE
window.addNotice = async () => {
  await addDoc(collection(db, "notices"), {
    text: notice.value,
    createdAt: new Date().toISOString()
  });
  notice.value = "";
};
