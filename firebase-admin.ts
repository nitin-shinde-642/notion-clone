import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

import { getFirestore } from 'firebase-admin/firestore'

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_KEY!);

let adminApp: App;

adminApp = (getApps().length === 0) ? initializeApp({ credential: cert(serviceKey), }) : getApp();


const adminDb = getFirestore(adminApp);


export { adminApp, adminDb }