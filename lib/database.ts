import {
    ref,
    push,
    set,
    get,
    query,
    orderByChild,
    equalTo,
    update,
    remove,
    serverTimestamp,
} from "firebase/database"
import { db } from "./firebase"

// ─── BUSINESSES ───────────────────────────────────────

export async function createBusiness(data: {
    userId: string
    businessName: string
    category: string
    subcategory: string
    description: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
    email: string
    website: string
    timings: string
}) {
    try {
        const businessRef = ref(db, "businesses")
        const newRef = push(businessRef)
        await set(newRef, {
            ...data,
            status: "pending",
            isVerified: false,
            isFeatured: false,
            rating: 0,
            reviewCount: 0,
            createdAt: Date.now(),
        })
        return { id: newRef.key, error: null }
    } catch (error: any) {
        return { id: null, error: error.message }
    }
}

export async function getUserBusinesses(userId: string) {
    try {
        const businessRef = ref(db, "businesses")
        const snapshot = await get(businessRef)

        if (!snapshot.exists()) return { businesses: [], error: null }

        const businesses: any[] = []
        snapshot.forEach((child) => {
            const data = child.val()
            if (data.userId === userId) {
                businesses.push({ id: child.key, ...data })
            }
        })

        return { businesses, error: null }
    } catch (error: any) {
        return { businesses: [], error: error.message }
    }
}

export async function getBusinessById(id: string) {
    try {
        const businessRef = ref(db, `businesses/${id}`)
        const snapshot = await get(businessRef)

        if (!snapshot.exists()) return { business: null, error: "Not found" }

        return {
            business: { id: snapshot.key, ...snapshot.val() },
            error: null,
        }
    } catch (error: any) {
        return { business: null, error: error.message }
    }
}

export async function updateBusiness(id: string, data: Partial<any>) {
    try {
        const businessRef = ref(db, `businesses/${id}`)
        await update(businessRef, { ...data, updatedAt: Date.now() })
        return { error: null }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteBusiness(id: string) {
    try {
        const businessRef = ref(db, `businesses/${id}`)
        await remove(businessRef)
        return { error: null }
    } catch (error: any) {
        return { error: error.message }
    }
}

// ─── USERS ────────────────────────────────────────────

export async function createUserProfile(data: {
    userId: string
    displayName: string
    email: string
    photoURL?: string
}) {
    try {
        const userRef = ref(db, `users/${data.userId}`)
        await set(userRef, {
            ...data,
            createdAt: Date.now(),
        })
        return { error: null }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getUserProfile(userId: string) {
    try {
        const userRef = ref(db, `users/${userId}`)
        const snapshot = await get(userRef)

        if (!snapshot.exists()) return { profile: null, error: null }

        return {
            profile: { id: snapshot.key, ...snapshot.val() },
            error: null,
        }
    } catch (error: any) {
        return { profile: null, error: error.message }
    }
}