// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraSuperior from './barraSuperior';
import HomeCarousel from './carousel';
import CategoryBar from './main-categorias.js';

function App() {
  return (
    <div className="App">
      <BarraSuperior></BarraSuperior>
      <CategoryBar></CategoryBar>
      <HomeCarousel></HomeCarousel>
    </div>
  );
}

export default App;
