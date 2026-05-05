import { collection, onSnapshot } from "firebase/firestore";
import "../css/Sidebar.css";
import {db} from "../firebase/Firebase";
import { useEffect, useState } from "react";

export default function Sidebar({onSelectUser}) {

  const [users,setUsers]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{
    const unsub=onSnapshot(collection(db,"users"),(snapshot)=>{
     setUsers(
      snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
      }))
     )
    });
    return ()=>unsub();
  },[])

  const filteredUsers=users.filter((u)=>{
    const value=search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(value) || u.email?.toLowerCase().includes(value)
    )
  })

  return (
    <div className="sidebar">
      <input type='text' placeholder="Search Users..." className="search" onChange={(e)=>setSearch(e.target.value)} value={search}/>

      <h3>Users</h3>
      {filteredUsers.map(u=>(
        <div key={u.id} className="user-item" onClick={()=>onSelectUser(u)}>
            {u.name || u.email}

            <div className="avatar">
             

              <span className={u.isOnline ? "dot online" : 'dot offline'}></span>
            </div>
            {/* <small>
              {u.isOnline ? "online" : "offline"}
            </small> */}
        </div>
      ))}
    </div>
  )
}
