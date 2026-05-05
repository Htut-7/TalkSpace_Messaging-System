import "../css/MessageInput.css";
import { useState } from "react";
import {db,auth} from "../firebase/Firebase"
import { addDoc,collection, serverTimestamp } from "firebase/firestore";
import { getChatId } from "../utils/Chat";

export default function MessageInput({selectedUser}) {

    let [text,setText]=useState('');

    const sendMessage=async()=>{
        if(!selectedUser || !text.trim())
            return;

        const chatId=getChatId(
            auth.currentUser.uid,
            selectedUser.uid
        )

        await addDoc(collection(db,"chats",chatId,"messages"),{
            text:text.trim(),
            userId:auth.currentUser.uid,
            name:auth.currentUser.email,
            createdAt:serverTimestamp(),
            status: 'sent',
            chatId
        })
        setText('');

    }

  return (
    <div className="input-box">
        <input type="text" placeholder="Type a Message..." onChange={(e)=>setText(e.target.value)} value={text}/>
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}
