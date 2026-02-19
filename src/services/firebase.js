import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
