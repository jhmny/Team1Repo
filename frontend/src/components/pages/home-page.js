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
    fetch("http://localhost:4000/listings")// fetch() provides an easy, logical way to fetch resources asynchronously across the network
      .then(res => res.json())// json() extracts the JSON body content from the response
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
    newFilter[id] = value;
    setFilter(newFilter);
    //console.log(filter);
    Axios.post("http://localhost:4000/listings/filter", filter)
      .then(response => {
        setListings([]);
        setListings(response.data)
      });
  }

  const removeNum = (i) => {
    if ((parseInt(i) + "") === "NaN") { return i }
  }
  const removeStr = (i) => {
    if ((parseInt(i) + "") !== "NaN") { return i }
  }

  const filterList = (currentFilter) => (
    <FormControl className={classes.formControl}>
      <InputLabel>{currentFilter.name}</InputLabel>
      <Select
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
          <div>
            {filterList(Filters.category) /*Category*/}

            {(filter.category.includes("Upper Thread") || filter.category.includes("Lower Thread")) ? (
              filterList(Filters.size[0])
            ) : (filter.size.filter(removeNum).length === 0 ? ("") :
              (handleToggle("size", filter.size.filter(removeStr)))
              )} 

            {(filter.category.includes("Footwear")) ? (
              filterList(Filters.size[1])
            ) : (filter.size.filter(removeStr).length === 0? ("") : 
            (handleToggle("size", filter.size.filter(removeNum)))
            )} 
            
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

