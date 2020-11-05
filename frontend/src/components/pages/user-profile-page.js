import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import UserContext from "../../context/UserContext";// used to verify login status
import { Redirect } from 'react-router-dom';// used to redirect user if not logged in
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Axios from 'axios';
import {
  Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
  Divider, IconButton, ListItem, ListItemIcon, ListItemText,
  Link, Container, Grid, CardMedia, CardContent, CardActions,
  Card, Button
} from '@material-ui/core';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HistoryIcon from '@material-ui/icons/History';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: 'flex',
  },
  appBar: {
    height: 50,
    justifyContent: 'center',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState({});// variable holding the user's id

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /*
  let { id } = useParams(); //url 

  // get the current logged in user
  useEffect(() => {
    Axios.get('http://localhost:4000/listings/' + id)
      .then(response => {
        setListings(response.data)
        setUserId( localStorage.getItem("id"))
      })
    console.log('the user id is: ' + userId)
  }, [])
  */

  useEffect(() => {
    fetch("http://localhost:4000/listings")// needs to get listings based on current users username
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

  const displayListings = () => {
    return (
      <Container maxWidth="md" className={classes.cardGrid}>
        <Grid container spacing={4}>
          {listings.map(item => (
            <Grid item key={listings} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"// needs to be a link to the items picture
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>

                </CardContent>
                <CardActions>
                  <Button href={"/edit-page/" + item._id} size="medium" color="primary">
                    Edit
                  </Button>
                  <Button size="medium" color="primary">{/* will make an axios call to delete the item with its id */}
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  };

  if(localStorage.getItem('auth-token') != ""){// check if user logged in
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Username goes here
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                {link: 'http://localhost:3000/', text: 'Live Listings', index: 0},
                {link: 'http://www.google.com', text: 'Sold Listings', index: 1},
                {link: 'http://www.bestbuy.com', text: 'Order History', index: 2},
                {link: 'http://localhost:3000//message-page', text: 'Messages', index: 3},
                {link: 'http://www.amazon.com', text: 'Settings', index: 4},
              ].map((obj) => (
                <Link href = {obj.link}>
                  <ListItem button key={obj.text}>
                    <ListItemIcon>
                      {obj.index === 0 && <MoneyOffIcon/>}
                      {obj.index === 1 && <MonetizationOnIcon/>}
                      {obj.index === 2 && <HistoryIcon/>}
                      {obj.index === 3 && <MailIcon/>}
                      {obj.index === 4 && <SettingsIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={obj.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {[
                {link: '#', text: 'Customer Support', index: 0},
                {link: '#', text: 'Contact Email', index: 1},
                {link: '#', text: 'Contact Number', index: 2},
              ].map((obj) => (
                <Link href = {obj.link}>
                  <ListItem button key={obj.text}>
                    <ListItemIcon>
                      {obj.index === 0 && <ContactSupportIcon />}
                      {obj.index === 1 && <ContactMailIcon/>}
                      {obj.index === 2 && <ContactPhoneIcon/>}
                    </ListItemIcon>
                  <ListItemText primary={obj.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Typography paragraph>
              {displayListings()}
            </Typography>
          </main>
        </div>
      );
    }
  }
  else{// redirects to login page if not signed in
    return (
        <Redirect to='/login'/>
    );
}
}
