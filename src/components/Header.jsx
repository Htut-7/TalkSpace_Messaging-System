import { useEffect } from "react";
import useSignout from "../hooks/useSignout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth,db} from "../firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../css/Header.css"

export default function Header() {

  let {logOut}=useSignout();
  const navigate=useNavigate();

  const logOutUser=async()=>{
    await logOut();
    navigate('/login')
  }

  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,async(user)=>{
      if(!user) 
        return;

      await updateDoc(doc(db,"users",user.uid),{
        isOnline:true
      })
    });
    return ()=>unsub();
  },[])

  useEffect(()=>{
    const handleOffline=async()=>{
      const user=auth.currentUser;
      if(!user)
        return;

      await updateDoc(doc(db,"users",user.uid),{
        isOnline: false,
        lastSeen: new Date()
      });
    };
    window.addEventListener("beforeunload",handleOffline);

    return ()=>{
      window.removeEventListener("beforeunload",handleOffline)
    }
  },[])

  return (
    <div className='header'>
      <h3>TalkSpace</h3>

      <div className="header-right">
        <Link to='/profile'>Profile</Link>
        <button onClick={logOutUser}>Logout</button>
      </div>
    </div>
  )
}
