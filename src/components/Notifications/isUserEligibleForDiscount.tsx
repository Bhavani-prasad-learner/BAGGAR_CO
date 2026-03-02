// Import necessary Firestore and Firebase Auth utilities
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebaseConfig';

/**
 * Checks if the currently logged-in user is eligible for a discount.
 * This function retrieves the user's document from Firestore and 
 * returns their 'reviewCount' value.
 * */
//  * @returns {Promise<number>} The user's review count (used to decide discount eligibility).
//  *                            Returns 0 if not logged in or if no data found.
 
export const isUserEligibleForDiscount = async () => {
  try {
    // Get the currently authenticated user
    const user = auth.currentUser;

    // If user is not logged in, return 0 immediately
    if (!user) {
      console.warn('User not logged in.');
      return 0;
    }

    // Reference to the user's document in Firestore
    const userRef = doc(db, 'users', user.uid);

    // Fetch the document snapshot
    const userSnap = await getDoc(userRef);

    // Check if the user document exists
    if (userSnap.exists()) {
      const data = userSnap.data();

      // Return the user's review count (or 0 if missing)
      return data.reviewCount || 0;
    }

    // If document not found
    console.warn('User document does not exist.');
    return 0;

  } catch (error) {
    // Catch and log any unexpected errors
    console.error('Error checking discount eligibility:', error);
    return 0;
  }
};
