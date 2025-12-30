import { auth, db } from "./firebase.js";
import { addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";
window.bookCylinder = async ()=>{
  await addDoc(collection(db,"bookings"),{
    userId:auth.currentUser.uid,
    status:"Pending"
  });
  logAction("BOOKED",auth.currentUser.email);
  alert("Request Sent");
};