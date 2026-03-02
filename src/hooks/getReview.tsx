import { doc, collection, getDoc,updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig'


const getReview = async ({ foodItemId, userId }) => {
  try {
     const reviewRef = doc(db, 'reviews', foodItemId, 'userReviews', userId);
    const reviewSnap = await getDoc(reviewRef);

    if (reviewSnap.exists()) {
      return reviewSnap.data(); // { name, review, timestamp }
    } else {
      // console.log('No review found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching review:', error);
    return null;
  }
};

export default getReview;