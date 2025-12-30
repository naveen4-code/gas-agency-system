import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, collection, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async user => {
  if (!user) return;

  const u = await getDoc(doc(db, "users", user.uid));
  if (balance) balance.innerText = "Cylinders Left: " + u.data().cylindersLeft;

  if (history) {
  const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
  const snap = await getDocs(q);

  snap.forEach(b => {
    history.innerHTML += `
      <tr>
        <td>${b.data().status}</td>
        <td>${new Date(b.data().requestedAt).toLocaleString()}</td>
        <td>${b.data().amount ? "₹" + b.data().amount : "-"}</td>
      </tr>`;
  });
}

  if (notices) {
    const snap = await getDocs(collection(db, "notices"));
    snap.forEach(n => {
      notices.innerHTML += `
        <li>
          ${n.data().text}<br>
          <span class="small">${new Date(n.data().createdAt).toLocaleString()}</span>
        </li>`;
    });
  }
});
