import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBgg2_dBGmSxTri35M5iudpv5B3fEBHCdQ",
    authDomain: "mindfuel-wellness.firebaseapp.com",
    projectId: "mindfuel-wellness",
    storageBucket: "mindfuel-wellness.firebasestorage.app",
    messagingSenderId: "270425240695",
    appId: "1:270425240695:web:de0f36147e2be172d70272",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

/**
 * Sign in with Google popup
 */
export async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
}

/**
 * Sign out
 */
export async function logOut() {
    await signOut(auth)
}

/**
 * Listen for auth state changes
 * Auto-signs out cached anonymous users so they re-auth with Google
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, async (user) => {
        if (user && user.isAnonymous) {
            console.log('Signing out old anonymous session...')
            await signOut(auth)
            return // onAuthStateChanged will fire again with null
        }
        callback(user)
    })
}

/**
 * Get current user
 */
export function getCurrentUser() {
    return auth.currentUser
}
