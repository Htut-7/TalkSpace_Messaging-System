import { signOut } from "firebase/auth";
import {auth,db} from "../firebase/Firebase"
import { doc, updateDoc } from "firebase/firestore";

export default function useSignout() {

    const logOut=async()=>{
       try{
        const user=auth.currentUser

        if(user){
          await updateDoc(doc(db,'users',user.uid),{
            isOnline:false,
            lastSeen: new Date()
          });
        }

        await signOut(auth);

       }catch(err){
        console.log('Logout Erro',err)
       }
    }

  return {logOut}
}
