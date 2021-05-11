import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({carrito,firstName,lastName,address1,address2,cardNumber,nameOnCard,expireDate}) {
  const classes = useStyles();

  let total = 0;
  const _ = carrito.map((item) => {
    total += (item.precio * item.cantidad);
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Carrito
      </Typography>
      <List disablePadding>
        {carrito.map((product) => (
          <ListItem className={classes.listItem} key={product.nombre}>
            <ListItemText primary={product.nombre} secondary={`${product.descripcion}+' , Cantidad: '${product.cantidad}`} />
            <Typography variant="body2">${product.precio}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Envio a:
          </Typography>
          <Typography gutterBottom>{firstName} {lastName}</Typography>
          <Typography gutterBottom>{address1} {address2}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalles de pago
          </Typography>
          <Grid container>
              <div>
                <Grid item xs={12}>
                  <Typography gutterBottom>Numero de Tarjeta: {cardNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Propietario: {nameOnCard}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Fecha de vencimiento: {expireDate}</Typography>
                </Grid>
              </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}