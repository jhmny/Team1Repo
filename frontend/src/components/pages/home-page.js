import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {
  Button, Card, CardActions, CardContent,
  CardMedia, CssBaseline, Grid, Typography,
  Container, Fab, FormControl, Input, 
  InputLabel, Select, MenuItem
} from '@material-ui/core';
import Axios from "axios";
import {Filters} from "../misc/filters";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  }
}));

export default function Album() {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({
    category: [], size: [],
    color: [], condition: [],
  });

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

  const handleToggle = (id, arr) => {
    var value = "";
    var newFilter = filter;
    if (arr.length === 0) { value = filter[id][0];}
    else { value = arr[arr.length - 1] }

    var index = filter[id].indexOf(value);
    if (index === -1) { newFilter[id].push(value); }
    else { newFilter[id].splice(index, 1); }

    setFilter(newFilter);
    //console.log(filter);
    Axios.post("http://localhost:4000/listings/filter", filter)
      .then(response => {
        setListings([]);
        setListings(response.data)
      });
  }

  const removeNum = (i) => {
    if ((parseInt(i) + "") !== "NaN") { return i }
  }
  const removeStr = (i) => {
    if ((parseInt(i) + "") === "NaN") { return i }
  }

  const filterList = (currentFilter) => (
    <FormControl className={classes.formControl}>
      <InputLabel>{currentFilter.name}</InputLabel>
      <Select //Color
        multiple
        value={filter[currentFilter.id]}
        onChange={(e) => handleToggle(currentFilter.id, e.target.value)}
        input={<Input />}
      >
        {currentFilter.list.map((currentOptions) => (
          <MenuItem key={currentOptions} value={currentOptions}>
            {currentOptions}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const displayListings = () => {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {listings.map(item => (
            <Grid item key={listings} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>

                </CardContent>
                <CardActions>
                  <Button href={"/listings/" + item._id} size="medium" color="primary">
                    Buy ${item.price}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit, section of window where heading is (aka Listings for home-page) 
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              ></Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Listings
              </Typography>
              <div className={classes.heroButtons}></div>
            </Container>
          </div>
           End hero unit */}

          <div>
            {filterList(Filters.category) /*Category*/}

            {(filter.category.includes("Upper Thread") || filter.category.includes("Lower Thread")) ? (
              filterList(Filters.size[0])
            ) : (filter.size.filter(removeStr).map(unselected => { handleToggle("size", unselected) }))}

            {(filter.category.includes("Footwear")) ? (
              filterList(Filters.size[1])
            ) : (filter.size.filter(removeNum).map(unselected => { handleToggle("size", unselected) }))}

            {filterList(Filters.condition)}
            {filterList(Filters.color)}
          </div>
          {displayListings()}
        </main>
        <Fab href="/listings/create" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

