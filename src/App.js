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
import StickyFooter from './componentes/footer.js';

function App() {
  //const isLoggedIn

  return (
    <div className="App">
      <Router>
        <Switch />
          <BarraSuperior />
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/category/:category" exact component={Category} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />

          <StickyFooter />
      </Router>
    </div>
  );
}

export default App;
