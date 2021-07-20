// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import transactionsFile from './jsonFiles/transactions.json';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {useState} from 'react';

import HomePage from './components/HomePage.js';
import TopBar from './components/topBar';
import SignIn from './components/signIn.js';
import PasswordRecovery from './components/passwordRecovery';
import SignUp from './components/signUp.js';
import Category from './components/category.js';
import Cart from './components/cart.js';
import Checkout from './components/checkout.js';
import Admin from './components/admin.js';
import StickyFooter from './components/footer.js';
import UserProfile from './components/userProfile.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [readyToPay, setReadyToPay] = useState(false);
  const [shippingData, setShippingData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [transactions, setTransactions] = useState(transactionsFile);

  return (
    <div className="App">
      <div className="pageContainer">
      <Router >
        <Switch />
          <TopBar isLoggedIn={isLoggedIn} setIsLoggedIn={(value) => setIsLoggedIn(value)} user={currentUser} setUser={(value) => setCurrentUser(value)} isAdmin={isAdmin} setIsAdmin={(value)=> setIsAdmin(value)} cart={carrito} setCart={(value) => setCarrito(value)} setReadyToPay={(value) => setReadyToPay(value)} />
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/sign-up" exact component={() => <SignUp />} />
          <Route path="/passwordRecovery" exact component={() => <PasswordRecovery />} />
          <Route path="/sign-in" exact component={() => <SignIn setIsLoggedIn={(value) => setIsLoggedIn(value)} setIsAdmin={(value)=> setIsAdmin(value)} setCurrentUser={(value)=> setCurrentUser(value)} readyToPay={readyToPay} />} />
          <Route path="/category/:categoryId" exact>
            <Category carrito={carrito} setCarrito={(value) => setCarrito(value)} />
          </Route>
          <Route path="/cart" exact component={() => <Cart carrito={carrito} setCarrito={(value)=>setCarrito(value)} isLoggedIn={isLoggedIn} setReadyToPay={setReadyToPay} />} />
          <Route path="/checkout" exact component={() => <Checkout carrito={carrito} shippingData={shippingData} setShippingData={(value) => setShippingData(value)} paymentData={paymentData} setPaymentData={(value) => setPaymentData(value)} transactions={transactions} setTransactions={(value) => setTransactions(value)}/>} />
          <Route path="/admin" exact component={() => <Admin transactions={transactions} />} />
          <Route path="/profile" component={() => <UserProfile user={currentUser} />} />
      </Router>
      </div>
      <StickyFooter />
    </div>
  );
}

export default App;
