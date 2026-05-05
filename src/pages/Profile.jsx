import "../css/Profile.css";
import { useState } from "react";

export default function Profile() {

    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');

  return (
    <form className="profile-form">
        <div className="form-container">
            <h3>Edit Profile</h3>

            <div className="form-input">
                <label>UserName</label>
                <input type='text' placeholder="Enter Your new Name" onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Email</label>
                <input type='email' placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <div className="form-btn">
                    <button>Update</button>
                </div>
            </div>
        </div>
    </form>
  )
}
