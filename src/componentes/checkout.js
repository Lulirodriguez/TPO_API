import React, {useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './addressForm.js';
import PaymentForm from './paymentForm.js';
import Review from './review.js';
import { SaveAltOutlined } from '@material-ui/icons';

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
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review carrito={carrito} />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function Checkout({carrito, shippingData, setShippingData, paymentData, setPaymentData, transactions, setTransactions}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  let counter = 0;

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2} city={city} setCity={setCity} state={state} setState={setState} zipCode={zipCode} setZipCode={setZipCode} country={country} setCountry={setCountry}/>;
      case 1:
        return <PaymentForm nameOnCard={nameOnCard} setNameOnCard={setNameOnCard} cardNumber={cardNumber} setCardNumber={setCardNumber} expDate={expDate} setExpDate={setExpDate} cvv={cvv} setCvv={setCvv} />;
      case 2:
        return <Review carrito={carrito} firstName={firstName} lastName={lastName} address1={address1} address2={address2} cardNumber={cardNumber} nameOnCard={nameOnCard} expireDate={expDate}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const save = () => {
    setShippingData({
      'firstName': firstName,
      'lastName': lastName,
      'address1': address1,
      'address2': address2,
      'city': city,
      'state': state,
      'zipCode': zipCode,
      'country': country,
    });
    console.log(shippingData);
    setPaymentData({
      'nameOnCard': nameOnCard,
      'cardNumber': cardNumber,
      'expDate': expDate,
      'cvv': cvv,
    });
    console.log(paymentData);
    setTransactions([
      ...transactions,
      {
        'purchase': carrito,
        'shipping': shippingData,
        'payment': paymentData,
      }
    ]);
    console.log(transactions);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if(counter > 0){
      counter -= 1
    }
  };

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
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <RouteLink to="/" >
                  <Button variant="contained" onClick={() => save()} className={classes.button}>
                    Return to home page
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
       
      </main>
    </React.Fragment>
  );
}