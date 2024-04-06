// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCs00YTfTADAkqGFhAvR_2eZnWI5z0iW-Y",
    authDomain: "nucleo-a7975.firebaseapp.com",
    databaseURL: "https://nucleo-a7975-default-rtdb.firebaseio.com",
    projectId: "nucleo-a7975",
    storageBucket: "nucleo-a7975.appspot.com",
    messagingSenderId: "19687726295",
    appId: "1:19687726295:web:7201eaa56cfeb6a2ece492"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth=getAuth(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export const dbRealTime=getDatabase(app);