import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAbI6Wgp7D2L8AXKhpITOj1bhRurfLkZI4",
  authDomain: "visitnep-8edea.firebaseapp.com",
  projectId: "visitnep-8edea",
  storageBucket: "visitnep-8edea.appspot.com",
  messagingSenderId: "850268248224",
  appId: "1:850268248224:web:2bee2d0018edae7b3f91c5",
};

export const app = firebase.initializeApp(config);
