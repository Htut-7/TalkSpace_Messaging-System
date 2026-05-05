import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Chatwindow from "../components/Chatwindow";
import { useState } from "react";
import "../css/Dashboard.css";

export default function Dashboard() {

  const [selectedUser,setSelectedUser]=useState(null);

  return (
    <div className="dashboard">
        <Header/>

        <div className="main">
            <Sidebar onSelectUser={setSelectedUser}/>
            <Chatwindow selectedUser={selectedUser}/>
        </div>
    </div>
  )
}
