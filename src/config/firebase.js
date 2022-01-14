import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

import { FirebaseConfig } from "./keys";
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

export default db;
