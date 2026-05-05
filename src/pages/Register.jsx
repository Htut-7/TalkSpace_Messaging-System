import "../css/Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function Register() {

    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    const navigate=useNavigate();

     let {error,loading,signUp}=useSignup();
    if(error){
        return <p className="error">{error}</p>
    }

    const regUser=async(e)=>{
        e.preventDefault();
        let user =await signUp(email,password,name);
        console.log(email,password,name)

        if(user){
            navigate('/login')
        }
    }

  return (
    <form className="reg-form" onSubmit={regUser}>
        <div className="form-container">
            <h3>Welcome to TalkSpace</h3>
            <p>Create your account to start chatting</p>

            <div className="form-input">
                <label>UserName</label>
                <input type='text' placeholder="Enter your UserName" onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Email</label>
                <input type='email' placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <div className="form-control">
                    <Link to='/login'>Already have an Account?</Link>
                </div>

                <div className="form-btn">
                    <button type="submit" disabled={loading}>
                       {loading ? (
                        <div className="btn-content">
                            <div className="spinner"></div>
                        </div>
                       ): (
                        "Register"
                       )}
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}
