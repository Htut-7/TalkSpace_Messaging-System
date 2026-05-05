import { orderBy, query,collection, onSnapshot, updateDoc,doc } from "firebase/firestore";
import "../css/MessageList.css";
import {db,auth} from "../firebase/Firebase";
import { useEffect, useState,useRef } from "react";
import { getChatId } from "../utils/Chat";


export default function MessageList({selectedUser}) {

  let [message,setMessage]=useState([]);
  const bottomRef=useRef()

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  },[message])

  const formatTime=(timestamp)=>{
    if(!timestamp)
      return '';
    return new Date(timestamp.seconds * 1000).toLocaleTimeString([],{
      hour: "2-digit",
      minute: "2-digit"
    });
  }
    useEffect(()=>{
      
  if(!selectedUser)
    return;

  const chatId=getChatId(
    auth.currentUser.uid,
    selectedUser.uid
  );

  const q=query(
    collection(db,"chats",chatId,"messages"),
    orderBy("createdAt")
  );

  const unsub=onSnapshot(q,(snapshot)=>{
    setMessage(
      snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }))
    )
  })
    return ()=>unsub();
    },[selectedUser])

    useEffect(()=>{
      if(!selectedUser || message.length===0)
      return;

      const chatId=getChatId(
        auth.currentUser.uid,
        selectedUser.uid
      )

    const markDelivered=async()=>{
      const updates=message.filter(
        m=>
          m.userId===auth.currentUser.uid && m.status==='sent'
      );

      for(const m of updates){
        await updateDoc(doc(db,"chats",chatId,"messages",m.id),
      {status:'delivered'}
    )
      }
    };
    markDelivered()
    },[message,selectedUser])

    useEffect(()=>{
      if(!selectedUser || message.length===0)
        return;

      const chatId=getChatId(
        auth.currentUser.uid,
        selectedUser.uid
      )

      const markRead=async()=>{
        const unread=message.filter(
          m=>
            m.userId !== auth.currentUser.uid && m.status !== 'read'
        );
        
        for (const m of unread){
          const ref=doc(db,'chats',chatId,'messages',m.id);

          try{
            await updateDoc(ref,{status:'read'})
          }catch(err){
            console.log(err,'Skip missing doc',m.id)
          }
        }
      }
      markRead();

    },[message,selectedUser])


    if(!selectedUser){
       return <div className="messages">
        Select a user to start chat
       </div>
    }

    
     

  return (
    <div className="messages">
      
        {message.map(m=>
         <div key={m.id} className={m.userId===auth.currentUser?.uid ? "bubble-mine" : 'bubble-other'}>
          <div className="msg-user">{m.name}</div>
          <div className="msg-text">{m.text}</div>

          <div className="msg-footer">
            <span className="msg-time">
              {formatTime(m.createdAt)}
            </span>

            {m.userId===auth.currentUser?.uid && (
              <span className="msg-status">
                {m.status==="sent" && "✓"}
                {m.status==="delivered" && "✓✓"}
                {m.status==='read' && "✓✓read"}
              </span>
            )}
          </div>
         </div>
        )}
        

        <div ref={bottomRef}></div>
        
    </div>
  )
}
