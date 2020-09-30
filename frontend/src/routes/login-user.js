import React, { Component } from 'react';
import axios from 'axios';

export default class userLogin extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }
  
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        };
 
        axios.post('http://localhost:4000/users/login', userLogin)
            .then(response => {
                if (response.data === "good"){
                    window.location = 'http://localhost:3000/good';
                }
                else if (response.data === "bad"){
                    window.location = 'http://localhost:3000/bad';
                }
            })
    }

    render(){
        return(
            <div>
                <h3>Login In!</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}