import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { validateEmail,validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstances";


function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error 
    if (!validateEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
        setError("please enter a password");
        return;
      }
      setError("")
      //api call
      try {
        const response=await axiosInstance.post("/auth/login",{
          email:email,
          password:password
        })
        console.log(response,"response");
        if(response.data&&response.data.token&&response.data.role==="student"){
          localStorage.setItem('token',response.data.token)
          navigate("/home")
        }else if(response.data&&response.data.token&&response.data.role==="admin"){
          localStorage.setItem('token',response.data.token)
          navigate("/admin/home")
        }
      } catch (error) {
        if(error.response&&error.response.data&&error.response.data.message){
          setError(error.response.data.message)
        }else{
          setError("an unexpected error occured pls try again")
        }
      }
  };

  return (
    <>
     
      <div className="flex items-center justify-center  mt-[15vh]">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin} >
            <h4 className="mb-7 text-2xl">Login</h4>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="input-box"
            />
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
        
            {error && <p className="text-red-600 pt-1 text-sm">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p>
              not registered yet?{" "}
              <Link className="font-medium underline text-primary" to="/signup">
                Create Student account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
