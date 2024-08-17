import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { ReCaptchaEnterpriseProvider, initializeAppCheck } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAtAMXf-JMlMDi4h_ZYtHRs09aSCuR1s-A",

  authDomain: "examinyasha.firebaseapp.com",

  projectId: "examinyasha",

  storageBucket: "examinyasha.appspot.com",

  messagingSenderId: "820034671842",

  appId: "1:820034671842:web:e8b701c0a857e5fc9cfabb",

  measurementId: "G-JS0XYL4RY7"
}

export const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider("6LeMVCgqAAAAAIv3vz7NzWtGiCvEgF02UBcHyKpN"),
//   isTokenAutoRefreshEnabled: true
// });

// const analytics = getAnalytics(app);
//
export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const functions = getFunctions(app);

functions.region = "europe-north1";
