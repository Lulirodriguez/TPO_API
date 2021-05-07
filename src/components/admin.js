import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';
import DataTableCrudDemo from './dataTable.js';

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  darkBlend: {
      backgroundColor: 'black',
      color: 'white',
  },
  end: {
      paddingBottom: '50px',
  }
}));

function Transactions({transactions}) {
  const classes = useStyles();
  return (
    <React.Fragment >
      <h3 className={classes.darkBlend}>Últimas Transacciones</h3>
      <Table maxWidth="lg" size="small">
        <TableHead>
          <TableRow className={classes.darkBlend}>
            <TableCell className={classes.darkBlend}>Producto</TableCell>
            <TableCell className={classes.darkBlend}>Cantidad</TableCell>
            <TableCell className={classes.darkBlend}>Precio</TableCell>
            <TableCell className={classes.darkBlend}>Destinatario</TableCell>
            <TableCell className={classes.darkBlend}>Dirección de entrega</TableCell>
            <TableCell className={classes.darkBlend}>Numero de Tarjeta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.darkBlend}>
          {transactions.map((row) => (
            <TableRow key={row.id} className={classes.darkBlend}>
              <TableCell className={classes.darkBlend}>{row.compra.item.nombre}</TableCell>
              <TableCell className={classes.darkBlend}>{row.compra.item.cantidad}</TableCell>
              <TableCell className={classes.darkBlend}>{row.compra.item.precio}</TableCell>
              <TableCell className={classes.darkBlend}>{row.shippment.firstName} {row.shippment.lastName}</TableCell>
              <TableCell className={classes.darkBlend}>{row.shippment.address1} {row.shippment.address2}, C.P: {row.shippment.zipCode}, {row.shippment.city} {row.shippment.state}, {row.shippment.country}</TableCell>
              <TableCell className={classes.darkBlend}>{row.payment.cardNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const useStyles2 = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    darkBlend: {
        backgroundColor: 'black',
        color: 'white',
    },
    end: {
        paddingBottom: '50px',
    }
  }));

function Products({productos}) {
    const classes = useStyles2();

    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoPrecio, setNuevoPrecio] =useState('');
    const [products, setProducts] = useState(productos);
    const [idCounter, setIdCounter] = useState(0);
    // const [productsToDisplay, setProductsToDisplay] = useState([]);

    useEffect(()=> {
      let cantidad = [...products];
      setIdCounter(idCounter+cantidad.length+1);
      console.log("Seteo display");
    }, []);

    let newProduct = {
      item: {
        'id': idCounter,
        'nombre': '',
        'imagen': "https://source.unsplash.com/random",
        'descripcion': '',
        'precio': '',
      }
    };

    const getIndexForItem = (id) => {
      let productos = [...products];
      for (let i = 0; i<productos.length ; i++){
        if(productos[i].item.id == id){
          return i;
        }
      }
      return 0;
    }

    const agregarProducto = () => {
      newProduct.item.nombre = nuevoNombre;
      newProduct.item.descripcion = nuevaDescripcion;
      newProduct.item.precio = nuevoPrecio;
      newProduct.item.id = idCounter;

      console.log('prev:', products);

      setProducts([
        ...products,
        newProduct,
      ]);
      setIdCounter(idCounter+1);

      console.log('prev:', products);
    }

    const editarProducto = (row) => {
        // editar atributos del componente "objeto" del array -> ???
    }

    const eliminarProducto = (id) => {
      console.log('prev:', products);

      let updatedProducts = [...products];
      let index = getIndexForItem(id);
      updatedProducts.splice(index,1);
      console.log(updatedProducts);

      setProducts(updatedProducts);
      
      console.log('post:', products);
    }


    return (
      <React.Fragment >
        <h1 className={classes.darkBlend}>USUARIO ADMINISTRADOR</h1>
        <h3 className={classes.darkBlend}>Productos</h3>
        <Table maxWidth="lg" size="small">
            <TableHead>
                <TableRow className={classes.darkBlend}>
                    <TableCell className={classes.darkBlend} align="center">
                    <SimpleDialogDemo className={classes.button} text="Agregar Producto" nombre={nuevoNombre} setNombre={(value)=> setNuevoNombre(value)} descripcion={nuevaDescripcion} setDescripcion={(value)=> setNuevaDescripcion(value)} precio={nuevoPrecio} setPrecio={(value)=> setNuevoPrecio(value)} agregarProducto={() => agregarProducto()}/>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>

        <Table maxWidth="lg" size="small">
          <TableHead>
            <TableRow className={classes.darkBlend}>
              <TableCell className={classes.darkBlend}>Id</TableCell>
              <TableCell className={classes.darkBlend}>Name</TableCell>
              <TableCell className={classes.darkBlend}>Description</TableCell>
              <TableCell className={classes.darkBlend}>Price</TableCell>
              <TableCell className={classes.darkBlend} align="right">
                </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.darkBlend}>
            {products.map((row) => (
              <TableRow key={row.id} className={classes.darkBlend}>
                <TableCell className={classes.darkBlend}>{row.item.id}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.nombre}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.descripcion}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.precio}</TableCell>
                <TableCell className={classes.darkBlend}> </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                  <Button variant="contained" onClick={() => editarProducto(row)} className={classes.button}>
                      Editar Producto
                  </Button>
                </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                  <Button variant="contained" onClick={() => eliminarProducto(row.item.id)} className={classes.button}>
                      Eliminar Producto
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.end}></div>
      </React.Fragment>
    );
  }


const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles3 = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  darkBlend:{
    backgroundColor: 'black',
    color: 'white',
    fontColor: 'white',
  }
});

function SimpleDialog({ onClose, selectedValue, open ,nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,agregarProducto}) {
  const classes = useStyles3();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Agregar Producto</DialogTitle>
      <List>
        <Table maxWidth="md" size="small">
          <TableHead>
              <TableRow >
                  <TableCell  align="center">
                    Nombre: 
                    <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </TableCell>
                  <TableCell align="center">
                    Descripcion: 
                    <TextField  value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                  </TableCell>
                  <TableCell  align="center">
                    Precio: 
                    <TextField value={precio} onChange={(e) => setPrecio(e.target.value)} />
                  </TableCell>
              </TableRow>
          </TableHead>
        </Table>

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Agregar Producto" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogDemo({text,nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,agregarProducto}) {
  const classes = useStyles3();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    agregarProducto();
  };

  return (
    <div>
      <Button className={classes.darkBlend} variant="outlined" color="primary" onClick={handleClickOpen}>
        {text}
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} nombre={nombre} setNombre={(value)=> setNombre(value)} descripcion={descripcion} setDescripcion={(value)=> setDescripcion(value)} precio={precio} setPrecio={(value)=> setPrecio(value)} agregarProducto={() => agregarProducto()}/>
    </div>
  );
}

const Admin = ({products,transactions}) => {
  return(
      <>
          <Products productos={products} />
          <Transactions transactions={transactions}/>
          {/* <DataTableCrudDemo /> */}
      </>
  );
}

export default Admin;