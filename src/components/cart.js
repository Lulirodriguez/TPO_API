import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


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
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
    marginRight: '7.5%',
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
    paddingBottom: '5px',
    backgroundColor: 'pink',
    color: 'black',
    paddingRight:'70px',
    paddingLeft:'70px',
    
  
  },
  checkoutButton:{
    alignItems: 'right', 
    position: 'relative',
    backgroundColor: 'pink',
    color: 'black',
  }
}));

export default function Cart({carrito,setCarrito,isLoggedIn}) {
  const classes = useStyles();

  const handleDeleteFromCart = (e,product) => {
    e.preventDefault();
    for(let i=0;i<carrito.length;i++){
      if(carrito[i].id == product.id){
        setCarrito([
          ...carrito.slice(0,i),
          ...carrito.slice(i+1),
        ]);
      }
    }
  }

  let total = 0;
  const _ = carrito.map((item) => {
    total += (item.precio * item.cantidad);
  });

  return (
    <div className={classes.table}>
      <Typography variant="h6" gutterBottom>
        CARRITO
      </Typography>
      <List disablePadding>
        {carrito.map((product) => (
          <ListItem className={classes.listItem} key={product.nombre}>
            <ListItemText primary={product.nombre} secondary={`${product.descripcion} // Cantidad: ${product.cantidad}`} />
            <Typography variant="body2">${product.precio}</Typography>
            <Button 
            variant="contained"
            color="secondary"
            size='small'
            style={{marginLeft: '12px'}}
            onClick={(e)=>handleDeleteFromCart(e,product)}>
            Borrar
          </Button>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>
          <Link to= {isLoggedIn ? '/checkout' : '/sign-in'} style={{ textDecoration: 'none' }} >
            <Button 
                type="submit"
                align="center"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
              PAGAR
            </Button>
          </Link>
        
          <Grid container spacing={2} className= {classes.checkoutButton}>
      </Grid>
    </div>
  );
}