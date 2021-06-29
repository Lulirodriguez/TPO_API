import React, { useState, useEffect } from 'react';
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
    const [counter, setCounter] = React.useState(card.item.cantidad?card.item.cantidad:1);

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

const Category = ({carrito, setCarrito,items}) => {
    const classes = useStyles();
    const [itemList, setItemList] = useState(items);

    useEffect(() => {
        console.log(items);
    },[]);

    const handleOnAddToCart = (card,cantidad) => {
        if(cantidad > 0){
            let item = card.item;
            item.cantidad = cantidad;
            if(carrito===[]){
                setCarrito(item);
            }
            else{
                let index = -1;
                for(let i=0; i<carrito.length;i++){
                    if(carrito[i].id === item.id){
                        index = i;
                    }
                }
                if(index === -1){
                    setCarrito([
                        ...carrito,
                        item,
                    ]);
                }
                else{
                    // item.cantidad += carrito[index].cantidad;
                    setCarrito([
                        ...carrito.slice(0,index),
                        item,
                        ...carrito.slice(index+1),
                    ]);
                }
            }
            let listIndex = -1;
            for(let i=0; i<itemList.length;i++){
                if(itemList[i].id === item.id){
                    listIndex = i;
                }
            }
            setItemList([
                ...itemList.slice(0,listIndex),
                item,
                ...itemList.slice(listIndex+1),
            ]);
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
                    <Grid key={card.item.id} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={card.item.imagen}
                            title="Imagen"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.whiteBlend} gutterBottom variant="h5" component="h2">
                            {card.item.nombre}
                            </Typography>
                            <Typography className={classes.whiteBlend}>
                            {card.item.descripcion}
                            </Typography>
                            <Typography className={classes.whiteBlend}>
                            ${card.item.precio}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.whiteBlend}>
                            <Counter id={card.item.id} card={card} addToCart={handleOnAddToCart}/>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
                
                
            </main>
        </div>
    );
}

export default Category;

