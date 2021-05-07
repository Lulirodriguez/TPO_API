import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor : '#black',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor : '#B0B0B0',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor : 'black',
    color: 'white',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  darkBlend: {
    backgroundColor : 'black',
    color: 'white',
  },
  darkButton: {
    backgroundColor : 'black',
    color: 'white',
    borderColor: '#423E3E',
  },
  cart: {
      fontSize: '18px',
      alignItems: 'center',
      paddingBottom: '20px'
  }
}));

const Counter = ({card, addToCart}) => {
    const classes = useStyles();
    const [counter, setCounter] = React.useState(0);

    const decreaseCount = () => {
        if(counter > 0){
            setCounter(counter-1)
        }
    }

    const increaseCount = (id) => {
        setCounter(counter+1);
    }

    return(
        <>
            <Button className={classes.darkButton} variant="dark" size="xs" onClick={() => decreaseCount()}>
            -
            </Button>
            {counter}
            <Button className={classes.darkButton} variant="dark" size="xs" onClick={() => increaseCount()}>
            +
            </Button>
            <Button className={classes.darkButton} variant="dark" size="small" onClick={() => addToCart(card,counter)}>
                Agregar al Carrito
            </Button>
        </>
    );
}

const Category = ({carrito, setCarrito,items}) => {
  const classes = useStyles();
//   const editJsonFile = require("edit-json-file");
//   let file = editJsonFile('../jsonFiles/cart.json');

    // const items = [
    //     {'item': ({
    //         'id' : 1,
    //         'nombre': 'Raqueta',
    //         'descripcion': 'Principal herramienta de juego',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 2000,
    //     })},
    //     {'item': ({
    //         'id' : 2,
    //         'nombre': 'Tubo de Pelotas Tenis Slazenger',
    //         'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 1050,
    //     })},
    //     {'item': ({
    //         'id' : 3,
    //         'nombre': 'Encordado de Raqueta',
    //         'descripcion': 'Encordados de la mejor calidad',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 470,
    //     })},
    //     {'item': ({
    //         'id' : 4,
    //         'nombre': 'Anti vibrador de raqueta',
    //         'descripcion': 'Atenua la vibracion de las cuerdas',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 200,
    //     })},
    //     {'item': ({
    //         'id' : 5,
    //         'nombre': 'Grip',
    //         'descripcion': 'Recubrimiento firme del mango. Agarre solido.',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 400,
    //     })},
    //     {'item': ({
    //         'id' : 6,
    //         'nombre': 'Funda de Raqueta',
    //         'descripcion': 'Impermeable. Mayor proteccion',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 1200,
    //     })},
    //     {'item': ({
    //         'id' : 7,
    //         'nombre': 'Grip Holder',
    //         'descripcion': 'Extensibilidad relativa',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 600,
    //     })},
    //     {'item': ({
    //         'id' : 8,
    //         'nombre': 'Tubo de Pelotas Tenis Prince',
    //         'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 800,
    //     })},
    //     {'item': ({
    //         'id' : 9,
    //         'nombre': 'Tubo de Pelotas Tenis Wilson',
    //         'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
    //         'imagen': 'https://source.unsplash.com/random',
    //         'precio': 900,
    //     })},
    // ];

    useEffect(() => {
        //Acá se va a fetchear la data de la categoría desde el back con algun fetchCategory()
        console.log(items);
    },[]);

    const handleOnAddToCart = (card,cantidad) => {
        // console.log(card);
        // file.append("item",  {id : `${card.item.id}`, nombre : `${card.item.nombre}`, descripcion : `${card.item.descripcion}`, precio : `${card.item.precio}`, cantidad : `${cantidad}`});
        // console.log("archivo: ", file.get());
        // setCarritoCount(carritoCount+cantidad);
        if(cantidad > 0){
            let item = card.item;
            item.cantidad = cantidad;
            if(carrito===[]){
                setCarrito(item);
            }
            else{
                setCarrito([
                    ...carrito,
                    item,
                ]);
            }
        } 
    }

    return (
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                <div>
                    <table className={classes.darkBlend}>
                        <th>
                            <p className={classes.cart}>Carrito</p>
                        </th>
                        <tr>
                            {carrito.map((articulo) => (
                                <td>
                                    <p>Nombre: {articulo.nombre}</p>
                                    <p>Descripcion: {articulo.descripcion}</p>
                                    <p>Precio: ${articulo.precio}</p>
                                    <p>Cantidad: {articulo.cantidad}</p>
                                    <br />
                                </td>
                            ))}
                        </tr>
                    </table>
                </div>
                </Grid>
                <Grid container spacing={4}>
                    {items.map((card) => (
                    <Grid key={card.item.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={card.item.imagen}
                            title="Imagen"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.darkBlend} gutterBottom variant="h5" component="h2">
                            {card.item.nombre}
                            </Typography>
                            <Typography className={classes.darkBlend}>
                            {card.item.descripcion}
                            </Typography>
                            <Typography className={classes.darkBlend}>
                            ${card.item.precio}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.darkBlend}>
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

