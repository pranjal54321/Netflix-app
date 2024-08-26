import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCXiUdQjT1MFLTy6aMCgyUEYpmVdGL7Kj4",
  authDomain: "netflix-clone-8af7a.firebaseapp.com",
  projectId: "netflix-clone-8af7a",
  storageBucket: "netflix-clone-8af7a.appspot.com",
  messagingSenderId: "112313326921",
  appId: "1:112313326921:web:b6836094ac036af36ace98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{
    try {
      const res=  await createUserWithEmailAndPassword(auth,email,password);
      const user=res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};