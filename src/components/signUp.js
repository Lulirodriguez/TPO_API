import React, {useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
    paadingTop: '5px',
    paddingBottom: '10px',
    backgroundColor: 'pink',
    color: 'black',
  },
  whiteBlend: {
    backgroundColor: 'black',
    color: 'white',
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
  colorCheckbox: {
    fontSize: '10px',
    backgroundColor: 'white',
    color: 'black',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const completed = () => {
    return firstName && lastName && username && password;
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear una cuenta
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre/s"
                autoFocus
                className={classes.greyBlend}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido/s"
                name="lastName"
                autoComplete="lname"
                className={classes.greyBlend}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                className={classes.greyBlend}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.greyBlend}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            
          </Grid>
          <RouteLink to="/" style={{ textDecoration: 'none' }} >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Registrarse
            </Button>
          </RouteLink>
          <Grid container justify="flex-end">
            <Grid item>
              <RouteLink to="/sign-in" >
                <Link variant="body2" size="xs" className={classes.darkBlend}>
                  ¿Ya tiene una cuenta? Inicie sesión
                </Link>
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}