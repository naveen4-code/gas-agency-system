import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, query, where, getDocs, getDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
onAuthStateChanged(auth, async user=>{
  if(!user) return;

  const u = await getDoc(doc(db,"users",user.uid));
  if(balance) balance.innerText="Cylinders Left: "+u.data().cylindersLeft;

  if(history){
    const q=query(collection(db,"bookings"),where("userId","==",user.uid));
    const snap=await getDocs(q);
    snap.forEach(d=>history.innerHTML+=`<li>${d.data().status}</li>`);
  }
  if (notices) {
  const snap = await getDocs(collection(db, "notices"));
  snap.forEach(d => {
    const n = d.data();
    const date = new Date(n.createdAt).toLocaleString();

    notices.innerHTML += `
      <li>
        <b>${n.text}</b><br>
        <small>${date}</small>
      </li>
    `;
  });
}
});