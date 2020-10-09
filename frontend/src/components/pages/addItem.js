import React, { Component }from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            name: "",
            description: "",
            size: "",
            color: "",
            condition: "",
            price: "",
        };
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }
    onChangeName(e){
        this.setState({
            name: e.target.value,
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value,
        });
    }
    onChangeSize(e){
        this.setState({
            size: e.target.value,
        });
    }
    onChangeColor(e){
        this.setState({
            color: e.target.value,
        });
    }
    onChangeCondition(e){
        this.setState({
            condition: e.target.value,
        });
    }
    onChangePrice(e){
        this.setState({
            price: e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();

        const NewItem = {
            username: this.state.username,
            name: this.state.name,
            description: this.state.description,
            size: this.state.size,
            color: this.state.color,
            condition: this.state.condition,
            price: this.state.price,
        };

        //console.log(NewItem);

        axios
          .post("http://localhost:4000/listings/add", NewItem)// url needs correction
          .then((res) => console.log(res.data));
        window.location = "/" // go back to users profile page (once made)
    }

    render(){
        return(
            <Container>
                <CssBaseline />
                <div>
                    <Typography>
                        Create a new listing
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <Grid >
                            <TextField
                              name="username"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              fullWidth
                              id="username"
                              label="Username"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="name"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.name}
                              onChange={this.onChangeName}
                              fullWidth
                              id="name"
                              label="Name"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="description"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.description}
                              onChange={this.onChangeDescription}
                              fullWidth
                              id="description"
                              label="Description"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="size"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.size}
                              onChange={this.onChangeSize}
                              fullWidth
                              id="size"
                              label="Size"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="color"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.color}
                              onChange={this.onChangeColor}
                              fullWidth
                              id="color"
                              label="Color"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="condition"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.condition}
                              onChange={this.onChangeCondition}
                              fullWidth
                              id="condition"
                              label="Condition"
                            />
                        </Grid>
                        <Grid >
                            <TextField
                              name="price"
                              variant="outlined"
                              type="text"
                              required
                              value={this.state.price}
                              onChange={this.onChangePrice}
                              fullWidth
                              id="price"
                              label="Price"
                            />
                        </Grid>
                        <Grid>
                            <FormControlLabel
                              control={
                                  <Checkbox color="primary" />
                              }
                              label="I am not a robot"
                            />
                        </Grid>
                        <Button
                          onsubmit={this.onSubmit}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          >
                              Create
                          </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
export default AddItem;