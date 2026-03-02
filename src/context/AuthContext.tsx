import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Define AuthContextType for Firebase
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  register: (email: string, password: string, displayName?: string, username?: string, phone?: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  sendOTP: (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => Promise<string>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<FirebaseUser>;
  signInWithGoogle: () => Promise<FirebaseUser>;
  generateUsernameFromEmail: (email: string) => string;
  getUserUsername: (userId: string) => Promise<string | null>;
  updateUsername: (userId: string, newUsername: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      // Handle existing users who don't have usernames
      if (firebaseUser) {
        await handleExistingUser(firebaseUser);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in!",
      });
      return result.user;
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Function to check if username is already taken
  const isUsernameTaken = async (username: string): Promise<boolean> => {
    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.warn('Error checking username (continuing with fallback):', error);
      // If we can't check due to permissions, assume username is available
      // This prevents the app from breaking
      return false;
    }
  };

  // Function to generate a unique username
  const generateUniqueUsername = async (baseUsername: string): Promise<string> => {
    try {
      let username = baseUsername;
      let counter = 1;
      
      while (await isUsernameTaken(username)) {
        username = `${baseUsername}${counter}`;
        counter++;
        
        // Prevent infinite loop
        if (counter > 100) {
          username = `${baseUsername}${Date.now()}`;
          break;
        }
      }
      
      return username;
    } catch (error) {
      console.warn('Error generating unique username, using fallback:', error);
      // Fallback: use timestamp to ensure uniqueness
      return `${baseUsername}${Date.now()}`;
    }
  };

  const register = async (email: string, password: string, displayName?: string, username?: string, phone?: string) => {
    try {
      const finalDisplayName = displayName || username || '';
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (finalDisplayName) {
        await updateProfile(result.user, { displayName: finalDisplayName });
      }
      // Store username, email, and phone in Firestore
      if (username) {
        try {
          const finalUsername = await generateUniqueUsername(username);
          const userDocData: any = {
            username: finalUsername,
            email: email,
            displayName: finalDisplayName,
            createdAt: new Date()
          };
          if (phone) userDocData.phone = phone;
          await setDoc(doc(db, "users", result.user.uid), userDocData);
        } catch (firestoreError) {
          console.warn('Failed to store user data in Firestore:', firestoreError);
        }
      }
      toast({
        title: "Account created",
        description: "You have successfully signed up!",
      });
      return result.user;
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed out",
        description: "You have successfully signed out",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      // Store the confirmation result in window object for verification
      (window as any).confirmationResult = confirmationResult;
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the OTP",
      });
      return "OTP sent successfully";
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string) => {
    try {
      const confirmationResult = (window as any).confirmationResult;
      if (!confirmationResult) {
        throw new Error('No OTP verification in progress');
      }

      const result = await confirmationResult.confirm(otp);
      toast({
        title: "Phone number verified",
        description: "You have successfully signed in!",
      });
      return result.user;
    } catch (error: any) {
      toast({
        title: "OTP verification failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user and create user document with username
      try {
        const userDoc = await getDoc(doc(db, "users", result.user.uid));
        
        if (!userDoc.exists()) {
          try {
            // New Google user, generate username from email
            const baseUsername = generateUsernameFromEmail(result.user.email || 'user');
            const generatedUsername = await generateUniqueUsername(baseUsername);
            
            await setDoc(doc(db, "users", result.user.uid), {
              username: generatedUsername,
              email: result.user.email || '',
              displayName: result.user.displayName || '',
              createdAt: new Date(),
              isGeneratedUsername: true,
              authProvider: 'google'
            });
          } catch (firestoreError) {
            console.warn('Failed to create user document for Google user:', firestoreError);
            // Continue without creating user document
          }
        }
      } catch (firestoreError) {
        console.warn('Failed to check user document for Google user:', firestoreError);
        // Continue without checking user document
      }
      
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google",
      });
      return result.user;
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const generateUsernameFromEmail = (email: string) => {
    // Remove special characters and convert to lowercase
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Ensure minimum length of 3 characters
    if (baseUsername.length < 3) {
      return baseUsername + 'user';
    }
    
    return baseUsername;
  };

  // Function to handle existing users and generate usernames
  const handleExistingUser = async (user: FirebaseUser) => {
    try {
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        try {
          // User doesn't have a username, generate one from email
          const baseUsername = generateUsernameFromEmail(user.email || 'user');
          const generatedUsername = await generateUniqueUsername(baseUsername);
          
          // Store the generated username
          await setDoc(doc(db, "users", user.uid), {
            username: generatedUsername,
            email: user.email || '',
            displayName: user.displayName || '',
            createdAt: new Date(),
            isGeneratedUsername: true // Flag to indicate this was auto-generated
          });
          
          console.log(`Generated username for existing user: ${generatedUsername}`);
        } catch (firestoreError) {
          console.warn('Failed to create user document for existing user:', firestoreError);
          // Continue without creating user document
        }
      }
    } catch (error) {
      console.warn('Error handling existing user:', error);
      // Don't throw error to prevent app from breaking
    }
  };

  // Function to get user's username
  const getUserUsername = async (userId: string): Promise<string | null> => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data().username || null;
      }
      return null;
    } catch (error) {
      console.warn('Error getting user username:', error);
      // Return null instead of throwing error to prevent app crash
      return null;
    }
  };

  const updateUsername = async (userId: string, newUsername: string) => {
    // Check if username is taken
    if (await isUsernameTaken(newUsername)) {
      throw new Error('Username is already taken');
    }
    // Update username and displayName fields for the user
    await setDoc(doc(db, "users", userId), { username: newUsername, displayName: newUsername }, { merge: true });
    // Also update Firebase Auth profile if possible
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { displayName: newUsername });
    }
    toast({
      title: "Username updated",
      description: `Your username has been changed to ${newUsername}`,
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    sendOTP,
    verifyOTP,
    signInWithGoogle,
    generateUsernameFromEmail,
    getUserUsername,
    updateUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
