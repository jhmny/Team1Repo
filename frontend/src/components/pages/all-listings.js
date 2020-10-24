import React, { useContext, Component } from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
//import { useHistory } from "react-router-dom";
//import UserContext from "../../context/UserContext";

const Listing = props => (
    <tr>
        <td>{props.listing.username}</td>
        <td>{props.listing.name}</td>
        <td>{props.listing.description}</td>
        <td>{props.listing.size}</td>
        <td>{props.listing.color}</td>
        <td>{props.listing.condition}</td>
        <td>{props.listing.price}</td>
        <td>{
        <Button href={"/listing/" + props.listing._id} size="medium" color="primary">
            {props.listing._id}
        </Button>
        }</td>
    </tr>
)//<td>{props.listing.date}</td>
/*
export default function AllListing() {
    const { userData, setUserData } = useContext(UserContext);


    return (
        <nav className="auth-options">
            {userData.user ? (
                <Button onClick={logout}>Log out</Button>
            ) : (
                    <>
                        <Button onClick={register}>Register</Button>
                        <Button onClick={login}>Log in</Button>
                    </>
                )}
        </nav>
    );
}
.getItem('name');
*/


export default class AllListings extends Component {

    constructor(props) {
        super(props);
        
        this.state = { listings: []};
    }
    
    componentDidMount() {
        /* If you want to get all Listings for yourself when logged in
        if (localStorage.getItem('auth-token') != ""){
        axios.post('http://localhost:4000/listings/byuser', { username: localStorage.getItem('username') })
            .then(response => {
                this.setState({listings: response.data});
            })
        }
        */

        axios.get('http://localhost:4000/listings', { username: localStorage.getItem('username') })
             .then(response => {
                console.log(response.data)
                this.setState({ listings: response.data });
            })
    }
    
    listingsList() {
        return this.state.listings.map(currentlisting => {
            return <Listing listing={currentlisting} key={currentlisting._id} />;
        })
    }

    render() {
        return (
            <div>
                <h1>threadRepo</h1>
                <h3>my listings</h3>
                <table className="table">
                    <tr>
                        <th>Username</th>
                        <th>name</th>
                        <th>description</th>
                        <th>size</th>
                        <th>color</th>
                        <th>condition</th>
                        <th>price</th>
                        <th>id</th>
                        
                    </tr>
                    <tbody>
                        {this.listingsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
//<th>date</th>