import React, {useEffect, useState} from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';


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
  whiteBlend: {
      backgroundColor: 'pink',
      color: 'black',

  },
  end: {
      paddingBottom: '50px',
  }
}));

function Transactions({transactions}) {
  const classes = useStyles();
  return (
    <React.Fragment >
      <h4  align= "center"  >TRANSACCIONES RECIENTES</h4>
      <br/>
      <Table maxWidth="lg" size="small">
        <TableHead>
          <TableRow >
            <TableCell >Producto</TableCell>
            <TableCell >Cantidad</TableCell>
            <TableCell >Precio</TableCell>
            <TableCell >Destinatario</TableCell>
            <TableCell >Dirección de entrega</TableCell>
            <TableCell >Numero de Tarjeta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {transactions.map((row) => (
            <TableRow key={row.id} >
              <TableCell >{row.compra.item.nombre}</TableCell>
              <TableCell >{row.compra.item.cantidad}</TableCell>
              <TableCell >{row.compra.item.precio}</TableCell>
              <TableCell >{row.shippment.firstName} {row.shippment.lastName}</TableCell>
              <TableCell >{row.shippment.address1} {row.shippment.address2}, C.P: {row.shippment.zipCode}, {row.shippment.city} {row.shippment.state}, {row.shippment.country}</TableCell>
              <TableCell >{row.payment.cardNumber}</TableCell>
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
    whiteBlend: {
        backgroundColor: 'ffffff',
        color: 'black',
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
    const [nuevoId, setNuevoId] = useState(0);
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

    const editarProducto = (edited) => {
      let editedProduct = {
        item: {
          'id': 0,
          'nombre': '',
          'imagen': "https://source.unsplash.com/random",
          'descripcion': '',
          'precio': '',
        }
      }
      editedProduct.item.id = edited.item.id;
      editedProduct.item.nombre = edited.item.nombre;
      editedProduct.item.descripcion = edited.item.descripcion;
      editedProduct.item.precio = edited.item.precio;
      let index = getIndexForItem(edited.item.id);
        
      let editedProducts = [
        ...products.slice(0, index),
        editedProduct,
        ...products.slice(index+1)
      ];

      setProducts(editedProducts);

      console.log('post:', products);
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
        <h1 className={classes.whiteBlend}>USUARIO ADMINISTRADOR</h1>
        <br/>
        <h4 className={classes.whiteBlend} align= "left">ABM PRODUCTOS</h4>
        <Table maxWidth="lg" size="small">
            <TableHead>
                <TableRow className={classes.whiteBlend}>
                    <TableCell className={classes.whiteBlend} align="right">
                    <SimpleDialogDemo className={classes.button} nombre={nuevoNombre} setNombre={(value)=> setNuevoNombre(value)} descripcion={nuevaDescripcion} setDescripcion={(value)=> setNuevaDescripcion(value)} precio={nuevoPrecio} setPrecio={(value)=> setNuevoPrecio(value)} agregarProducto={() => agregarProducto()}/>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>

        <Table maxWidth="lg" size="small">
          <TableHead>
            <TableRow className={classes.whiteBlend}>
              <TableCell className={classes.whiteBlend}>ID</TableCell>
              <TableCell className={classes.whiteBlend}>NOMBRE PRODUCTO</TableCell>
              <TableCell className={classes.whiteBlend}>DESCRIPCIÓN</TableCell>
              <TableCell className={classes.whiteBlend}>PRECIO</TableCell>
              <TableCell className={classes.whiteBlend} align="right"></TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.whiteBlend}>
            {products.map((row) => (
              <TableRow key={row.id} className={classes.whiteBlend}>
                <TableCell className={classes.whiteBlend}>{row.item.id}</TableCell>
                <TableCell className={classes.whiteBlend}>{row.item.nombre}</TableCell>
                <TableCell className={classes.whiteBlend}>{row.item.descripcion}</TableCell>
                <TableCell className={classes.whiteBlend}>${row.item.precio}</TableCell>
                <TableCell className={classes.whiteBlend}> </TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                  {/* <Button className={classes.whiteBlend} variant="secondary" color="secondary" >
                    <CreateIcon/>
                  </Button> */}
                  <SimpleDialogEditDemo className={classes.button} id={nuevoId} setId={(value) => setNuevoId(value)} nombre={nuevoNombre} setNombre={(value)=> setNuevoNombre(value)} descripcion={nuevaDescripcion} setDescripcion={(value)=> setNuevaDescripcion(value)} precio={nuevoPrecio} setPrecio={(value)=> setNuevoPrecio(value)} editarProducto={(value) => editarProducto(value)} actual={row}/>
                </TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                  <Button variant="secondary" onClick={() => eliminarProducto(row.item.id)} className={classes.button} style={{height: '95%'}}>
                      <DeleteIcon/>
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
    backgroundColor: 'ffffff',
    color: 'black',
  },
  whiteBlend:{
    backgroundColor: 'ffffff',
    color: 'black',
    fontColor: 'black',
  }
});

function SimpleDialog({ onClose, selectedValue, open ,nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,agregarProducto}) {
  const classes = useStyles3();
  const [error, setError] = React.useState(false);

  useEffect(()=> {
    if(!validarCampos()){
      setError(true);
    }
    else{
      setError(false);
    }
  },[nombre,descripcion,precio]);

  const validarCampos = () => {
    return validarCaracteres(nombre) && validarCaracteres(descripcion) && validarNumeros(precio);
  }

  const validarNumeros = (value) => {
    let valoresAceptados = /^[0-9]+$/;
    if ( value.match(valoresAceptados) && (value!='')){
      return true;
    }else {
      return false;
    }
  }

  const validarCaracteres = (value) => {
    let posibles = /^[a-zA-Z0-9_ ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };



  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Agregar Producto</DialogTitle>
      {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
            Complete los campos en el formato adecuado
          </Typography> : <></>}
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

        <ListItem autoFocus button onClick={() => !error? handleListItemClick('addAccount') : console.log("datos invalidos")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Agregar Producto" />
        </ListItem>
        <Button className={classes.whiteBlend} align="right" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogDemo({nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,agregarProducto,actual}) {
  const classes = useStyles3();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
    setNombre('');
    setDescripcion('');
    setPrecio('');
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    if(nombre!='' && descripcion!= '' && precio!=''){
      agregarProducto();
    }
  };

  return (
    <div>
      <Button className={classes.whiteBlend} color="secondary" onClick={handleClickOpen}>
        <AddBoxIcon/>
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} nombre={nombre} setNombre={(value)=> setNombre(value)} descripcion={descripcion} setDescripcion={(value)=> setDescripcion(value)} precio={precio} setPrecio={(value)=> setPrecio(value)} agregarProducto={() => agregarProducto()} />
    </div>
  );
}

// start
function SimpleDialogEdit({closeModal, onClose, selectedValue, open ,id,setId,nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,editarProducto}) {
  const classes = useStyles3();
  const [error, setError] = React.useState(false);

  // useEffect(()=> {
  //   if(!validarCampos()){
  //     setError(true);
  //   }
  //   else{
  //     setError(false);
  //   }
  // },[nombre,descripcion,precio]);

  // const validarCampos = () => {
  //   return validarCaracteres(nombre) && validarCaracteres(descripcion) && validarNumeros(precio);
  // }

  // const validarNumeros = (value) => {
  //   let valoresAceptados = /^[0-9]+$/;
  //   if ( value.match(valoresAceptados) && (value!='')){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }

  // const validarCaracteres = (value) => {
  //   let posibles = /^[a-zA-Z0-9_ ]*$/i;
  //   if ((value.match(posibles)) && (value!='')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Editar Producto</DialogTitle>
      {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
            Complete los campos en el formato adecuado
          </Typography> : <></>}
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

        <ListItem autoFocus button onClick={() => !error? handleListItemClick('addAccount') : console.log("datos invalidos")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Editar Producto" />
        </ListItem>
        <Button className={classes.whiteBlend} align="right" color="secondary" onClick={closeModal}>
            Cancelar
          </Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogEditDemo({id,setId,nombre,setNombre,descripcion,setDescripcion,precio,setPrecio,editarProducto,actual}) {
  const classes = useStyles3();
  const [open, setOpen] = React.useState(false);
  const [forcedClose, setForcedClose] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setId(actual.item.id);
    setNombre(actual.item.nombre);
    setDescripcion(actual.item.descripcion);
    setPrecio(actual.item.precio);
    setOpen(true);
    setForcedClose(false);
  };

  const closeModal = (e) => {
    setOpen(false);
    setForcedClose(true);
  }

  const handleClose = (value) => {
    if(!forcedClose){
      setOpen(false);
      setSelectedValue(value);
      let current = {
        item: {
          'id': 0,
          'nombre': '',
          'imagen': "https://source.unsplash.com/random",
          'descripcion': '',
          'precio': '',
        }
      }
      current.item.id = id;
      current.item.nombre = nombre;
      current.item.descripcion = descripcion; 
      current.item.precio = precio;
      editarProducto(current);
      setForcedClose(false);
    }
  };

  return (
    <div>
      <Button className={classes.whiteBlend} variant="secondary" variant="secondary" onClick={handleClickOpen}>
        <CreateIcon/>
      </Button>
      <SimpleDialogEdit selectedValue={selectedValue} open={open} onClose={handleClose} closeModal={closeModal} id={id} setId={(value) => setId(value)} nombre={nombre} setNombre={(value)=> setNombre(value)} descripcion={descripcion} setDescripcion={(value)=> setDescripcion(value)} precio={precio} setPrecio={(value)=> setPrecio(value)} editarProducto={() => editarProducto()} actual={actual} />
    </div>
  );
}

//end

const Admin = ({products,transactions}) => {
  return(
      <div style={{marginTop:'40px',marginLeft:'60px', marginRight:'60px'}}>
          <Products productos={products} />
          <br/>
          <Transactions transactions={transactions}/>
          {/* <DataTableCrudDemo /> */}
      </div>
  );
}

export default Admin;