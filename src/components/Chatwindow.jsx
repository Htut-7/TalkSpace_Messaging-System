import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import "../css/Chatwindow.css";

export default function Chatwindow({ selectedUser }) {

const [now, setNow] = useState(() => Date.now());


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "";

    const time = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    const diff = Math.floor((now - time) / 60000);

    if (diff < 1) return "just now";
    if (diff < 60) return `${diff} min ago`;

    const hours = Math.floor(diff / 60);
    return `${hours} hr ago`;
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {selectedUser ? (
          <>
            <div>{selectedUser.name || selectedUser.email}</div>
            <small>
              {selectedUser.isOnline
                ? "Online"
                : `Last seen ${formatLastSeen(selectedUser.lastSeen)}`}
            </small>
          </>
        ) : (
          "Chat"
        )}
      </div>

      <MessageList selectedUser={selectedUser}/>
      <MessageInput selectedUser={selectedUser}/>
    </div>
  );
}