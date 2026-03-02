import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebaseConfig'

const markAsRead = async (userId: string) => {
  const globalRef = doc(db, "globalNotifications", "latest");
  const globalSnap = await getDoc(globalRef);
  const globalTime = globalSnap.data()?.timestamp;
  if (globalTime) {
    await updateDoc(doc(db, "users", userId), {
      last_seen_notification: globalTime,
    });
  }
};

export default markAsRead;



