import { auth, db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
const snap = await getDocs(collection(db,"bookings"));
snap.forEach(d=>{
  bookings.innerHTML+=`
  <p>${d.id} - ${d.data().status}
  <button onclick="approve('${d.id}','${d.data().userId}')">Approve</button></p>`;
});
window.approve = async (id, uid)=>{
  await updateDoc(doc(db,"bookings",id),{status:"Approved"});
  logAction("APPROVED",id);
};
window.addNotice = async ()=>{
  await addDoc(collection(db,"notices"),{text:notice.value});
};