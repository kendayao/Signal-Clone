import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDeXQqB03gBlpmIeWSqyDiBMcKXY39kJs",
    authDomain: "signal-clone-53de0.firebaseapp.com",
    projectId: "signal-clone-53de0",
    storageBucket: "signal-clone-53de0.appspot.com",
    messagingSenderId: "584890459835",
    appId: "1:584890459835:web:806897f70dcf34d12f6b9e"
  };

  let app;

  if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
  }else{
    app=firebase.app();
  }
  
const db=app.firestore();
const auth=firebase.auth();

export{ db, auth }

