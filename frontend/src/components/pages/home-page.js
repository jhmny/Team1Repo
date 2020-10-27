import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { 
  Button, Card, CardActions, CardContent,
  CardMedia, CssBaseline, Grid, Typography,
  Container, Fab, Link
} from '@material-ui/core';
import { //filter stuff
  FormLabel, FormControl, FormGroup,
  FormControlLabel, Checkbox
} from '@material-ui/core';
import Axios from "axios";


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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/////
const Filters = [
  { id: "Category", list: ["Upper Thread", "Lower Thread", "Footwear"] },
  { id: "Size", list: ["XS", "S", "M", "L", "XL", "XXL"] },
  { id: "Foot Size", list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16] },
  { id: "Condition", list: ["New", "Like New", "Used", "Damaged"] },
  {
    id: "Color", list: ["Blue", "Red", "Yellow", "Brown", "White",
      "Black", "Pink", "Green", "Purple", "Orange",
      "Gray", "Beige", "Camoflauge", "Tie-Dye"
    ]
  }
]
/////

export default function Album() {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reload, setReload] = useState(false);
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
        (error) =>{
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  /*
  async function loading(){
    await Axios.post("http://localhost:4000/listings/filter", filter)
      .then(response => {
        console.log(response.data);
        setListings(response.data);
        console.log(listings); 
      });
  }
*/
  const handleToggle = (id, value) => {
    var newFilter = filter;
    var index = -1;
    switch (id) {
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
    //console.log(filter);
    //loading();
    Axios.post("http://localhost:4000/listings/filter", filter)
      .then(response => { setListings([]);
        setListings(response.data) });
    //setReload(!reload)
  }

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

  const displayListings = () => {
    return(
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


  if(error){
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded){
    return <div>Loading...</div>;
  }
  else{
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit, section of window where heading is (aka Listings for home-page) */}
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
          {/* End hero unit */}

          <div>
            {filterList}
          </div>

          {/* where the containers for listings is created */}
          {/*reload? (displayListings()) : (displayListings())*/}
          {displayListings()}
        </main>
        <Fab href="/listings/create" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}
