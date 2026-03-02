import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '@/firebase/firebaseConfig'

export const useSetFlavourProfile = () => {
  const saveFlavourProfile = async (profileData: Record<string, any>) => {
    const currentUser = auth?.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userDocRef = doc(db, "flavourProfiles", currentUser.uid);

    try {
      await setDoc(userDocRef, profileData, { merge: true }); // merge keeps old data
      console.log("Flavour profile saved");
    } catch (error) {
      console.error("Error saving flavour profile:", error);
      throw error;
    }
  };

  return saveFlavourProfile;
};
