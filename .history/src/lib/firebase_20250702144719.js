// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

// Replace these config values with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCLkDpkMatZamcKgPiA4EMKJUfM_WwOLrY",
  authDomain: "caterpillar-afb54.firebaseapp.com",
  projectId: "caterpillar-afb54",
  storageBucket: "caterpillar-afb54.appspot.com", // <-- Correct this!
  messagingSenderId: "349071701043",
  appId: "1:349071701043:web:1097db1b55c70f21b9df46",
  measurementId: "G-R45JDQBDTC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
export const auth = getAuth(app);

// Sign up function
export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update user profile with display name
    await updateProfile(userCredential.user, { displayName: name });
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// Sign in function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// Reset password function
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
