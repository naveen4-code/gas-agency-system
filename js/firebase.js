import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyB1Tj0S_IE4mq9lhr9tOERYkr6BfHpwkt4",
  authDomain: "gas-agency-system-b0296.firebaseapp.com",
  projectId: "gas-agency-system-b0296",
  storageBucket: "gas-agency-system-b0296.firebasestorage.app",
  messagingSenderId: "485193015056",
  appId: "1:485193015056:web:18ddd3cd1095b1e7d94f95"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);