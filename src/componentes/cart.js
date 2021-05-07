import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './cart.css';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    padding: '30px',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    textAlign: 'center',
    color: '#E2E2E2',
    backgroundColor: '#353535',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  darkBlend: {
    backgroundColor: 'black',
    color: 'white',
  },
  greyBlend: {
    backgroundColor: '#E2E2E2',
    color: 'white',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    paddingTop: '5px',
    paddingBottom: '10px',
    backgroundColor: 'white',
    color: 'black',
    
  
  },
  checkoutButton:{
    alignItems: 'right', 
    position: 'relative',
  }
}));

export default function Cart() {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} className= {classes.checkoutButton}>
        <Grid>
          <Link to= '/checkout' >
            <Button type="submit"
                fullWidth
                align="center"
                color="white"
                variant="contained"
                className={classes.submit}
              >
              CHECKOUT
            </Button>
          </Link>
        
        </Grid>
      </Grid>
    </div>
  );
}