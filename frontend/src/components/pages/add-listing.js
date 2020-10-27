import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import Dropzone from "react-dropzone";
import MyDropzone from "../misc/file-upload.js";
//import Filters from "../misc/filters.js";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextareaAutosize } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default function Create() {
  const [itemName, setItemName] = useState();
  const [description, setDescription] = useState();
  const [garmentType, setGarmentType] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [condition, setCondition] = useState();
  const [price, setPrice] = useState();
  const [Images, setImages] = useState([]);

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newListing = {
        username: localStorage.getItem("username"),
        name: itemName,
        description: description,
        category: garmentType,
        size: size,
        color: color,
        condition: condition,
        price: price,
        likes: 0,
        images: Images,
      };
      
      if( !itemName || !description ||!garmentType || !size||
        !color || !condition || !price || !Images)
        {
          return alert('fill all the fields first!')
        }

      console.log(newListing);
      Axios.post("http://localhost:4000/listings/add", newListing)
        .then(response => { window.location = response.data; });
      //axios.post('http://localhost:4000/listings/add', image)
      //  .then(response => { window.location = response.data; })
      //history.push("/");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const Filters = {
    garment: ["Upper Thread", "Lower Thread", "Footwear"],
    garmentSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    shoeSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16],
    conditions: ["New", "Like New", "Used", "Damaged"],
    colors: ["Blue", "Red", "Yellow", "Brown", "White",
      "Black", "Pink", "Green", "Purple", "Orange",
      "Gray", "Beige", "Camoflauge", "Tie-Dye"
    ]
  }


  const updateImages = (newImages) => {
    console.log(newImages) //test
    setImages(newImages)
}
  //{setImages(acceptedFiles)}

  //https://material-ui.com/components/text-fields/
  if (userData.user) {
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Create New Listing
          </Typography>
          <form onSubmit={onSubmit}>
            <MyDropzone refreshFunction={updateImages}/>
            <Grid>
              <TextField
                name="name"
                variant="outlined"
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                fullWidth
                id="name"
                label="Name"
              />
            </Grid>

            <Grid>
              <TextareaAutosize //description
                rowsMin={3}
                placeholder="Description"
                variant="outlined"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                id="description"
                label="Description"
                name="description"
              />
            </Grid>

            <InputLabel>Garment Type</InputLabel>
            <Select //Size /<children  size/>
              labelId="garment"
              id="garment"
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
            >
              {Filters.garment.map((garments) => (
                <MenuItem key={garments} value={garments}>
                  {garments}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Size</InputLabel>
            <Select //Size /
              children
              labelId="size"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {garmentType == "Footwear" ? (
                Filters.shoeSizes.map((sizes) => (
                  <MenuItem key={sizes} value={sizes}>
                    {sizes}
                  </MenuItem>
                ))
              ) : (
                  Filters.garmentSizes.map((sizes) => (
                    <MenuItem key={sizes} value={sizes}>
                      {sizes}
                    </MenuItem>
                  ))
                )}
            </Select>

            <InputLabel>Color</InputLabel>
            <Select //Color
              labelId="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {Filters.colors.map((colors) => (
                <MenuItem key={colors} value={colors}>
                  {colors}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Condition</InputLabel>
            <Select //Color
              labelId="Condition"
              id="Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              {Filters.conditions.map((conditions) => (
                <MenuItem key={conditions} value={conditions}>
                  {conditions}
                </MenuItem>
              ))}
            </Select>

            <Grid>
              <TextField
                name="price"
                variant="outlined"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                id="price"
                label="Price"
              />
            </Grid>

            <Grid>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I am not a robot"
              />
            </Grid>

            <Button
              onSubmit={onSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              value="Create"
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            PLEASE LOG IN
          </Typography>
        </div>
      </Container>
    );
  }
}

/*
<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} multiple>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button variant="outlined">Upload Image</Button>
                    </div>
                  </section> //https://react-dropzone.js.org/ Has Material UI stuff
                )}
              </Dropzone>
*/
