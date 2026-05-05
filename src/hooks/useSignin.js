import { useState } from "react";
import {auth,db} from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateDoc,doc } from "firebase/firestore";

export default function useSignin() {

    let [loading,setLoading]=useState(false);
    let [error,setError]=useState('');

    const signIn=async(email,password)=>{
        try{
            setLoading(true);
            let res=await signInWithEmailAndPassword(auth,email,password);
            const userRef=doc(db,"users",res.user.uid);
            await updateDoc(userRef,{
                isOnline:true
            })
            setLoading(false);
            return (res.user)
        }catch(err){
            setError(err.message);
            setLoading(false);
        }
        
    }

  return {loading,error,signIn}
}
