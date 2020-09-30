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

        //David created this on 9/29 for user login!!!
        /*const userLogin = {

            email: this.state.email,
            password: this.state.password

        };
        */

        //console.log(NewUser);.

        //David created this on 9/29
        axios.post('http://localhost:4000/users/login', userLogin)
            .then(res => console.log(res.data));
            
        axios.get('http://localhost:4000/users')
            .then(response => {
                this.setState({
                    
                    users: response.data

                });
            })

            .catch((error) => {
                console.log(error);

            })
        //window.location = '/users'; //redirects page
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