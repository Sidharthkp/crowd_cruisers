import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIpwv-IxYyYm0AQhkdJ_lCQUIe6j3Y4KA",
    authDomain: "crowd-cruisers.firebaseapp.com",
    projectId: "crowd-cruisers",
    storageBucket: "crowd-cruisers",
    messagingSenderId: "522188526579",
    appId: "1:522188526579:web:eb7f0e649c7771633e7886"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };