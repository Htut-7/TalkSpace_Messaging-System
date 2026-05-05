import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import "../css/Chatwindow.css";

export default function Chatwindow({ selectedUser, setSelectedUser }) {

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

  
  if (!selectedUser) {
    return (
      <div className="chat-window empty">
        Select a user to start chatting
      </div>
    );
  }

  return (
  <div className={`chat-window ${selectedUser ? "active" : ""}`}>
      <div className="chat-header">
        <div className="chat-user">
          <div className="avatar-circle"></div>

          <div className="user-info">
            <span className="user-name">
              {selectedUser.name || selectedUser.email}
            </span>

            <span className="user-status">
              {selectedUser.isOnline
                ? "Online"
                : `Last seen ${formatLastSeen(selectedUser.lastSeen)}`}
            </span>
          </div>
        </div>

        <button className="back-btn" onClick={() => setSelectedUser(null)}>
          Back
        </button>
      </div>

      <MessageList selectedUser={selectedUser} />
      <MessageInput selectedUser={selectedUser} />
    </div>
  );
}