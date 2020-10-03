import React from 'react';
import {useHistory} from "react-router-dom";

export deafult function AutoOptions(){
    const history = useHistory();
    return(
    <div>
        <button>Register</button>
        <button>Log In </button>
    </div>
    )
}