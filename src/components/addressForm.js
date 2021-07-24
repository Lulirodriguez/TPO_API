import React , {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AddressForm({firstName,setFirstName,lastName,setLastName,address1,setAddress1,address2,setAddress2,city,setCity,state,setState,zipCode,setZipCode,country,setCountry,setError}) {

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
  },[firstName,lastName,address1,address2,city,state,zipCode,country]);

  const validarCampos = () => {
    return validarCaracteres(firstName) &&
    validarCaracteres(lastName) &&
    validarCaracteresYNumeros(address1) &&
    validarCaracteres(city) &&
    validarCaracteres(state) &&
    validarCaracteres(country) &&
    validarNumeros(zipCode);
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
    let posibles = /^[áéíóúa-zA-Z_'" ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  const validarCaracteresYNumeros = (value) => {
    let posibles = /^[áéíóúa-zA-Z0-9_'". ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dirección de envío
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre/s"
            fullWidth
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido/s"
            fullWidth
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Dirección (linea 1)"
            fullWidth
            autoComplete="shipping address-line1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Dirección (linea 2)"
            fullWidth
            autoComplete="shipping address-line2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Localidad"
            fullWidth
            autoComplete="shipping address-level2"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="Provincia" fullWidth value={city}
            onChange={(e) => setCity(e.target.value)}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Código postal"
            fullWidth
            autoComplete="shipping postal-code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="País"
            fullWidth
            autoComplete="shipping country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}