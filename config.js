import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = initializeApp ({
  apiKey: "AIzaSyBLR-OSUtNo2I6UxF_HlGcGh2sMIibwsvM",
  authDomain: "myfirebase-auth-a8d39.firebaseapp.com",
  projectId: "myfirebase-auth-a8d39",
  storageBucket: "myfirebase-auth-a8d39.appspot.com",
  messagingSenderId: "920190742440",
  appId: "1:920190742440:web:ae34f7ec0abf5833b1b79d"
});


const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

export { auth, db };