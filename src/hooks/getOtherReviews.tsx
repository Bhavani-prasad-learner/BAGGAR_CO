import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

/**
 * Fetches all reviews for a specific food item.
 * @param {string} foodItemId - The ID or name of the food item.
 * @returns {Promise<Array<object>>} - An array of review objects.
 */
const getOtherReviews = async (foodItemId: string) => {
  try {
    const reviewsRef = collection(db, 'reviews', foodItemId, 'userReviews');
    const q = query(reviewsRef, orderBy('timestamp', 'desc'))
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => 
      doc.data(),
    );

    return reviews; // Array of reviews with userId
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export default getOtherReviews;
