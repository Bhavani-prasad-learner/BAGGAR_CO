import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebaseConfig'

const showNewBadge = async (userId: string) => {
  const userSnap = await getDoc(doc(db, "users", userId));
  const globalSnap = await getDoc(doc(db, "globalNotifications", "latest"));

  const userTime = userSnap.data()?.last_seen_notification?.toDate?.() || new Date(0);
  const globalTime = globalSnap.data()?.timestamp?.toDate?.() || new Date();

  return globalTime > userTime; // true = show badge
};

export default showNewBadge