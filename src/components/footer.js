import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="grey">
      {'Copyright © MySportsKit '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexDirection: 'column',
    minHeight: '100%',
    marginBottom: '-142px',
    color: 'grey',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#D8D6D6',
    position: 'fixed',
    bottom: 0, 
    width: '100%',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
     <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}