import { db } from "./firebase.js";
import { addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
export function logAction(action, ref){
  addDoc(collection(db,"logs"),{
    action, ref, time:new Date().toISOString()
  });
}