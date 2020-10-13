import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from 'axios';
import Dropzone from 'react-dropzone';
//import MyDropzone from "../misc/file-upload.js";

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

export default function Create() {
  const [itemName, setItemName] = useState();
  const [description, setDescription] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [condition, setCondition] = useState();
  const [price, setPrice] = useState();
  const [image, setImages] = useState([]);

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newListing = {
        username: localStorage.getItem("username"),
        name: itemName,
        description: description,
        size: size,
        color: color,
        condition: condition,
        price: price,
        likes: 0,
        date: new Date() };

      axios.post('http://localhost:4000/listings/add', newListing)
        //.then(response => { window.location = response.data; })
      axios.post('http://localhost:4000/listings/add', image)
        .then(response => { window.location = response.data; })
      history.push("/");
    } 
    catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
    }
  };

  //{setImages(acceptedFiles)}
  if (localStorage.getItem('auth-token') != "") {
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Create New Listing
        </Typography>
          <form onSubmit={onSubmit}>

            <Grid container spacing={3}>

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
        
              <Grid item xs={12}>
                <TextField //itemName
                  variant="outlined"
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  fullWidth
                  id="itemName"
                  label="Item Name"
                  name="itemName"
                  autoComplete="itemName"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}> 
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
                  autoComplete="description"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField //size
                  variant="outlined"
                  type="text"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  fullWidth
                  id="size"
                  label="Size"
                  name="size"
                  autoComplete="size"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField //color
                  variant="outlined"
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  fullWidth
                  id="color"
                  label="Color"
                  name="color"
                  autoComplete="color"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField //condition
                  variant="outlined"
                  type="text"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  fullWidth
                  id="condition"
                  label="Condition"
                  name="condition"
                  autoComplete="condition"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField //price
                  variant="outlined"
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  id="price"
                  label="Price ($)"
                  name="price"
                  autoComplete="price"
                  autoFocus
                />
              </Grid>
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
    )
  }
  else {
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            PLEASE LOG IN
        </Typography>
        </div>
      </Container>
    )
  }
}
