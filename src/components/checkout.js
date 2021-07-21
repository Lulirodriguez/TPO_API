import React, {useState, useEffect} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './addressForm.js';
import PaymentForm from './paymentForm.js';
import Review from './review.js';
import './checkout.css';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor:'pink',
    color: 'black',
  },
}));

const steps = ['Dirección de envío', 'Datos de pago', 'Revise su orden'];

export default function Checkout({carrito,user}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState(false);

  const [firstName, setFirstName] = useState(user.nombre);
  const [lastName, setLastName] = useState(user.apellido);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [firstAddressRes, setfirstAddressRes] = useState(null);
  const [firstPaymentRes, setfirstPaymentRes] = useState(null);

  const [newAddressId, setNewAddressId] = useState(0);
  const [newPaymentId, setNewPaymentId] = useState(0);

  const [numeroCompra, setNumeroCompra] = useState(0);

  useEffect(()=> {
    let idEnvio = getAddress();
    let idPago = getPayment();
    setNewAddressId(idEnvio);
    setNewPaymentId(idPago);
  },[]);

  const getAddress = async () => {
    try{
      let res = await api.get(`/direccionesDeEnvio/${user.id}`);
      console.log(res);
      let address = res.data;
      setfirstAddressRes(address);
      setAddress1(address.direccion1);
      setAddress2(address.direccion2);
      setCity(address.provincia);
      setState(address.localidad);
      setZipCode(address.codigoPostal);
      setCountry(address.pais);
      setError(false);
      return address.idDireccionEnvio;
    }catch(err){
      console.log(err);
    }
  }

  const getPayment = async () => {
    try{
      let res = await api.get(`/metodosDePago/${user.id}`);
      console.log(res);
      let payment = res.data;
      setfirstPaymentRes(payment);
      setNameOnCard(payment.nombre);
      setCardNumber(payment.numero);
      setExpDate(payment.vencimiento);
      setCvv(payment.codigo);
      setError(false);
      return payment.idMetodoPago;
    }catch(err){
      console.log(err);
    }
  }

  const updatePayment = async () => {
    let payment = {
      'idCliente': user.id,
      'nombre': nameOnCard,
      'numero': cardNumber,
      'codigo': cvv,
      'vencimiento': expDate,
    }
    try{
      if(firstPaymentRes == null){
        let res = await api.post(`/metodosDePago`,payment);
        if(res.status == 200){
          alert("Información de pago actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de pago");
        }
      }
      else{
        let res = await api.put(`/metodosDePago/${user.id}`,payment);
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


  const updateAddress = async () => {
    let address = {
      'idCliente': user.id,
      'direccion1': address1,
      'direccion2': address2,
      'provincia': city,
      'localidad': state,
      'codigoPostal': zipCode,
      'country': country,
    }
    try{
      if(firstAddressRes == null){
        let res = await api.post(`/direccionesDeEnvio`,address);
        if(res.status == 200){
          alert("Información de envio actualizada con éxito");
        }
        else{
          alert("Ocurrio un error al actualizar la informacion de envio");
        }
      }
      else{
        let res = await api.put(`/direccionesDeEnvio/${user.id}`,address);
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

  let counter = 0;

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm firstName={firstName} setFirstName={(value) => setFirstName(value)} lastName={lastName} setLastName={(value) => setLastName(value)} address1={address1} setAddress1={(value) => setAddress1(value)} address2={address2} setAddress2={(value) => setAddress2(value)} city={city} setCity={(value) =>  setCity(value)} state={state} setState={(value) => setState(value)} zipCode={zipCode} setZipCode={(value) => setZipCode(value)} country={country} setCountry={(value) => setCountry(value)} setError={(value) => setError(value)}/>;
      case 1:
        return <PaymentForm nameOnCard={nameOnCard} setNameOnCard={(value) => setNameOnCard(value)} cardNumber={cardNumber} setCardNumber={(value) => setCardNumber(value)} expDate={expDate} setExpDate={(value) => setExpDate(value)} cvv={cvv} setCvv={(value) => setCvv(value)} setError={(value) => setError(value)} />;
      case 2:
        return <Review carrito={carrito} firstName={firstName} lastName={lastName} address1={address1} address2={address2} cardNumber={cardNumber} nameOnCard={nameOnCard} expireDate={expDate}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const crearTransaccion = async () => {
    try{
      // generar una compra asociado al idUsuario
      let compra = {
        idUsuario: user.id
      }
      let res = await api.post("/compras",compra);
      let idCompra = res.data.idCompra;
      setNumeroCompra(idCompra);
      // por cada item del carrito: generar un itemXCompra
      for(let i=0;i<carrito.length;i++){
        let itemXCompra = {
          'idCompra': idCompra,
          'itemId': carrito[i].itemId,
          'cantidad': carrito[i].cantidad,
        }
        await api.post("/itemsXCompra",itemXCompra);
      }
      // crear la transaccion asociada a los ids de la forma de pago, la direccion de envio y el usuario
      let transacciones = {
        'idCliente': user.id,
        'idCompra': idCompra,
        'idDirecionEnvio': newAddressId,
        'idMetodoPago': newPaymentId,
      }
      await api.post("/transacciones",transacciones);
    }catch(err){
      alert("Error al crear la transferencia");
    }
  }

  const handleNext = () => {
    if(activeStep==0){
      updateAddress();
    }
    else if(activeStep==1){
      updatePayment();
    }
    else if(activeStep == steps.length - 1){
      crearTransaccion();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if(counter > 0){
      counter -= 1
    }
  };

  const finishCheckout = () => {

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {error? <Typography component="h1" variant="h5" align="center" style={{color: 'red', fontSize: '14px'}}>
            Complete los campos en el formato adecuado
          </Typography> : <></>}
          <Stepper activeStep ={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Muchas gracias por su compra.
                </Typography>
                <Typography variant="subtitle1">
                  {`¡La compra ha sido realizada con éxito! Su número de orden es el #${numeroCompra ? numeroCompra : '290984'}.`}
                </Typography>
                <RouteLink to="/" style={{ textDecoration: 'none' }} >
                  <Button variant="contained" className={classes.linkButton} color="secondary" onClick={() => finishCheckout()} className={classes.button}>
                    Volver a la página de inicio
                  </Button>
                </RouteLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {!error? (<Button
                    variant="contained"
                    onClick={handleNext}
                    color= "secondary"
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Comprar' : 'Next'}
                  </Button>) : (<Button
                    variant="contained"
                    color= "secondary"
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Comprar' : 'Next'}
                  </Button>)}
                  
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
       
      </main>
    </React.Fragment>
  );
}