import React, {useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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

const Filters = [ 
    {id: "Category", list: ["Upper Thread", "Lower Thread", "Footwear"]},
    {id: "Size",    list: ["XS", "S", "M", "L", "XL", "XXL"]},
    {id: "Foot Size",list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16]},
    {id: "Condition",list: ["New", "Like New", "Used", "Damaged"]},
    {id: "Color",    list: ["Blue", "Red", "Yellow", "Brown", "White",
            "Black", "Pink", "Green", "Purple", "Orange",
            "Gray", "Beige", "Camoflauge", "Tie-Dye"
            ]}
]

export default function AllListings() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listings, setListings] = useState([]);
    const [filter, setFilter] = useState(
        {
            category: [],
            size: [],
            color: [],
            condition: [],
            //price: price,
            //likes: 0,
            //username: localStorage.getItem("username")
        }
    );

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

    const handleToggle = (id, value) => {
        var newFilter = filter;
        var index = -1;
        switch(id){
            case "Category":
                index = filter.category.indexOf(value);
                if (index === -1) {
                    newFilter.category.push(value);
                }
                else {
                    newFilter.category.splice(index, 1);
                }
                break;
            case "Condition":
                index = filter.condition.indexOf(value);
                if (index === -1) {
                    newFilter.condition.push(value);
                }
                else {
                    newFilter.condition.splice(index, 1);
                }
                break;
            case "Color":
                index = filter.color.indexOf(value);
                if (index === -1) {
                    newFilter.color.push(value);
                }
                else {
                    newFilter.color.splice(index, 1);
                }
                break;
            default:
                index = filter.size.indexOf(value);
                if (index === -1) {
                    newFilter.size.push(value);
                }
                else {
                    newFilter.size.splice(index, 1);
                }
                break;
        }
        setFilter(newFilter);
        console.log(filter);
    }

    const listingsList = listings.map(currentlisting => {
        return <Listing listing={currentlisting} key={currentlisting._id} />;
    });

    const filterList = Filters.map(currentFilter => {
        return (
            <FormControl>
                <FormLabel>{currentFilter.id}</FormLabel>
                <FormGroup>
                    {currentFilter.list.map(currentOptions => {
                        return (
                        <FormControlLabel
                            control={<Checkbox
                            onChange={() => handleToggle(currentFilter.id, currentOptions)} 
                            name={currentOptions} />}
                            label={currentOptions}
                        />)
                    })
                    }
                </FormGroup>
            </FormControl>
        )
    });


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div>
                <div> 
                    {filterList}
                </div>
                <div>
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
                </div>
            </div>
        )
    }
}

/*
<FormControl>
                        <FormLabel>Assign responsibility</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                                label="Gilad Gray"
                            />
                        </FormGroup>
                    </FormControl>
*/