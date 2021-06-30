import React, {useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const showError = (e) => {
    e.preventDefault();
    setError(true);
  }

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  const match = () => {
    let isMatch = false;
    if(getMatchedUser() != null){
      isMatch = true;
    }
    return isMatch;
  }

  const getMatchedUser = () => {
    for(let i=0;i<users.length;i++){
      if(users[i].email === username && users[i].password === password){
        return users[i];
      }
    }
    return null;
  }

  const handleSignIn = (e) => {
    setIsLoggedIn(true);
    setCurrentUser(getMatchedUser());
    setIsAdmin(getMatchedUser().isAdmin);
  }

  const customer = {
    'firstName': 'Customer',
    'lastName': 'Teacher',
    'email': 'customer@uade.edu.ar',
    'password': 'uade1234',
    'isAdmin': false,
  };

  const admin = {
    'firstName': 'Admin',
    'lastName': 'Teacher',
    'email': 'admin@uade.edu.ar',
    'password': 'uade1234',
    'isAdmin': true,
  };

  const users = [
      customer,admin
  ]

  return (
    <Container className={classes.greyBorder} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.darkBlend} component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        {error? (
            <Typography style={{color: 'red', fontSize: '13px'}} component="h1" variant="h5">
            Usuario o contraseña inválidos.
            </Typography>): (<></>)
        }
        <form className={classes.form && classes.darkBlend} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
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
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.greyBlend}
            value={password}
            onChange={(e) => handleSetPassword(e)}
          />
          {!!match() ? (
            <RouteLink to={readyToPay? "/checkout" :  "/"} style={{ textDecoration: 'none', color:'black' }}>
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
            </RouteLink>
          ) : (
              <Button
                type="submit"
                fullWidth
                backgroundColor= "black"
                color="secondary"
                variant="contained"
                className={classes.submit}
                onClick={(e) => showError(e)}
              >
                Ingresar
              </Button>
          )}
          
          <Grid container>
            <Grid item xs>
              <Link className={classes.darkBlend} href="#" variant="body2">
                ¿Olvidó la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <RouteLink to="/sign-up" >
                <Link className={classes.darkBlend} variant="body2" >
                  {"¿No tiene cuenta? Regístrese "}
                </Link>
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}