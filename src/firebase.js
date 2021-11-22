import firebase from "firebase";

    const firebaseConfig = {
        apiKey: "AIzaSyDDNyKAzsPdzYJUFiosO2oZWqkuSIBftn0",
        authDomain: "linkdin-clone-e10cf.firebaseapp.com",
        projectId: "linkdin-clone-e10cf",
        storageBucket: "linkdin-clone-e10cf.appspot.com",
        messagingSenderId: "647353242161",
        appId: "1:647353242161:web:5f88d3cdf71d2afaa2bb10"
      };

     const firebaseApp = firebase.initializeApp(firebaseConfig);
     const db = firebase.firestore();
     const auth = firebase.auth();
     const provider = new firebase.auth.GoogleAuthProvider();
     const storage = firebase.storage();

     export {auth, provider, storage };
     export default db;