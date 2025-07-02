// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';

// Replace these config values with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyA0YHfbxhjcBL_jFbO3JSGfxcaYKJaVUio",
  authDomain: "gesturedelhi-a90bf.firebaseapp.com",
  databaseURL: "https://gesturedelhi-a90bf-default-rtdb.firebaseio.com",
  projectId: "gesturedelhi-a90bf",
  storageBucket: "gesturedelhi-a90bf.appspot.com",
  messagingSenderId: "744554916020",
  appId: "1:744554916020:web:dddb66a3da78883845cfe1",
  measurementId: "G-GGWKNMQXB8"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
export const auth = getAuth(app);

// Initialize Realtime Database service
export const db = getDatabase(app);

// Sign up function (Realtime DB)
export async function signUp(email, password, name, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update user profile with display name
    await updateProfile(userCredential.user, { displayName: name });
    // Store user role in Realtime Database
    await set(ref(db, 'users/' + userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      name,
      role
    });
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

// Fetch user role by UID (Realtime DB)
export async function getUserRole(uid) {
  try {
    const snapshot = await get(child(ref(db), 'users/' + uid));
    if (snapshot.exists()) {
      return { role: snapshot.val().role, error: null };
    } else {
      return { role: null, error: 'User not found' };
    }
  } catch (error) {
    return { role: null, error: error.message };
  }
}
