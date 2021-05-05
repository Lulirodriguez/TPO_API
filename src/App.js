// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import BarraSuperior from './barraSuperior';
import HomeCarousel from './carousel';
import CategoryBar from './main-categorias.js';
import StickyFooter from './footer.js';
import TenisPage from './tenis.js';

function App() {
  return (
    <div className="App">
      <BarraSuperior />
      <CategoryBar />
      <HomeCarousel />
      <StickyFooter />
    </div>
  );
}

export default App;
