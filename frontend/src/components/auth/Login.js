import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

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

export default function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:4000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("id", loginRes.data.user.id);
      localStorage.setItem("username", loginRes.data.user.displayName);
      localStorage.setItem("email", loginRes.data.user.email);
      history.push("/");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
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
          Log In
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField //email
                variant="outlined"
                type="text"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
