// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFf5OuA77Fk1RbvWZQdM11WWnWG9dF3WM",
  authDomain: "socialnetworktats.firebaseapp.com",
  projectId: "socialnetworktats",
  storageBucket: "socialnetworktats.appspot.com",
  messagingSenderId: "325532338953",
  appId: "1:325532338953:web:a5e1972a4751fed34921d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);