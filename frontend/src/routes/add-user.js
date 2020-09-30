import React, { Component } from 'react';
import axios from 'axios';

export default class AddUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        })
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
        const NewUser = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        };

        //console.log(NewUser);

        axios.post('http://localhost:4000/users/sign_up', NewUser)
            .then(res => console.log(res.data));

        window.location = '/users'; //redirects page
    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.firstname}
                            onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.lastname}
                            onChange={this.onChangeLastName}
                        />
                    </div>
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
                        <input type="submit" value="Create New User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}