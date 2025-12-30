import { db } from "./firebase.js";
import {
  collection, getDocs, getDoc, doc, updateDoc, setDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const stockEl = document.getElementById("stock");
const bookingsBody = document.getElementById("bookings");
const paymentsBody = document.getElementById("payments");

const globalRef = doc(db, "settings", "global");

// 🔹 Ensure stock doc exists
const globalSnap = await getDoc(globalRef);
if (!globalSnap.exists()) {
  await setDoc(globalRef, { cylindersAvailable: 100 });
}

stockEl.innerText =
  "Cylinders Available: " + (await getDoc(globalRef)).data().cylindersAvailable;

// 🔹 Pending bookings
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

// 🔹 Payments table
for (const b of bookingsSnap.docs) {
  const booking = b.data();
  if (booking.status !== "Paid") continue;

  const userSnap = await getDoc(doc(db, "users", booking.userId));
  const user = userSnap.data();

  paymentsBody.innerHTML += `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.address}</td>
      <td>${booking.status}</td>
      <td>₹${booking.amount}</td>
      <td>${new Date(booking.paidAt).toLocaleString()}</td>
    </tr>`;
}

// 🔹 Approve booking
window.approve = async (bookingId) => {
  const globalSnap = await getDoc(globalRef);
  const available = globalSnap.data().cylindersAvailable;

  if (available <= 0) {
    alert("No stock available");
    return;
  }

  await updateDoc(globalRef, {
    cylindersAvailable: available - 1
  });

  await updateDoc(doc(db, "bookings", bookingId), {
    status: "Approved"
  });

  location.reload();
};

// 🔹 Update stock
window.updateStock = async () => {
  const value = document.getElementById("newStock").value;
  if (value === "" || value < 0) return alert("Invalid value");

  await updateDoc(globalRef, {
    cylindersAvailable: Number(value)
  });

  location.reload();
};

// 🔹 Add notice
window.addNotice = async () => {
  await addDoc(collection(db, "notices"), {
    text: notice.value,
    createdAt: new Date().toISOString()
  });
  notice.value = "";
};
