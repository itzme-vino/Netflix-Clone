import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCf_B9_giz_v7LdrOrREDTq5ER1VW-uw5E",
  authDomain: "netflix-clone-175bb.firebaseapp.com",
  projectId: "netflix-clone-175bb",
  storageBucket: "netflix-clone-175bb.appspot.com",
  messagingSenderId: "554291930573",
  appId: "1:554291930573:web:ecfbfe1c5a61edc08e9084"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>
{
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password)=>
{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
     
}
const logout = ()=>
{
    signOut(auth);
}
export {auth, db, login , signup, logout};
