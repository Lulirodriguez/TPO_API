import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
}); 


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor : 'white',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor : '#ffffff',
    padding: '20px',
  },
  cardMedia: {
    paddingTop: '80%', // 16:9
    
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor : 'white',
    color: 'black',
    align: 'right',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  whiteBlend: {
    backgroundColor : 'white',
    color: 'black',
  },
  whiteButton: {
    backgroundColor : 'white',
    color: 'black',
    margin:'auto',


  },

  pinkButton: {
    backgroundColor : 'pink',
    color: 'black',
    margin: 'auto',

  },

  cart: {
      fontSize: '30px',
      alignItems: 'center',
      paddingBottom: '10px'
  },
  counterButton: {
      marginBottom:'10.px'

  },
}));

const Counter = ({card, addToCart}) => {
    const classes = useStyles();
    const [counter, setCounter] = React.useState(card.cantidad ? card.cantidad : 1);

    const decreaseCount = () => {
        if(counter > 1){
            setCounter(counter-1)
        }
    }

    const increaseCount = (id) => {
        setCounter(counter+1);
    }

    return(
        <div style={{display:'flex', margin:'auto'}}>
            <Button className={classes.whiteButton} variant="dark" size="xs" onClick={() => decreaseCount()}>
            -
            </Button>
            {counter}
            <Button className={classes.whiteButton} variant="dark" size="xs" onClick={() => increaseCount()}>
            +
            </Button>
            <Button color="secondary" className={classes.pinkButton} variant= "contained" size="small" onClick={() => addToCart(card,counter)}>
                <AddShoppingCartIcon/>
            </Button>
        </div>
    );
}

const Category = ({carrito, setCarrito}) => {
    const classes = useStyles();
    const [itemList, setItemList] = useState([]);
    let {categoryId} = useParams();

    useEffect(() => {
        getItemsForCategory();
        console.log(itemList);
    },[]);

    const getItemsForCategory = async () => {
        let itemsData = await api.get(`items/${categoryId}`);
        setItemList(itemsData.data);
    }

    const handleOnAddToCart = (card,cantidad) => {
        if(cantidad > 0){
            let item = card;
            item.cantidad = cantidad;
            let index = -1;
            for(let i=0; i<carrito.length;i++){
                if(carrito[i].itemId === item.itemId){
                    index = i;
                }
            }
            if(index === -1){
                alert("Nuevo item agregado");
                setCarrito([
                    ...carrito,
                    item,
                ]);
            }
            else{
                item.cantidad = cantidad;
                alert("Cantidad actualizada");
                setCarrito([
                    ...carrito.slice(0,index),
                    item,
                    ...carrito.slice(index+1),
                ]);
            }
        }
    }

    return (
        <div className={classes.counterbutton}>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={8}>
                </Grid>
                <Grid container spacing={4}>
                    {itemList.map((card) => (
                    <Grid key={card.itemId} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={card.imagen}
                            title="Imagen"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.whiteBlend} gutterBottom variant="h5" component="h2">
                            {card.nombre}
                            </Typography>
                            <Typography className={classes.whiteBlend}>
                            {card.descripcion}
                            </Typography>
                            <Typography className={classes.whiteBlend}>
                            ${card.precioU}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.whiteBlend}>
                            <Counter id={card.itemId} card={card} addToCart={handleOnAddToCart}/>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
                {itemList===[] ? <div style={{marginTop: '2%', fontSize: '16px'}}><p>No hay productos disponibles para esta categoría</p></div> : <></>}
            </main>
        </div>
    );
}

export default Category;

