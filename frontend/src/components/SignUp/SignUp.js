import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate('/')
        }
    }, [navigate])

    const collectData = async () => {
        console.log(name, email,password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
        
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input className="input-box" type="text" value={ name } onChange={ (e)=>setName(e.target.value) } placeholder="Enter Name..." />
            <input className="input-box" type="text" value={ email } onChange={ (e)=>setEmail(e.target.value) } placeholder="Enter Email..." />
            <input className="input-box" type="password" value={ password } onChange={ (e)=>setPassword(e.target.value) } placeholder="Enter Password..." />

            <button className="signup-btn" type="button" onClick={ collectData }>Sign Up</button>

        </div>
    )
}
export default SignUp;