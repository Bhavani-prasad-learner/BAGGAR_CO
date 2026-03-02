import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export const useGetFlavourProfile = () => {
  const { user } = useAuth();
  const fetchFlavourProfile = async () => {


    if (!user) {
      throw new Error("User not authenticated");
    }

    const userDocRef = doc(db, "flavourProfiles", user.uid);

    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        // console.log("✅ Flavour profile fetched:", docSnap.data());
        return docSnap.data();
      } else {
        console.warn("⚠️ No flavour profile found for user.");
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching flavour profile:", error);
      throw error;
    }
  };

  return fetchFlavourProfile;
};