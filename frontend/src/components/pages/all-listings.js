import React, {useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const Listing = props => (
    <tr>
        <td>{props.listing.username}</td>
        <td>{props.listing.name}</td>
        <td>{props.listing.description}</td>
        <td>{props.listing.category}</td>
        <td>{props.listing.size}</td>
        <td>{props.listing.color}</td>
        <td>{props.listing.condition}</td>
        <td>${props.listing.price}</td>
        <td>{props.listing.likes}</td>
        {props.listing.sold ? (
            <td>True</td>
        ) : (
            <td>False</td>
        )}
        <td>{
            <Button href={"/listings/" + props.listing._id} size="medium" color="primary">
                {props.listing._id}
            </Button>
        }</td>
    </tr>
)

export default function AllListings() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listings, setListings] = useState([]);
    // the empty deps array [] means this useEffect will run once

    useEffect(() => {
        fetch("http://localhost:4000/listings")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setListings(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const listingsList = listings.map(currentlisting => {
        return <Listing listing={currentlisting} key={currentlisting._id} />;
    });

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <table>
                <tr>
                    <th>Username</th>
                    <th>name</th>
                    <th>description</th>
                    <th>category</th>
                    <th>size</th>
                    <th>color</th>
                    <th>condition</th>
                    <th>price</th>
                    <th>likes</th>
                    <th>sold</th>
                    <th>id</th>
                </tr>
                <tbody item key={listings}>
                    {listingsList}
                </tbody>
            </table>
        )
    }
}
