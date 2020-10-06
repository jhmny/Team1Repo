import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

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

export default function Register() {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, firstname, lastname, email, password };
      await Axios.post("http://localhost:4000/users/sign_up", newUser);
      const loginRes = await Axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField //fname
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                type="text"
                required
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField //lastname
                variant="outlined"
                required
                fullWidth
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField //email
                variant="outlined"
                type="text"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField //username
                variant="outlined"
                type="text"
                required
                value={username}
                onChange={(e) => setusername(e.target.value)}
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField //passwrod
                variant="outlined"
                type="text"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraemails" color="primary" />}
                label="I am not a robot"
              />
            </Grid>
          </Grid>
          <Button
            onSubmit={onSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="Register"
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
