import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

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

const CartCounter = ({product,cart,setCart}) => {
  const [counter, setCounter] = useState(product.cantidad);

  const setNewAmount = (counter) => {
    for(let i=0;i<cart.length;i++){
      if(cart[i].itemId == product.itemId){
        let item = cart[i];
        item.cantidad = counter;
        setCart([
          ...cart.slice(0,i),
          item,
          ...cart.slice(i+1),
        ]);
      }
    }
  }

  const decreaseCount = (event) => {
      if(counter > 1){
        setNewAmount(counter-1);
      }
      else if(counter === 1){
        for(let i=0;i<cart.length;i++){
          if(cart[i].itemId == product.itemId){
            setCart([
              ...cart.slice(0,i),
              ...cart.slice(i+1),
            ]);
          }
        }
      }
  }

  const increaseCount = (event) => {
    setNewAmount(counter+1);
  }

  return(
      <div style={{margin:'auto'}}>
          <Button size="xs" onClick={(e) => decreaseCount(e)}>
          -
          </Button>
          {counter}
          <Button  size="xs" onClick={(e) => increaseCount(e)}>
          +
          </Button>
      </div>
  );
}

export default function Cart({carrito,setCarrito,isLoggedIn,setReadyToPay}) {
  const classes = useStyles();

  let history = useHistory();

  const handleClick = e => {
    e.preventDefault()
    if(!isLoggedIn){
      setReadyToPay(true);
      history.push('/sign-in');
    }
    else{
      history.push('/checkout');
    }
  }

  const handleDeleteFromCart = (e,product) => {
    e.preventDefault();
    for(let i=0;i<carrito.length;i++){
      if(carrito[i].itemId == product.itemId){
        setCarrito([
          ...carrito.slice(0,i),
          ...carrito.slice(i+1),
        ]);
      }
    }
  }

  let total = 0;
  const _ = carrito.map((item) => {
    total += (item.precioU * item.cantidad);
  });

  return (
    <div className={classes.table}>
      <Typography variant="h6" gutterBottom>
        CARRITO
      </Typography>
      <List disablePadding>
        {carrito.map((product) => (
            <ListItem className={classes.listItem} key={product.itemId}>
              <ListItemText primary={product.nombre} secondary={`${product.descripcion}`} />
              <CartCounter key={product.nombre} product={product} cart={carrito} setCart={(value) => setCarrito(value)} />
              <Typography style={{marginLeft: '25px'}} variant="body2">${product.precioU}</Typography>
              <Button 
                variant="secondary"
                size='small'
                style={{marginLeft: '25px'}}
                onClick={(e)=>handleDeleteFromCart(e,product)}>
                <DeleteIcon/>
              </Button>
            </ListItem>
        ))}
        </List>
        <List disablePadding>
        {carrito && carrito.length!==0 ?
        (<div>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${total}
            </Typography>
          </ListItem>
          <Button 
                type="submit"
                align="center"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={e=>handleClick(e)}
              >
            PAGAR
            </Button>
          </div>):(<p>Aún no hay productos en el carrito</p>)}
          </List>
        
          <Grid container spacing={2} className= {classes.checkoutButton}>
      </Grid>
    </div>
  );
}