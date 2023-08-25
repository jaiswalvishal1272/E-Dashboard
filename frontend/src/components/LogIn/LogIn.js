import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LogIn.css';

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')
        }
        else {
            alert("please enter correct details.");
        }
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            <input className="input-box" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email..." />
            <input className="input-box" type="password" value={ password } onChange={ (e)=>setPassword(e.target.value) } placeholder="Enter Password..." />

            <button className="login-btn" type="button" onClick={ handleLogin }>Log In</button>
        </div>
    )
}
export default LogIn;