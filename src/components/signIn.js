import React, {useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'pink',
    color: 'black',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    paddingTop: '5px',
    paddingBottom: '10px',
    backgroundColor: 'pink',
    color: 'black',
  },
  darkBlend: {
    backgroundColor: 'white',
    color: 'black',
  },
  greyBlend: {
    backgroundColor: '#E2E2E2',
    color: 'white',
  },
  greyBorder: {
    borderColor: '#353535',
  },
  whiteBorder: {
    borderColor: 'white!important',
  },
  darkCheckbox: {
    fontSize: '10px',
    backgroundColor: 'white',
    color: 'black',
  },
}));

export default function SignIn({setIsLoggedIn,setIsAdmin,setCurrentUser,readyToPay}) {
  const classes = useStyles();
  
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  const redirect = () => {
    let path = readyToPay? "/checkout" : "/";
    history.push(path);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    let body = {
      'username': username,
      'password': password,
    }
    try{
      let res = await api.post('/usuarios/login',body);
      console.log(res);
      if(res.status == 200){
        console.log("entra a 200");
        setIsLoggedIn(true);
        console.log("Pasa setIsLoggedIn");
        let user = res.data;
        console.log("Pasa info user");
        setCurrentUser(user);
        console.log("Pasa set user");
        setIsAdmin(user.isAdmin);
        console.log("Pasa set isAdmin");
        redirect();
      }
      else if(res.status == 404){
        setError(true);
        if(res.data.error){
          alert(res.data.error);
        }
      }
      else{
      }
    }catch(err){
      setError(true);
    }
  }

  return (
    <Container className={classes.greyBorder} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.darkBlend} component="h1" variant="h5">
          Iniciar sesi??n
        </Typography>
        {error? (
            <Typography style={{color: 'red', fontSize: '13px'}} component="h1" variant="h5">
            Usuario o contrase??a inv??lidos.
            </Typography>): (<></>)
        }
        <form className={classes.form && classes.darkBlend} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electr??nico"
            name="email"
            autoComplete="email"
            autoFocus
            className={classes.greyBlend}
            value={username}
            onChange={(e) => handleSetUsername(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contrase??a"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.greyBlend}
            value={password}
            onChange={(e) => handleSetPassword(e)}
          />
          <Button
            type="submit"
            fullWidth
            backgroundColor= "black"
            color="secondary"
            variant="contained"
            className={classes.submit}
            onClick={(e) => handleSignIn(e)}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
            <RouteLink to="/passwordRecovery" >
              <Link className={classes.darkBlend} variant="body2">
                ??Olvid?? la contrase??a?
              </Link>
            </RouteLink>
            </Grid>
            <Grid item>
              <RouteLink to="/sign-up" >
                <Link className={classes.darkBlend} variant="body2" >
                  {"??No tiene cuenta? Reg??strese "}
                </Link>
                </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}