
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBGKxyI8aXA9CmqA4Bs1faCgtAtytU4U1A",
    authDomain: "hermes-12020.firebaseapp.com",
    projectId: "hermes-12020",
    storageBucket: "hermes-12020.appspot.com",
    messagingSenderId: "690320805524",
    appId: "1:690320805524:web:27dfa87652afb61ba5ee81"
};
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };