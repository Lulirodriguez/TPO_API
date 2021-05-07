// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useState} from 'react';

import HomePage from './componentes/HomePage.js';
import BarraSuperior from './componentes/barraSuperior';
import SignIn from './componentes/signIn.js';
import SignUp from './componentes/signUp.js';
import Category from './componentes/category.js';
import Cart from './componentes/cart.js';
import Checkout from './componentes/checkout.js';
import Admin from './componentes/admin.js';
import StickyFooter from './componentes/footer.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const products = [
    {'item': ({
        'id' : 1,
        'nombre': 'Raqueta',
        'descripcion': 'Principal herramienta de juego',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 2000,
    })},
    {'item': ({
        'id' : 2,
        'nombre': 'Tubo de Pelotas Tenis Slazenger',
        'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 1050,
    })},
    {'item': ({
        'id' : 3,
        'nombre': 'Encordado de Raqueta',
        'descripcion': 'Encordados de la mejor calidad',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 470,
    })},
    {'item': ({
        'id' : 4,
        'nombre': 'Anti vibrador de raqueta',
        'descripcion': 'Atenua la vibracion de las cuerdas',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 200,
    })},
    {'item': ({
        'id' : 5,
        'nombre': 'Grip',
        'descripcion': 'Recubrimiento firme del mango. Agarre solido.',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 400,
    })},
    {'item': ({
        'id' : 6,
        'nombre': 'Funda de Raqueta',
        'descripcion': 'Impermeable. Mayor proteccion',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 1200,
    })},
    {'item': ({
        'id' : 7,
        'nombre': 'Grip Holder',
        'descripcion': 'Extensibilidad relativa',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 600,
    })},
    {'item': ({
        'id' : 8,
        'nombre': 'Tubo de Pelotas Tenis Prince',
        'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 800,
    })},
    {'item': ({
        'id' : 9,
        'nombre': 'Tubo de Pelotas Tenis Wilson',
        'descripcion': 'Alta calidad de rebote, camaras de aire reforzadas.',
        'imagen': 'https://source.unsplash.com/random',
        'precio': 900,
    })},
];
  // const checkoutProps = {
  //   'carrito': `${carrito}`,
  //   'shippingData': `${shippingData}`, 
  //   'setShippingData': setShippingData,
  //   'paymentData': `${paymentData}`,
  //   'setPaymentData': setPaymentData,
  //   'transactions': `${transactions}`,
  //   'setTransactions': setTransactions,
  // }

  return (
    <div className="App">
      <Router>
        <Switch />
          <BarraSuperior isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/sign-up" exact component={() => <SignUp />} />
          <Route path="/sign-in" exact component={() => <SignIn setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/category/:category" exact component={() => <Category carrito={carrito} setCarrito={setCarrito} items={products}/>} />
          <Route path="/cart" exact component={() => <Cart carrito={carrito}/>} />
          <Route path="/checkout" exact component={() => <Checkout carrito={carrito} shippingData={shippingData} setShippingData={setShippingData} paymentData={paymentData} setPaymentData={setPaymentData} transactions={transactions} setTransactions={setTransactions}/>} />
          <Route path="/admin" exact component={() => <Admin products={products} transactions={transactions} />} />
          <StickyFooter />
      </Router>
    </div>
  );
}

export default App;
