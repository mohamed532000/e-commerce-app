import {initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database";

let firebaseConfig = {
    apiKey: "AIzaSyBA8cziXyUh7Rxsxl-J4K-umg3xbhC7Q60",
    authDomain: "e-commerce-website-9813e.firebaseapp.com",
    databaseURL: "https://e-commerce-website-9813e-default-rtdb.firebaseio.com",
    projectId: "e-commerce-website-9813e",
    storageBucket: "e-commerce-website-9813e.appspot.com",
    messagingSenderId: "174877839663",
    appId: "1:174877839663:web:858df53668f3310f96d1da",
    measurementId: "G-CTLJMGQVF4"
};

let app = initializeApp(firebaseConfig);
export let database = getDatabase(app);