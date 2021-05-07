import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm({nameOnCard,setNameOnCard,cardNumber,setCardNumber,expDate,setExpDate,cvv,setCvv}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" value={expDate}
            onChange={(e) => setExpDate(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
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