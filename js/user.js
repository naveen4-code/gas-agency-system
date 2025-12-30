import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, updateDoc, collection, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const addressEl = document.getElementById("profileAddress");
  const balanceEl = document.getElementById("balance");
  const historyEl = document.getElementById("history");
  const noticesEl = document.getElementById("notices");

  // 🔹 Load profile
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (nameEl) {
    nameEl.value = userSnap.data().name;
    emailEl.value = userSnap.data().email;
    addressEl.value = userSnap.data().address;
  }

  // 🔹 Global stock
  if (balanceEl) {
    const globalSnap = await getDoc(doc(db, "settings", "global"));
    balanceEl.innerText =
      "Cylinders Available: " + globalSnap.data().cylindersAvailable;
  }

  // 🔹 History
  if (historyEl) {
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    historyEl.innerHTML = "";

    snap.forEach(b => {
      historyEl.innerHTML += `
        <tr>
          <td>${b.data().status}</td>
          <td>${new Date(b.data().requestedAt).toLocaleString()}</td>
          <td>${b.data().amount ? "₹" + b.data().amount : "-"}</td>
        </tr>`;
    });
  }

  // 🔹 Notices
  if (noticesEl) {
    const snap = await getDocs(collection(db, "notices"));
    noticesEl.innerHTML = "";

    snap.forEach(n => {
      noticesEl.innerHTML += `
        <li>
          ${n.data().text}<br>
          <small>${new Date(n.data().createdAt).toLocaleString()}</small>
        </li>`;
    });
  }
});

// 🔹 Update profile
window.updateProfile = async () => {
  const nameVal = document.getElementById("profileName").value.trim();
  const addressVal = document.getElementById("profileAddress").value.trim();

  if (!nameVal || !addressVal) {
    alert("Name and address required");
    return;
  }

  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    name: nameVal,
    address: addressVal
  });

  alert("Profile updated successfully");
};
