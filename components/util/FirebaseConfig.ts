import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt6T9N5UZTAOH0_zmM8qro1A8dxxEM5uc",
  authDomain: "keeletigu.firebaseapp.com",
  projectId: "keeletigu",
  storageBucket: "keeletigu.firebasestorage.app",
  messagingSenderId: "55886585114",
  appId: "1:55886585114:web:d67ba6d8738ebefc2ae0a3",
  measurementId: "G-4QF1Y3TD6C"
};

export const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider("6LeMVCgqAAAAAIv3vz7NzWtGiCvEgF02UBcHyKpN"),
//   isTokenAutoRefreshEnabled: true
// });

// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const functions = getFunctions(app);

functions.region = "europe-north1";
