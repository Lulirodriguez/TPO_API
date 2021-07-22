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
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

function RecoverPassword() {
  const classes = useStyles();

  const [email,setEmail] = useState('');
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const showError = (e) => {
      e.preventDefault();
      setError(true);
  }

  const canSubmit = () => {
    if(email!=''){
        return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setDone(true);
      setError(false);
  }

  return (
    <Container className={classes.greyBorder} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.darkBlend} component="h1" variant="h5">
          Recuperación de Contraseña
        </Typography>
        {error? (
            <Typography style={{color: 'red', fontSize: '13px'}} component="h1" variant="h5">
            Debe completar el campo de email
            </Typography>): (<></>)
        }
        {done? (<Typography style={{fontSize: '17px', marginBottom: '10px', marginTop: '15px'}} component="h1" variant="h5">
            ¡Enviamos un link a su casilla de email para que recupere su contraseña!
            </Typography>):
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.greyBlend}
          />
          {!!canSubmit() ? (
            <RouteLink to={"/"} style={{ textDecoration: 'none', color:'black' }}>
              <Button
                type="submit"
                fullWidth
                backgroundColor= "black"
                color="secondary"
                variant="contained"
                className={classes.submit}
                onClick={(e) => handleSubmit(e)}
              >
                    Recuperar Contraseña
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
                Recuperar Contraseña
              </Button>
          )}
        </form> }
        <Grid container style={{marginTop:'10px'}}>
            <Grid item>
            <RouteLink to="/" >
              <Link className={classes.darkBlend} variant="body2" >
                {" Volver al Inicio "}
              </Link>
            </RouteLink>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}

const PasswordRecovery = () => {
    return <RecoverPassword/>;
}

export default PasswordRecovery;