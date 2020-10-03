import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.firstname}</td>
        <td>{props.user.lastname}</td>
        <td>{props.user.email}</td>
        <td>{props.user.password}</td>
    </tr>
)

export default class AllUsers extends Component {
    constructor(props){
        super(props);

        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users')
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    usersList(){
        return this.state.users.map(currentuser => {
            return <User user={currentuser} key={currentuser._id} />;
        })
    }

    render(){
        return(
            <div>
                <h1>threadRepo</h1>
                <h3>Users</h3>
                <table className="table">
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}