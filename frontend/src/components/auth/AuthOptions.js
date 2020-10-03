import React from 'react';
import {useHistory} from "react-router-dom";

export deafult function AuthOptions(){
    const history = useHistory();

    const register = () => history.push("/sign-up")
    const login = () => history.push("/login-in")

    return(
    <div>
        <button onClick = {register}>Register</button>
        <button onClick = {login}>Log In </button>
    </div>
    )
};