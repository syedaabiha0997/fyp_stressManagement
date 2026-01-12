import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { auth } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// Remember Me logic
const applyPersistence = async (rememberMe) => {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );
};

// SIGN UP
export const signUpWithEmail = async (email, password, rememberMe = true) => {
  await applyPersistence(rememberMe);
  return createUserWithEmailAndPassword(auth, email, password);
};

// LOGIN
export const signInWithEmail = async (email, password, rememberMe = true) => {
  await applyPersistence(rememberMe);
  return signInWithEmailAndPassword(auth, email, password);
};

// GOOGLE LOGIN
export const signInWithGoogle = async (rememberMe = true) => {
  await applyPersistence(rememberMe);
  return signInWithPopup(auth, googleProvider);
};

// LOGOUT
export const logout = () => signOut(auth);

// RESET PASSWORD
export const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};
