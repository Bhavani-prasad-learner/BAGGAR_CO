import { doc, collection, setDoc,updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig'


const submitReview = async ({ foodItemId, userId, userName, reviewText, rating }) => {
  try {
    const userReviewRef = doc(
      collection(db, 'reviews', foodItemId, 'userReviews'),
      userId
    );

    await setDoc(userReviewRef, {
      name: userName,
      review: reviewText,
      timestamp: serverTimestamp(),
      rating:rating
    });

    console.log('Review submitted!');
     const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      reviewCount: increment(1),
    });
        console.log('User review count incremented.');

  } catch (error) {
    console.error('Error submitting review:', error);
  }
};

export default submitReview;