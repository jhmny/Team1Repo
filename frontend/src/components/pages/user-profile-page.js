import React from "react";
import UserContext from "../../context/UserContext";// used to verify login status
import { Redirect } from 'react-router-dom';// used to redirect user if not logged in
import { makeStyles } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from "@material-ui/core/Link";
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HistoryIcon from '@material-ui/icons/History';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function testF(){
    return(
        <a href ='google.com'/>
    );
}

export default function profilePage(){
    if(localStorage.getItem('auth-token') != ""){// check if user logged in
        // get user info

        return (
            <React.Fragment>
                <CssBaseline/>
                <div>{/* className={classes.root} */}
                    <AppBar position = "fixed">{/* className = {classes.appBar} */}
                        <Toolbar>
                            <Typography variant = "h6" noWrap>
                                Clipped drawer{/* diplay username here */}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent"> {/* className={classes.drawer} classes={{paper: classes.drawerPaper,}} */}
                        <Toolbar/>
                            <div>{/* className={classes.drawerContainer} */}
                                <List>
                                    {[
                                        { link: 'orders', text: "Order History", index: 2},
                                        { link: 'message', text: "Messages", index: 3},
                                        { link: 'settings', text: "Settings", index: 4},
                                    ].map((obj) => (
                                        <Link href={"/user-profile-page/"+ obj.link}>
                                        <ListItem button key={obj.text}>
                                            <ListItemIcon>
                                                {obj.index === 2 && <HistoryIcon/>}
                                                {obj.index === 3 && <MailIcon/>}
                                                {obj.index === 4 && <SettingsIcon/>}
                                            </ListItemIcon>
                                            <ListItemText primary={obj.text} />
                                        </ListItem>
                                        </Link>
                                        
                                    ))}
                                </List>
                                <Divider/>
                                <List>
                                    {['Customer Support', 'Contact Email', 'Contact Number'].map((text, index) => (
                                        <ListItem button key={text}>
                                            <ListItemIcon>
                                                {index === 0 && <ContactSupportIcon />}
                                                {index === 1 && <ContactMailIcon/>}
                                                {index === 2 && <ContactPhoneIcon/>}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                    </Drawer>
                <main>{/* className={classes.content} */}
                    <Toolbar />
                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labo re et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                    </Typography>
                </main>
                </div>
            </React.Fragment>
        );
    }
    else{// redirects to login page if not signed in
        return (
            <Redirect to='/login'/>
        );
    }
}