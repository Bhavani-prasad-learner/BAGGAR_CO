// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// 🔧 UPDATED - Use Enterprise Provider
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURMENT_ID
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;
let analytics;
let realtimeDb;
let appCheck;

const initializeFirebase = async () => {
  try {
    // // console.log('Initializing Firebase app...');
    app = initializeApp(firebaseConfig);
    // // console.log('Firebase app initialized successfully');

    // 🔧 UPDATED - Enterprise Provider
    if (typeof window !== 'undefined') {
      try {
        // console.log('Initializing App Check with reCAPTCHA v3...');
        // appCheck = initializeAppCheck(app, {
        //   provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
        //   isTokenAutoRefreshEnabled: true
        // });
        // console.log('App Check initialized successfully');
      } catch (error) {
        // console.error('App Check initialization failed:', error);
      }
    }

    // Rest of your initialization code remains the same...
    // console.log('Initializing Auth...');
    auth = getAuth(app);
    // console.log('Auth initialized successfully');

    // console.log('Initializing Firestore...');
    db = getFirestore(app);
    // console.log('Firestore initialized successfully');

    // console.log('Initializing Storage...');
    storage = getStorage(app);
    // console.log('Storage initialized successfully');

    // console.log('Initializing Realtime Database...');
    realtimeDb = getDatabase(app);
    // console.log('Realtime Database initialized successfully');

    // console.log('Checking Analytics support...');
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      // console.log('Analytics is supported, initializing...');
      analytics = getAnalytics(app);
      // console.log('Analytics initialized successfully');
    } else {
      // console.log('Analytics is not supported in this environment');
    }

    // console.log('All Firebase services initialized successfully');
    return true;
  } catch (error) {
    // console.error('Firebase initialization error:', error);
    return false;
  }
};

// Initialize Firebase immediately
initializeFirebase().then(success => {            
  if (!success) {
    // console.error('Firebase initialization failed');
  }
});

// Export your functions and services (unchanged)
export const login = async (email, password) => {
  if (!auth) {
    throw new Error('Auth not initialized');
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email, password) => {
  if (!auth) {
    throw new Error('Auth not initialized');
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (!auth) {
    throw new Error('Auth not initialized');
  }
  return signOut(auth);
};

export const uploadFile = async (file, path) => {
  if (!storage) {
    throw new Error('Storage not initialized');
  }
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    // console.error("Storage error:", error);
    throw error;
  }
};

export { 
  auth, 
  db, 
  storage, 
  analytics, 
  realtimeDb,
  app,
  appCheck
};
