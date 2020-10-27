import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import axios from 'axios';


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

export default function Album() {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listings, setListings] = useState([]);// the empty deps array [] means this useEffect will run once

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

          {/* where the containers for listings is created */}
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
                      <Button href ={"/listings/" + item._id} size="medium" color="primary">
                        Buy ${item.price}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
