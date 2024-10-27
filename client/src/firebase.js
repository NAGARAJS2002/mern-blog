import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBhKiLGjs2qSb4LBK7QxeAR978QQnFLH7I",
  authDomain: "mern-blog-8647b.firebaseapp.com",
  projectId: "mern-blog-8647b",
  storageBucket: "mern-blog-8647b.appspot.com",
  messagingSenderId: "736501712002",
  appId: "1:736501712002:web:05595668ed86f46f77609b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);