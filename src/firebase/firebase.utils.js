import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDo7us9JvQkTih8_0a8pvM0tNv0JB1f6QU",
    authDomain: "crwn-db-e9d59.firebaseapp.com",
    databaseURL: "https://crwn-db-e9d59.firebaseio.com",
    projectId: "crwn-db-e9d59",
    storageBucket: "crwn-db-e9d59.appspot.com",
    messagingSenderId: "773977425143",
    appId: "1:773977425143:web:4d7788e91a2347ae6dbff2",
    measurementId: "G-CT57D4CCMX"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
