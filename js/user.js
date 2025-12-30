import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, collection, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const balanceEl = document.getElementById("balance");
  const historyEl = document.getElementById("history");
  const noticesEl = document.getElementById("notices");

  const userSnap = await getDoc(doc(db, "users", user.uid));

  if (balanceEl) {
    balanceEl.innerText = `Cylinders Left: ${userSnap.data().cylindersLeft}`;
  }

  if (historyEl) {
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const snap = await getDocs(q);

    historyEl.innerHTML = "";
    snap.forEach((b) => {
      historyEl.innerHTML += `
        <tr>
          <td>${b.data().status}</td>
          <td>${new Date(b.data().requestedAt).toLocaleString()}</td>
          <td>${b.data().amount ? "₹" + b.data().amount : "-"}</td>
        </tr>`;
    });
  }

  if (noticesEl) {
    const snap = await getDocs(collection(db, "notices"));
    noticesEl.innerHTML = "";
    snap.forEach((n) => {
      noticesEl.innerHTML += `
        <li>
          ${n.data().text}<br>
          <small>${new Date(n.data().createdAt).toLocaleString()}</small>
        </li>`;
    });
  }
});
