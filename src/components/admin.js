import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
}); 

// Estilos

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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles4 = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  whiteBlend:{
    backgroundColor: 'ffffff',
    color: 'black',
    fontColor: 'black',
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

function Products() {
    const classes = useStyles2();
    const [categorias, setCategorias] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=> {
      getProductos();
      getCategorias();
    }, []);

    const getProductos = async () => {
      try{
        let productData = await api.get("/items");
        setProducts(productData.data);
      }catch(err){
        alert(err + ": No se pudo caragr informacion de los productos");
      }
    }

    const getCategorias = async () => {
      try{
        let categoriasData = await api.get("/categorias");
        setCategorias(categoriasData.data);
      }
      catch(err){
        alert(err + "Error al cargar datos de categorias");
      }
    }

    const categoryIdToName = (id) => {
      for(let i=0;i<categorias.length;i++){
        if(id == categorias[i].idCategoria){
          return categorias[i].nombre;
        }
      }
    }

    return (
      <React.Fragment >
        <h1 className={classes.whiteBlend}>USUARIO ADMINISTRADOR</h1>
        <br/>
        <h4 className={classes.whiteBlend} align= "left">PRODUCTOS</h4>
        <Table maxWidth="lg" size="small">
            <TableHead>
                <TableRow className={classes.whiteBlend}>
                    <TableCell className={classes.whiteBlend} align="right">
                    <AddProductModal className={classes.button}/>
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
              <TableCell className={classes.whiteBlend}>CATEGORIA</TableCell>
              <TableCell className={classes.whiteBlend}>PRECIO</TableCell>
              <TableCell className={classes.whiteBlend} align="right"></TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.whiteBlend}>
            {products.map((row) => (
              <TableRow key={row.id} className={classes.whiteBlend}>
                <TableCell className={classes.whiteBlend}>{row.itemId}</TableCell>
                <TableCell className={classes.whiteBlend}>{row.nombre}</TableCell>
                <TableCell className={classes.whiteBlend}>{row.descripcion}</TableCell>
                <TableCell className={classes.whiteBlend}>{categoryIdToName(row.idCategoria)}</TableCell>
                <TableCell className={classes.whiteBlend}>${row.precioU}</TableCell>
                <TableCell className={classes.whiteBlend}> </TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                  <EditProductModal className={classes.button} editable={row}/>
                </TableCell>
                <TableCell className={classes.whiteBlend} align="right">
                  <DeleteProductModal id={row.itemId} className={classes.button} style={{height: '90%'}}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.end}></div>
      </React.Fragment>
    );
  }

// Modal para Agregar Productos

function AddProductModal() {
  const classes = useStyles3();
  const [open, setOpen] = React.useState(false);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoPrecio, setNuevoPrecio] =useState('');
  const [nuevoIdCategoria, setNuevoIdCategoria] = useState(0);
  const [nuevaImagen, setNuevaImagen] = useState('');
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    setNuevoNombre('');
    setNuevaDescripcion('');
    setNuevoIdCategoria(0);
    setNuevaImagen('');
    setNuevoPrecio('');
  };

  const handleClose = () => {
    setOpen(false);
    if(nuevoNombre !== '' &&  nuevaDescripcion !== '' && nuevoPrecio !== '' && nuevoIdCategoria !== 0 && nuevaImagen !== ''){
      agregarProducto();
    }
  };

  const agregarProducto = () => {
    let newProduct = {
      'nombre': '',
      'descripcion': '',
      'idCategoria':0,
      'imagen': '',
      'precioU': '',
    };
    newProduct.nombre = nuevoNombre;
    newProduct.descripcion = nuevaDescripcion;
    newProduct.idCategoria = nuevoIdCategoria;
    newProduct.precioU = nuevoPrecio;
    newProduct.imagen = nuevaImagen;

    api.post("/items",newProduct).then(res => {
      alert("Producto agregado.");
      history.push("/admin");
    }).catch(err => 
      alert("Error al agregar producto")
    );
  }

  return (
    <div>
      <Button className={classes.whiteBlend} color="secondary" onClick={handleClickOpen}>
        <AddBoxIcon/>
      </Button>
      <AddProductDialog open={open} onClose={handleClose} nombre={nuevoNombre} setNombre={(value)=> setNuevoNombre(value)} descripcion={nuevaDescripcion} setDescripcion={(value)=> setNuevaDescripcion(value)} idCat={nuevoIdCategoria} setIdCat={(value)=> setNuevoIdCategoria(value)} imagen={nuevaImagen} setImagen={(value) => setNuevaImagen(value)} precio={nuevoPrecio} setPrecio={(value)=> setNuevoPrecio(value)} />
    </div>
  );
}

AddProductDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function AddProductDialog({ open, onClose, nombre,setNombre,descripcion,setDescripcion,idCat, setIdCat,imagen,setImagen,precio,setPrecio}) {
  const classes = useStyles3();
  const [error, setError] = React.useState(false);
  const [categorias, setCategorias] = React.useState([]);
  const [cat, setCat] = useState('');

  useEffect(()=>{
    getCategorias();
  },[]);

  const getCategorias = async () => {
    try{
      let categoriasData = await api.get("/categorias");
      setCategorias(categoriasData.data);
    }
    catch(err){
      alert(err + "Error al cargar datos de categorias");
    }
  }

  const categoryNameToId = (nombre) => {
    for(let i=0;i<categorias.length;i++){
      if(nombre === categorias[i].nombre){
        return categorias[i].idCategoria;
      }
    }
  }

  const handleCategoria = (nombre) => {
    setCat(nombre);
    let id = categoryNameToId(nombre);
    setIdCat(id);
  }

  useEffect(()=> {
    if(!validarCampos()){
      setError(true);
    }
    else{
      setError(false);
    }
  },[nombre,descripcion,idCat,imagen,precio]);

  const validarCampos = () => {
    return validarCaracteres(nombre) && validarCaracteres(descripcion) && validarNumeros(precio) && idCat !== 0 && imagen !== '';
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
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Usuario Administrador - Agregar Producto</DialogTitle>
      {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
            Complete los campos en el formato adecuado
          </Typography> : <></>}
      <List>
        <Table maxWidth="lg" size="large">
          <TableHead style={{margin: '100%'}}/>
          <TableBody>
              <TableRow >
                <TableCell  align="center">
                <Typography component="h5" variant="h5" align="center" style={{fontSize: '14px'}}>
                  Nombre: 
                </Typography>
                  <TextField style={{minWidth: '100%'}} value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell align="center">
                <Typography component="h5" variant="h5" align="center" style={{fontSize: '14px'}}>
                  Descripcion: 
                </Typography>
                  <TextField style={{minWidth: '100%'}} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                {categorias!==[] && 
                (<TableCell align="center">
                  <InputLabel id="demo-simple-select-label">Categoria:</InputLabel>
                  <Select
                    style={{minWidth: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    onChange={(e) => handleCategoria(e.target.value)}
                  >
                    {categorias.map(elem => (<MenuItem key={elem.id} value={elem.nombre} >{elem.nombre}</MenuItem>))}
                  </Select>
                </TableCell>)}
              </TableRow>
              <TableRow >
                <TableCell  align="center">
                <Typography component="h5" variant="h5" align="center" style={{fontSize: '14px'}}>
                  URL de la Imagen: 
                </Typography>
                  <TextField style={{minWidth: '100%'}} value={imagen} onChange={(e) => setImagen(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell  align="center">
                  <Typography component="h5" variant="h5" align="center" style={{fontSize: '14px'}}>
                    Precio: 
                  </Typography>
                  <TextField style={{minWidth: '100%'}} value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>

        <ListItem autoFocus button onClick={() => !error? handleListItemClick() : console.log("datos invalidos")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Agregar Producto" />
        </ListItem>
        <Button style={{width: '100%'}} className={classes.whiteBlend} align="center" color="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </List>
    </Dialog>
  );
}

// Modal para Editar Productos

function EditProductModal({editable}) {
  const classes = useStyles3();
  const [open, setOpen] = React.useState(false);
  const [forcedClose, setForcedClose] = React.useState(false);

  const [id, setId] = useState(editable.itemId);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoIdCategoria, setNuevoIdCategoria] = useState(0);
  const [nuevaImagen, setNuevaImagen] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    setForcedClose(false);
    setNuevoNombre(editable.nombre);
    setNuevaDescripcion(editable.descripcion);
    setNuevoIdCategoria(editable.idCategoria);
    setNuevaImagen(editable.imagen);
    setNuevoPrecio(editable.precioU);
  };

  const closeModal = (e) => {
    setOpen(false);
    setForcedClose(true);
  }

  const handleClose = () => {
    if(!forcedClose){
      setOpen(false);
      editarProducto();
      setForcedClose(false);
    }
  };

  const editarProducto = () => {
    let editedProduct = {
        'nombre': '',
        'descripcion': '',
        'idCategoria': 0,
        'imagen': '',
        'precioU': '',
    }
    editedProduct.nombre = nuevoNombre;
    editedProduct.descripcion = nuevaDescripcion;
    editedProduct.idCategoria = nuevoIdCategoria;
    editedProduct.imagen = nuevaImagen;
    editedProduct.precioU = nuevoPrecio;

    api.put(`/items/${id}`,editedProduct).then(res=> {
      alert("Producto editado con éxito.");
      history.push("/admin");
    }).catch(err => {
      alert("Error al editar producto. ",err);
    });
  }

  return (
    <div>
      <Button className={classes.whiteBlend} variant="secondary" variant="secondary" onClick={handleClickOpen}>
        <CreateIcon/>
      </Button>
      <EditProductDialog open={open} onClose={handleClose} closeModal={closeModal} nombre={nuevoNombre} setNombre={(value)=> setNuevoNombre(value)} descripcion={nuevaDescripcion} setDescripcion={(value)=> setNuevaDescripcion(value)} idCat={nuevoIdCategoria} setIdCat={(value) => setNuevoIdCategoria(value)} imagen={nuevaImagen} setImagen={(value) => setNuevaImagen(value)} precio={nuevoPrecio} setPrecio={(value)=> setNuevoPrecio(value)}/>
    </div>
  );
}

function EditProductDialog({ open , onClose, closeModal, nombre,setNombre,descripcion,setDescripcion,idCat,setIdCat,imagen,setImagen,precio,setPrecio}) {
  const classes = useStyles3();
  const [error, setError] = React.useState(false);
  const [categorias, setCategorias] = React.useState([]);
  const [cat, setCat] = useState('');

  useEffect(()=>{
    getCategorias();
  },[]);

  useEffect(()=> {
    if(!validarCampos()){
      setError(true);
    }
    else{
      setError(false);
    }
  },[nombre,descripcion,idCat,imagen,precio]);

  const getCategorias = async () => {
    try{
      let categoriasData = await api.get("/categorias");
      setCategorias(categoriasData.data);
    }
    catch(err){
      alert(err + "Error al cargar datos de categorias");
    }
  }

  const categoryIdToName = (id) => {
    for(let i=0;i<categorias.length;i++){
      if(id == categorias[i].idCategoria){
        return categorias[i].nombre;
      }
    }
  }

  const categoryNameToId = (nombre) => {
    for(let i=0;i<categorias.length;i++){
      if(nombre === categorias[i].nombre){
        return categorias[i].idCategoria;
      }
    }
  }

  const handleCategoria = (nombre) => {
    setCat(nombre);
    let id = categoryNameToId(nombre);
    setIdCat(id);
  }

  const validarCampos = () => {
    return validarCaracteres(nombre) && validarCaracteres(descripcion) && validarNumeros(precio) && idCat !== 0 && imagen !== '';
  }

  const validarNumeros = (value) => {
    let valoresAceptados = /^[0-9]+$/;
    try{
      if ( value.match(valoresAceptados) && (value!='')){
        return true;
      }else {
        return false;
      }
    }
    catch(err){
      return true;
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
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Usuario Administrador - Editar Producto</DialogTitle>
      {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
            Complete los campos en el formato adecuado
          </Typography> : <></>}
      <List>
      <Table maxWidth="150%" size="large" >
        <TableHead style={{margin:'100%'}} />
          <TableBody>
            <TableRow >
                <TableCell  align="center">
                  <Typography component="h5" variant="h5" align="left" style={{ fontSize: '14px'}}>
                    Nombre:
                  </Typography>
                  <TextField  style={{minWidth:'100%'}} value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell align="center">
                  <Typography component="h5" variant="h5" align="left" style={{ fontSize: '14px'}}>
                    Descripcion:
                  </Typography>
                  <TextField  style={{minWidth:'100%'}}  value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                {categorias!==[] && 
                (<TableCell  align="center">
                  <InputLabel id="demo-simple-select-label">Categoria:</InputLabel>
                  <Select
                    style={{minWidth:'100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryIdToName(idCat)}
                    onChange={(e) => handleCategoria(e.target.value)}
                  >
                    {categorias.map(elem => (<MenuItem key={elem.id} value={elem.nombre}>{elem.nombre}</MenuItem>))}
                  </Select>
                </TableCell>)}
              </TableRow>
              <TableRow >
                <TableCell  align="center">
                  <Typography component="h5" variant="h5" align="left" style={{ fontSize: '14px'}}>
                    URL de la Imagen: 
                  </Typography>
                  <TextField  style={{minWidth:'100%'}} value={imagen} onChange={(e) => setImagen(e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell  align="center">
                  <Typography component="h5" variant="h5" align="left" style={{ fontSize: '14px'}}>
                    Precio:
                  </Typography>
                  <TextField  style={{minWidth:'100%'}} value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <ListItem autoFocus button onClick={() => !error? handleListItemClick() : console.log("datos invalidos")}>
          <ListItemAvatar >
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Editar Producto" />
        </ListItem>
        <Button style={{width: '100%'}} className={classes.whiteBlend} align="center" color="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </List>
    </Dialog>
  );
}

// Modal de eliminacion

function DeleteProductModal({id}) {
  const classes = useStyles4();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  let history = useHistory();


  const eliminarProducto = async (id) => {
    try{
      await api.delete(`/items/${id}`);
      alert("Producto eliminado con éxito.");
      history.push("/admin");
    }catch(err){
      alert("Error al eliminar producto. " + err);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {
    eliminarProducto(id);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h5 id="simple-modal-title">¿Está seguro de que desea eliminar este producto?</h5>
      <Button className={classes.whiteBlend} align="right" color="secondary" onClick={handleAccept}>
        Aceptar
      </Button>
      <Button className={classes.whiteBlend} align="right" color="secondary" align="right" onClick={handleClose}>
        Cancelar
      </Button>
    </div>
  );

  return (
    <div>
      <Button variant="secondary" onClick={handleOpen}>
         <DeleteIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

// Principal

const Admin = ({transactions}) => {
  // const [productos, setProductos] = useState([]);
  // // const [transactions,setTransactions] = useState([]);
  
  // useEffect(()=> {
  //   getProductos();
  // },[]);

  // const getProductos = async () => {
  //   try{
  //     let productData = await api.get("/items");
  //     setProductos(productData.data);
  //   }catch(err){
  //     alert(err, ": No se pudo caragr informacion de los productos");
  //   }
  // }

  return(
      <div style={{marginTop:'40px',marginLeft:'60px', marginRight:'60px'}}>
          <Products />
          <br/>
          <Transactions transactions={transactions}/>
          {/* <DataTableCrudDemo /> */}
      </div>
  );
}

export default Admin;