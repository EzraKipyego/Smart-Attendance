import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// TODO: replace with your Firebase config later
const firebaseConfig = {
  apiKey: "AIzaSyCctOf635Qkq88q1wY86VffNyiA06sH9rw",
  authDomain: "smart-attendance-86781.firebaseapp.com",
  projectId: "smart-attendance-86781",
  storageBucket: "smart-attendance-86781.firebasestorage.app",
  messagingSenderId: "1077447414354",
  appId: "1:1077447414354:web:778bf240eaa8546a4f058b"
};

const app = initializeApp(firebaseConfig)

// authentication setup
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Google login function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.log(error)
  }
}

export { auth }