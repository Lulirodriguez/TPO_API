import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm({nameOnCard,setNameOnCard,cardNumber,setCardNumber,expDate,setExpDate,cvv,setCvv,setError}) {

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
    return validarCaracteres(nameOnCard) && validarNumeros(cardNumber) && validarNumeros(cvv) && validarFormatoFecha(expDate);
  }

  function validarFormatoFecha(value) {
    var RegExPattern = /^\d{1,2}\/\d{2}$/;
    if ((value.match(RegExPattern)) && (value!='')) {
          return true;
    } else {
          return false;
    }
  }

  const validarNumeros = (value) => {
    let valoresAceptados = /^[0-9 ]+$/;
    if ( value.match(valoresAceptados) && (value!='')){
      return true;
    }else {
      return false;
    }
  }

  const validarCaracteres = (value) => {
    let posibles = /^[a-zA-Z_ ]*$/i;
    if ((value.match(posibles)) && (value!='')) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nombre (como figura en la tarjeta)" fullWidth autoComplete="cc-name" value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Numero de la tarjeta"
            fullWidth
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Fecha de vencimiento" fullWidth autoComplete="cc-exp" value={expDate}
            onChange={(e) => setExpDate(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="Código de seguridad"
            helperText="3 o 4 digitos (atras de la tarjeta al lado de la firma o arriba al lado del numero)"
            fullWidth
            autoComplete="cc-csc"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}