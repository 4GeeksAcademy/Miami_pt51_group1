
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css"



export const Register = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [recovery_question, setRecoveryquestion] = useState("");
	const [recovery_answer, setRecoveryanswer] = useState("");
    const navigate= useNavigate();
    const handleSubmit= async (event)=>{
        event.preventDefault();
        try{
            await actions.register(email, password, recovery_question, recovery_answer);
            setEmail("");
            setPassword("");
            setRecoveryquestion("");
            setRecoveryanswer("");
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }




    return (
        <form className="form" onSubmit={handleSubmit}>
        <div>
            <div className="signup-form">
                <div className="searchbar">
                <label>Email Address</label>
                <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                />
                </div>

                <div className="searchbar">
                <label>Password</label>
                <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                />
                </div>
				<div className="searchbar">
                <label>Recovery Question</label>
                <input
                type="text"
                value={recovery_question}
                placeholder="Enter recovery question"
                onChange={e => setRecoveryquestion(e.target.value)}
                />
                </div>
				<div className="searchbar">
                <label>Recovery Answer</label>
                <input
                type="text"
                value={recovery_answer}
                placeholder="Enter recovery answer"
                onChange={e => setRecoveryanswer(e.target.value)}
                />
                </div>
            </div>
            <div>
                <button type="submit" className="searchbutton">Submit</button>
            </div>
        </div>
        </form>
        // create button to send data to endpoint
    );
};