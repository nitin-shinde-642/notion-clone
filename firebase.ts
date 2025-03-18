import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAjqYBVck4GWzz4ZkHyNP8AG5b8CEfTvtA",
    authDomain: "notion-clone-94e11.firebaseapp.com",
    projectId: "notion-clone-94e11",
    storageBucket: "notion-clone-94e11.firebasestorage.app",
    messagingSenderId: "284603218161",
    appId: "1:284603218161:web:72e0fbdba181b5f7d55150"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }