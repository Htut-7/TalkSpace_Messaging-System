import { useState } from "react";
import {auth,db} from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";

export default function useSignup() {

    let [loading,setLoading]=useState(false);
    let [error,setError]=useState('');

    const signUp=async(email,password,name)=>{
        try{
            console.log(email,password,name)
            setLoading(true);
            let res= await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                email,
                name,
                createdAt: serverTimestamp(),
                isOnline:true,
                lastSeen: serverTimestamp()
            });
            setLoading(false);
            return (res.user);
        }catch(err){
            console.log('SIGN UP error', err.code, err.message)
            setError(err.message);
            setLoading(false);
        }
    }

  return {loading,error,signUp}
}
