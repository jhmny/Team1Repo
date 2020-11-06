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

const sortOptions = [
  "Price: High to Low", "Price: Low to High",
  "Date: New", "Date: Old",
  "Likes: Most", "Likes: Least"
]

const sortio = [
  {id: "price", list: ["Price: High to Low", "Price: Low to High"], },
  {id: "date", list: ["Recent", "Oldest",] },
  {id: "likes",list: ["Likes"]}
]

export default function Album() {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listings, setListings] = useState([]);
  const [sort, setSort] = useState({id: "", ascending:true});
  const [filter, setFilter] = useState({
    sold:false,
    category: [], size: [],
    color: [], condition: [],
  });

  useEffect(() => {
    fetch("http://localhost:4000/listings/filter", { method: "POST", body: filter })
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
    newFilter[id] = value;
    setFilter(newFilter);
    //console.log(filter);
    Axios.post("http://localhost:4000/listings/filter", filter)
      .then(response => {
        setListings([]);
        setListings(response.data)
        console.log(response.data);
      });
    //console.log(listings);
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

  const handleChange = (value) => {
    var newSort = sort;
    var i = 0;
    for(i = 0; i < sortOptions.length; i++){
      if(sortOptions[i] === value){
        newSort.id = value.slice(0, value.indexOf(":"));
        newSort.ascending = i%2;
        break;
      }
    }
    setSort(newSort);
    var sortListings = listings;
    if(newSort.id = "Price"){
      if(newSort.ascending){
        sortListings.sort(function (a, b) { return a.price - b.price });
      }
      else{
        sortListings.sort(function (a, b) { return b.price - a.price });
      }
    }
    /*
    else if(id = "Date"){
      if (ascending) {
        sortListings.sort(function (a, b) { return a.price - b.price });
      }
      else {
        sortListings.sort(function (a, b) { return b.price - a.price });
      }
    }
    */
    console.log(sortListings);
    setListings([]);
    setListings(sortListings);
    console.log(listings);
  }

  const sortList = () => (
    <FormControl className={classes.formControl}>
      <InputLabel>Sort by:</InputLabel>
      <Select
        value={sort.id}
        onChange={(e) => handleChange(e.target.value)}
        input={<Input />}
      >
        {sortOptions.map((currentOptions) => (
          <MenuItem key={currentOptions} value={currentOptions}>
            {currentOptions}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  /*
  const filterSlide = (currentFilter) => (
    <FormControl className={classes.formControl}>
      <Typography gutterBottom>
        Price
      </Typography>
      <Slider
        min={0}
        step={10}
        max={1000}
        value={filter[currentFilter.id]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </FormControl>
  );
    */

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
          <div>{sortList()}</div>
          {displayListings()}
        </main>
        <Fab href="/listings/create" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

