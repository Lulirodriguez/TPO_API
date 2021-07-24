import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import CustomInput from "./CustomInput/CustomInput.js";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardAvatar from "./Card/CardAvatar.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import avatar from "../images/marc.jpg";

import './userProfile.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
});

const styles = {
  cardCategoryWhite: {
    color: "#000000",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  whiteBlend: {
    backgroundColor: 'ffffff',
    color: 'black',
  },
};

const useStyles5 = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  whiteBlend: {
    backgroundColor: 'ffffff',
    color: 'black',
  },
}));


const useStyles = makeStyles(styles);

const EditProfile = ({usuario, setUsuario}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [username,setUsername] = useState('');
  
  useEffect(()=> {
    getProfile();
  },[]);

  useEffect(()=> {
    try{
      if(!validarCampos()){
        setError(true);
      }
      else{
        setError(false);
      }
    }catch(err){
      setError(true);
    }
  },[nombre,apellido]);

  const getProfile = async () => {
    try{
      let res = await api.get(`/usuarios/${usuario.id}`);
      console.log(res);
      let user = res.data;
      setNombre(user.nombre);
      setApellido(user.apellido);
      setUsername(user.username);
      return user;
    }catch(err){
      console.log(err);
    }
  }

  const validarCampos = () => {
    return validarCaracteres(nombre) &&
    validarCaracteres(apellido);
  }

  const validarCaracteres = (value) => {
    let posibles = /^[áéíóúa-zA-Z_'" ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let user = {
      'nombre': nombre,
      'apellido': apellido,
      'username': username,
    }
    try{
      let res = await api.put(`/usuarios/${usuario.id}`,user);
      if(res.status == 200){
        getProfile().then(user =>{
          setUsuario(user);
          alert("Información de perfil actualizada con éxito");
        }).catch(err => {
          alert(err);
        });
      }
      else{
        alert("Ocurrio un error al actualizar la informacion de perfil");
      }
    }catch(err){
      alert("El email ingresado es inválido");
    };
  }

  return(
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink'}}>
            <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
            <p className={classes.cardCategoryWhite}>Edite su información de perfil aquí</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
                Complete los campos en el formato adecuado
              </Typography> : <></>}
                <CustomInput
                  labelText="Email"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : username,
                    onChange: (e) => setUsername(e.target.value)
                  }}>
                </CustomInput>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre"
                  id="nombre"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : nombre,
                    onChange: (e) => setNombre(e.target.value)
                  }}
                  >
                </CustomInput>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Apellido"
                  id="last-name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : apellido,
                    onChange: (e) => setApellido(e.target.value)
                  }}
                  >
                </CustomInput>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}} onClick={!error? (e) => handleUpdateProfile(e) : console.log("Completar campos correctamente")}>Actualizar Perfil</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const DireccionEnvio = ({usuario}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const [firstRes, setFirstRes] = useState(null);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(()=> {
    getAddress();
  },[]);

  const getAddress = async () => {
    try{
      let res = await api.get(`/direccionesDeEnvio/${usuario.id}`);
      console.log(res);
      let address = res.data;
      setFirstRes(address);
      setAddress1(address.direccion1);
      setAddress2(address.direccion2);
      setCity(address.provincia);
      setState(address.localidad);
      setZipCode(address.codigoPostal);
      setCountry(address.pais);
      // return address;
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=> {
    try{
      if(!validarCampos()){
        setError(true);
      }
      else{
        setError(false);
      }
    }catch(err){
      setError(true);
    }
  },[address1,address2,city,state,zipCode,country]);

  const validarCampos = () => {
    return validarCaracteresYNumeros(address1) &&
    validarCaracteres(city) &&
    validarCaracteres(state) &&
    validarCaracteres(country);
  }

  const validarNumeros = (value) => {
    let valoresAceptados = /^[0-9 ]+$/;
    if ( value.match(valoresAceptados) && (value!='') ){
      return true;
    }else {
      return false;
    }
  }

  const validarCaracteres = (value) => {
    let posibles = /^[áéíóúÁÉÍÓÚa-zA-Z_ ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const validarCaracteresYNumeros = (value) => {
    let posibles = /^[áéíóúÁÉÍÓÚa-zA-Z0-9_ ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    let address = {
      'idCliente': usuario.id,
      'direccion1': address1,
      'direccion2': address2,
      'provincia': city,
      'localidad': state,
      'codigoPostal': zipCode,
      'pais': country,
    }
    try{
      if(firstRes == null){
        let res = await api.post(`/direccionesDeEnvio`,address);
        if(res.status == 200){
          alert("Información de envio actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de envio");
        }
      }
      else{
        let res = await api.put(`/direccionesDeEnvio/${usuario.id}`,address);
        if(res.status == 200){
          alert("Información de envio actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de envio");
        }
      }
    }catch(err){
      alert("Error al actualizar informacion de envio");
    };
  }

  return (
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'black'}}>
            <h4 className={classes.cardTitleWhite}>Dirección de Envío</h4>
            <p className={classes.cardCategoryWhite}>Cambie sus preferencias de envío aquí</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
                Complete los campos en el formato adecuado
              </Typography> : <></>}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Direccion 1"
                  id="direx1"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : address1,
                    onChange: (e) => setAddress1(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Direccion 2"
                  id="direx2"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : address2,
                    onChange: (e) => setAddress2(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Localidad"
                  id="localidad"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : state,
                    onChange: (e) => setState(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Provincia"
                  id="provincia"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : city,
                    onChange: (e) => setCity(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Codigo Postal"
                  id="postalCode"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : zipCode,
                    onChange: (e) => setZipCode(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="País"
                  id="pais"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : country,
                    onChange: (e) => setCountry(e.target.value)
                  }}
                />
              </GridItem>
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}} onClick={!error? (e) => handleUpdateAddress(e) : console.log("Completar campos de forma adecuada")}>Actualizar Detalles de Envío</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const MetodoDePago = ({usuario}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const [firstRes, setFirstRes] = useState(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(()=> {
    getPayment();
  },[]);

  const getPayment = async () => {
    try{
      let res = await api.get(`/metodosDePago/${usuario.id}`);
      console.log(res);
      let payment = res.data;
      setFirstRes(payment);
      setNameOnCard(payment.nombre);
      setCardNumber(payment.numero);
      setExpDate(payment.vencimiento);
      setCvv(payment.codigo);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=> {
    try{
      if(!validarCampos()){
        setError(true);
      }
      else{
        setError(false);
      }
    }catch(err){
      setError(true);
    }
  },[nameOnCard,cardNumber,expDate,cvv]);

  const validarCampos = () => {
    return validarCaracteres(nameOnCard) && validarTarjeta(cardNumber) && validarCodigo(cvv) && validarFormatoFecha(expDate);
  }

  function validarFormatoFecha(value) {
    var RegExPattern = /^\d{1,2}\/\d{2}$/;
    if ((value.match(RegExPattern)) && (value!='')) {
          return true;
    } else {
          return false;
    }
  }

  const validarTarjeta = (value) => {
    let valoresAceptados = /^[0-9 ]+$/;
    if ( value.match(valoresAceptados) && (value!='') && value.length == 16){
      return true;
    }else {
      return false;
    }
  }

  const validarCodigo = (value) => {
    let valoresAceptados = /^[0-9 ]+$/;
    if ( value.match(valoresAceptados) && (value!='') && (value.length == 3 || value.length == 4) ){
      return true;
    }else {
      return false;
    }
  }

  const validarCaracteres = (value) => {
    let posibles = /^[áéíóúa-zA-Z_' ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    let payment = {
      'idCliente': usuario.id,
      'nombre': nameOnCard,
      'numero': cardNumber,
      'codigo': cvv,
      'vencimiento': expDate,
    }
    try{
      if(firstRes == null){
        let res = await api.post(`/metodosDePago`,payment);
        if(res.status == 200){
          alert("Información de pago actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de pago");
        }
      }
      else{
        let res = await api.put(`/metodosDePago/${usuario.id}`,payment);
        if(res.status == 200){
          alert("Información de pago actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de pago");
        }
      }
    }catch(err){
      alert("Error al actualizar informacion de pago");
    };
  }

  return (
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'black'}}>
            <h4 className={classes.cardTitleWhite}>Método de Pago</h4>
            <p className={classes.cardCategoryWhite}>Cambie sus preferencias de pago aquí</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
                Complete los campos en el formato adecuado
              </Typography> : <></>}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre en la Tarjeta"
                  id="cardName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : nameOnCard,
                    onChange: (e) => setNameOnCard(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Numero de la Tarjeta (sin espacios)"
                  id="cardNumber"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : cardNumber,
                    onChange: (e) => setCardNumber(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Fecha Vencimiento (mm/yy)"
                  id="expiredDate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : expDate,
                    onChange: (e) => setExpDate(e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Código de Seguridad (3 o 4 dígitos)"
                  id="securityCode"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value : cvv,
                    onChange: (e) => setCvv(e.target.value)
                  }}
                />
              </GridItem>
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}} onClick={!error? (e) => handleUpdatePayment(e) : console.log("Completar Campos de forma adecuada")}>Actualizar Método de Pago</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const MisCompras = ({usuario}) => {
  const classes = useStyles();

  const [transacciones, setTransacciones] = useState([]);

  useEffect(()=> {
    getTransactions();
  },[]);

  const getTransactions = async () => {
    try{
      let res = await api.get(`/transacciones/${usuario.id}`);
      setTransacciones(res.data);
    }catch(err){
      alert("Error al recuperar transacciones");
    }
  }

  return(
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'pink'}}>
            <h4 className={classes.cardTitleWhite}>Mis Compras</h4>
            <p className={classes.cardCategoryWhite}>Visualización de transacciones</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
            {transacciones && transacciones.length!=0 ? transacciones.map((transaccion) => (
              <TransactionAccordion transaccion={transaccion} />
            )) : (
              <GridItem xs={12} sm={12} md={12}>
              <h5 style={{marginTop:'1%', alignItems: 'center'}} align="center">- Aún no se registran compras -</h5>
              </GridItem>
            )}
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );  
}

const TransactionAccordion = ({transaccion}) => {
  const classes = useStyles5();

  const [categorias, setCategorias] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [productos, setProductos] = useState([]);
  const [metodoDePago, setMetodoDePago] = useState({});
  const [direccionEnvio, setDireccionEnvio] = useState({});

  const [total, setTotal] = useState(0);

  useEffect(()=> {
    getCategorias();
    getClienteTransaccion();
    getProductosTransaccion();
    getMetodoPagoTransaccion();
    getDireccionEnvioTransaccion();
  }, []);

  const getProductosTransaccion = async () => {
    api.get(`/itemsXCompra/${transaccion.idCompra}`).then(productosCompra => {
      setProductos(productosCompra.data);
      calcularTotal(productosCompra.data);
    }).catch(err => {
      alert(err + "Error al cargar datos de items");
    });
  }

  const getClienteTransaccion = async () => {
    try{
      let cliente = await api.get(`/usuarios/${transaccion.idCliente}`);
      setUsuario(cliente.data);
    }
    catch(err){
      alert(err + "Error al cargar datos de usuario");
    }
  }

  const getMetodoPagoTransaccion = async () => {
    try{
      let metodoPago = await api.get(`/metodosDePago/${transaccion.idCliente}`);
      setMetodoDePago(metodoPago.data);
    }
    catch(err){
      alert(err + "Error al cargar datos de pago");
    }
  }

  const getDireccionEnvioTransaccion = async () => {
    try{
      let direccion = await api.get(`/direccionesDeEnvio/${transaccion.idCliente}`);
      setDireccionEnvio(direccion.data);
    }
    catch(err){
      alert(err + "Error al cargar datos de direccion");
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

  const calcularTotal = (productos) => {
    let total = 0;
    for(let i=0;i<productos.length;i++){
      total = total + productos[i].precioU * productos[i].cantidad;
    }
    setTotal(total);
  }

  const parseCardNumber = (value) => {
    return "**** **** **** " + value.slice(12);
  }

  return (
    <div className={classes.root}>
      {!!transaccion && 
        <Accordion style={{borderColor: 'black', marginBottom: '1%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Table maxWidth="lg" size="small">
            <TableHead>
              <TableRow >
                <TableCell ><b>Número de Compra</b></TableCell>
                <TableCell ><b>Fecha</b></TableCell>
                <TableCell ><b>Importe Total</b></TableCell>
                <TableCell ><b>Destinatario</b></TableCell>
                <TableCell ><b>Dirección de entrega</b></TableCell>
                <TableCell ><b>Numero de Tarjeta</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={transaccion.idCompra} >
                <TableCell >{transaccion.idCompra}</TableCell>
                <TableCell >{transaccion.createdAt.slice(0,10)}</TableCell>
                <TableCell >${total}</TableCell>
                <TableCell >{usuario.nombre} {usuario.apellido}</TableCell>
                <TableCell >{direccionEnvio.direccion1} {direccionEnvio.direccion2}, C.P: {direccionEnvio.codigoPostal}, {direccionEnvio.provincia}, {direccionEnvio.localidad}, {direccionEnvio.pais}</TableCell>
                <TableCell >{metodoDePago && metodoDePago.numero? parseCardNumber(metodoDePago.numero) : ''}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionSummary>
        <AccordionDetails>
          <h5  align= "center" style={{fontSize: '15px', fontWeight: 'bold', minWidth: '20%'}}> Productos Adquiridos</h5>
          <br/>
          <Table maxWidth="md" size="lg" style={{minWidth: '75%'}}>
            <TableHead>
              <TableRow className={classes.whiteBlend}>
                <TableCell className={classes.whiteBlend}><b>Id Producto</b></TableCell>
                <TableCell className={classes.whiteBlend}><b>Nombre del Producto</b></TableCell>
                <TableCell className={classes.whiteBlend}><b>Descripcion</b></TableCell>
                <TableCell className={classes.whiteBlend}><b>Categoria</b></TableCell>
                <TableCell className={classes.whiteBlend}><b>Cantidad</b></TableCell>
                <TableCell className={classes.whiteBlend}><b>Precio Unitario</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.whiteBlend}>
              {productos.map((row) => (
                <TableRow key={row.id} className={classes.whiteBlend}>
                  <TableCell className={classes.whiteBlend}>{row.itemId}</TableCell>
                  <TableCell className={classes.whiteBlend}>{row.nombre}</TableCell>
                  <TableCell className={classes.whiteBlend}>{row.descripcion}</TableCell>
                  <TableCell className={classes.whiteBlend}>{categoryIdToName(row.idCategoria)}</TableCell>
                  <TableCell className={classes.whiteBlend}>{row.cantidad}</TableCell>
                  <TableCell className={classes.whiteBlend}>${row.precioU}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>}
    </div>
  );
}


const UserProfile = ({user,setUser,setCarrito}) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(1);

  return (
    <div className="profileContainer">
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile style={{marginTop:'25%'}}>
            <CardAvatar profile>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img src="data:image/png;base64,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" alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{user && user.isAdmin ? "Administrador": "Cliente"}</h6>
              <h4 className={classes.cardTitle}>{user? user.nombre + " " + user.apellido : "Not logged in"}</h4>
              <p className={classes.description}>
                Dirección de correo electrónico: {user? user.username : "-"}
              </p>
              <Button color="primary" round style={{backgroundColor:'pink', color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(1)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                Perfil
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(2)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Dirección de Envío
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(3)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Método de Pago
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(4)}> 
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Mis compras
                </Link>
              </Button>
              <br/>
            </CardBody>
          </Card>
        </GridItem>
        {display===1?<EditProfile usuario={user} setUsuario={(value) => setUser(value)}/>:<></>}
        {display===2?<DireccionEnvio usuario={user}/>:<></>}
        {display===3?<MetodoDePago usuario={user}/>:<></>}
        {display===4?<MisCompras usuario={user}/>:<></>}
      </GridContainer>
    </div>
  );
}

export default UserProfile;