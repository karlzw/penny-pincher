import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS0700_A9fS83vSKl5tp53DzWmgn5Qm00",
  authDomain: "penny-pincher-3d29d.firebaseapp.com",
  projectId: "penny-pincher-3d29d",
  storageBucket: "penny-pincher-3d29d.appspot.com",
  messagingSenderId: "287704469638",
  appId: "1:287704469638:web:024b75b414ea837f6fc107",
  measurementId: "G-WWRG5HP0VF",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();