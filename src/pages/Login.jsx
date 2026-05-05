import "../css/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../hooks/useSignin";
import { useNavigate } from "react-router-dom";

export default function Login() {

  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');
  const navigate=useNavigate();

  let {error,loading,signIn}=useSignin();
  if(error){
    return <p className="error">{error}</p>
  }

  const loginUser=async(e)=>{
    e.preventDefault();
    let user=await signIn(email,password);

    if(user){
      navigate('/dashboard');
    }
  }

  return (
    <form className="login-form" onSubmit={loginUser}>
      <div className="form-container">
        <h3>Welcome Back</h3>
        <p>Please login to continue chatting</p>

        <div className="form-input">
          <label>Email</label>
          <input type='text' placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

          <label>Password</label>
          <input type="password" placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

          <div className="form-control">
            <Link to='/register'>Don't have an Account?</Link>
          </div>

          <div className="form-btn">
            <button type="submit" disabled={loading}>
             {loading ? (
              <div className="btn-content">
                <div className="spinner"></div>
              </div>
             ):(
              "Login"
             )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
