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
    backgroundColor : 'B0B0B0',
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
  }
}));

const Counter = ({id, itemsCount}) => {
    const classes = useStyles();
    const [counter, setCounter] = React.useState(0);

    const decreaseCount = (id) => {
        if(itemsCount[id] > 0){
            setCounter(counter-1)
            itemsCount[id] -= 1;
        }
    }

    const increaseCount = (id) => {
        setCounter(counter+1);
        itemsCount[id] += 1;
    }

    return(
        <>
            <Button className={classes.darkButton} variant="dark" size="xs" onClick={() => decreaseCount(id)}>
            -
            </Button>
            {counter}
            <Button className={classes.darkButton} variant="dark" size="xs" onClick={() => increaseCount(id)}>
            +
            </Button>
        </>
    );
}

const TenisPage = () => {
  const classes = useStyles();
    const items = [
        {'item': ({
            'id' : 1,
            'nombre': 'Raqueta',
            'descripcion': 'Principal herramienta de juego',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 2,
            'nombre': 'Pelotas de Tenis',
            'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 3,
            'nombre': 'Encordado de Raqueta',
            'descripcion': 'Encordados de la mejor calidad',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 4,
            'nombre': 'Anti vibrador',
            'descripcion': 'Atenua la vibracion de las cuerdas',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 5,
            'nombre': 'Grip',
            'descripcion': 'Recubrimiento firme del mango. Agarre solido.',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 6,
            'nombre': 'Funda de Raqueta',
            'descripcion': 'Impermeable. Mayor proteccion',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 7,
            'nombre': 'Raqueta',
            'descripcion': 'Principal herramienta de juego',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 8,
            'nombre': 'Pelotas de Tenis',
            'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
            'imagen': 'https://source.unsplash.com/random',
        })},
        {'item': ({
            'id' : 9,
            'nombre': 'Encordado de Raqueta',
            'descripcion': 'Encordados de la mejor calidad',
            'imagen': 'https://source.unsplash.com/random',
        })},
    ];
    const [carrito, setCarrito] = React.useState([]); 
    const [carritoCount, setCarritoCount] = React.useState(0);

    const handleOnClick = (card) => {
        for(let i = 0; i < card.item.id;i++){
            setCarrito([
                ...carrito,
                card.item,
            ]);
            setCarritoCount(carritoCount+1);
        }
    }

    let itemsCount = [];
    for(let i=0;i<items.length;i++){
        itemsCount = [...itemsCount, 0]
    }


    return (
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
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
                        </CardContent>
                        <CardActions className={classes.darkBlend}>
                            <Counter id={card.item.id} itemsCount={itemsCount}/>
                            <Button className={classes.darkButton} variant="dark" size="small" onClick={() => handleOnClick(card)}>
                            Agregar al Carrito
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
                
                <div>
                    <table className={classes.darkBlend}>
                        <th>
                            <p>Carrito: {carritoCount}</p>
                        </th>
                        <tr>
                            {carrito.map((articulo) => (
                                <td>
                                    <p>Nombre: {articulo.nombre}</p>
                                    <p>Descripcion: {articulo.descripcion}</p>
                                    <p>Cantidad: {itemsCount[articulo.id]}</p>
                                    <br />
                                </td>
                            ))}
                        </tr>
                    </table>
                </div>
                
            </main>
        </div>
    );
}

export default TenisPage;

