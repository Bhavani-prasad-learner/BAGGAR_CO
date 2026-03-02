import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
  const [testMessage, setTestMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [initializationAttempts, setInitializationAttempts] = useState(0);

  useEffect(() => {
    const maxAttempts = 5;
    const attemptInterval = 2000; // 2 seconds

    const checkFirebaseInitialization = async () => {
      if (!db || !auth) {
        console.log('Firebase services not ready, attempt:', initializationAttempts + 1);
        if (initializationAttempts < maxAttempts) {
          setInitializationAttempts(prev => prev + 1);
          setTimeout(checkFirebaseInitialization, attemptInterval);
        } else {
          setConnectionStatus('error');
          setTestMessage('Firebase services failed to initialize after multiple attempts');
          setErrorDetails('Please check the console for initialization errors');
        }
        return;
      }

      // Test Firestore connection
      const testFirestore = async () => {
        try {
          console.log('Testing Firestore connection...');
          const testCollection = collection(db, 'test');
          const docRef = await addDoc(testCollection, { 
            timestamp: new Date(),
            test: 'connection_test',
            attempt: initializationAttempts
          });
          console.log('Test document created with ID:', docRef.id);
          
          const querySnapshot = await getDocs(testCollection);
          if (!querySnapshot.empty) {
            setConnectionStatus('connected');
            setTestMessage('Firebase connection successful!');
            console.log('Firestore test successful');
          }
        } catch (error) {
          console.error('Firestore test error:', error);
          setConnectionStatus('error');
          setTestMessage('Firebase connection failed');
          setErrorDetails(error instanceof Error ? error.message : 'Unknown error occurred');
        }
      };

      // Test Auth connection
      try {
        console.log('Testing Auth connection...');
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log('Auth state changed:', user ? 'authenticated' : 'not authenticated');
          setAuthStatus(user ? 'authenticated' : 'not-authenticated');
        }, (error) => {
          console.error('Auth state change error:', error);
          setAuthStatus('not-authenticated');
          setErrorDetails(error.message);
        });

        await testFirestore();
        return () => unsubscribe();
      } catch (error) {
        console.error('Auth test error:', error);
        setAuthStatus('not-authenticated');
        setErrorDetails(error instanceof Error ? error.message : 'Auth initialization failed');
      }
    };

    checkFirebaseInitialization();
  }, [initializationAttempts]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Database Status:</p>
          <p className={`${
            connectionStatus === 'connected' ? 'text-green-600' : 
            connectionStatus === 'error' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {connectionStatus === 'checking' ? `Checking connection... (Attempt ${initializationAttempts + 1})` :
             connectionStatus === 'connected' ? 'Connected' :
             'Connection Error'}
          </p>
        </div>

        <div>
          <p className="font-semibold">Authentication Status:</p>
          <p className={`${
            authStatus === 'authenticated' ? 'text-green-600' :
            authStatus === 'not-authenticated' ? 'text-yellow-600' :
            'text-blue-600'
          }`}>
            {authStatus === 'checking' ? 'Checking auth...' :
             authStatus === 'authenticated' ? 'Authenticated' :
             'Not Authenticated'}
          </p>
        </div>

        {testMessage && (
          <p className={`mt-2 ${
            connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'
          }`}>
            {testMessage}
          </p>
        )}

        {errorDetails && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <p className="text-sm text-red-600">Error Details:</p>
            <p className="text-xs text-red-500">{errorDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
} 