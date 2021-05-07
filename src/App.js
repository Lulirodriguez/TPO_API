// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import productFile from './jsonFiles/products.json';
import transactionsFile from './jsonFiles/transactions.json';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useState} from 'react';

import HomePage from './components/HomePage.js';
import TopBar from './components/topBar';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import Category from './components/category.js';
import Cart from './components/cart.js';
import Checkout from './components/checkout.js';
import Admin from './components/admin.js';
import StickyFooter from './components/footer.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [transactions, setTransactions] = useState(transactionsFile);

  return (
    <div className="App">
      <Router>
        <Switch />
          <TopBar isLoggedIn={isLoggedIn} setIsLoggedIn={(value) => setIsLoggedIn(value)}/>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/sign-up" exact component={() => <SignUp />} />
          <Route path="/sign-in" exact component={() => <SignIn setIsLoggedIn={(value) => setIsLoggedIn(value)}/>} />
          <Route path="/category/:category" exact component={() => <Category carrito={carrito} setCarrito={(value) => setCarrito(value)} items={productFile}/>} />
          <Route path="/cart" exact component={() => <Cart carrito={carrito}/>} />
          <Route path="/checkout" exact component={() => <Checkout carrito={carrito} shippingData={shippingData} setShippingData={(value) => setShippingData(value)} paymentData={paymentData} setPaymentData={(value) => setPaymentData(value)} transactions={transactions} setTransactions={(value) => setTransactions(value)}/>} />
          <Route path="/admin" exact component={() => <Admin products={productFile} transactions={transactions} />} />
          <StickyFooter />
      </Router>
    </div>
  );
}

export default App;
