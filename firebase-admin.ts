import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

import { getFirestore } from 'firebase-admin/firestore'

const serviceKey = require('./service_key.json');

let adminApp: App;

adminApp = (getApps().length === 0) ? initializeApp({ credential: cert(serviceKey), }) : getApp();


const adminDb = getFirestore(adminApp);


export { adminApp, adminDb }