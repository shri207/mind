import {
    collection, doc, addDoc, getDocs, setDoc, getDoc,
    query, orderBy, limit, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db, getCurrentUser } from './firebase.js'

// ─── Chat History ───────────────────────────────────────────────

/**
 * Save a chat message to Firestore
 */
export async function saveChatMessage(role, content) {
    const user = getCurrentUser()
    if (!user) return null

    const messagesRef = collection(db, 'users', user.uid, 'messages')
    const docRef = await addDoc(messagesRef, {
        role,
        content,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
    })
    return docRef.id
}

/**
 * Load recent chat history (last N messages)
 */
export async function loadChatHistory(maxMessages = 50) {
    const user = getCurrentUser()
    if (!user) return []

    const messagesRef = collection(db, 'users', user.uid, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(maxMessages))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(doc.data().createdAt),
    }))
}

/**
 * Build a summary of recent conversations for AI context/memory
 * Returns a condensed string of recent interactions
 */
export async function buildAIMemoryContext(maxMessages = 20) {
    const messages = await loadChatHistory(maxMessages)
    if (messages.length === 0) return null

    const contextParts = messages.map(msg => {
        const role = msg.role === 'user' ? 'User' : 'AI'
        return `${role}: ${msg.content}`
    })

    return `Here is the user's recent conversation history with you. Use this to understand their ongoing emotional state, patterns, and previously discussed topics. Reference previous conversations naturally when relevant:\n\n${contextParts.join('\n\n')}`
}

// ─── Mood & Burnout Data ────────────────────────────────────────

/**
 * Save a mood/sentiment snapshot
 */
export async function saveMoodSnapshot(moodData) {
    const user = getCurrentUser()
    if (!user) return null

    const moodRef = collection(db, 'users', user.uid, 'moods')
    const docRef = await addDoc(moodRef, {
        ...moodData,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0],
    })
    return docRef.id
}

/**
 * Load recent mood history
 */
export async function loadMoodHistory(days = 7) {
    const user = getCurrentUser()
    if (!user) return []

    const moodRef = collection(db, 'users', user.uid, 'moods')
    const q = query(moodRef, orderBy('timestamp', 'desc'), limit(days * 5))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
    }))
}

// ─── User Profile / Preferences ─────────────────────────────────

/**
 * Save or update user profile data
 */
export async function saveUserProfile(profileData) {
    const user = getCurrentUser()
    if (!user) return

    const userRef = doc(db, 'users', user.uid, 'profile', 'data')
    await setDoc(userRef, {
        ...profileData,
        updatedAt: serverTimestamp(),
    }, { merge: true })
}

/**
 * Load user profile
 */
export async function loadUserProfile() {
    const user = getCurrentUser()
    if (!user) return null

    const userRef = doc(db, 'users', user.uid, 'profile', 'data')
    const snapshot = await getDoc(userRef)
    return snapshot.exists() ? snapshot.data() : null
}
