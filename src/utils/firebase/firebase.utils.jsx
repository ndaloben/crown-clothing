import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJIxxj9XO5hmDYanUDS-9pMKU8ra8kA_s",
    authDomain: "crwn-clothing-db-34032.firebaseapp.com",
    projectId: "crwn-clothing-db-34032",
    storageBucket: "crwn-clothing-db-34032.appspot.com",
    messagingSenderId: "982681339194",
    appId: "1:982681339194:web:39625311add80225b07c03"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

const userDocRef = doc(db, 'users', userAuth.uid);

const userSnapshot = await getDoc(userDocRef);


if(!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
  }catch (error) {
    console.log('error creating the user', error.message);
  }
  }

  return userDocRef;
};
  
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)