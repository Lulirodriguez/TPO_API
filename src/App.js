// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraSuperior from './barraSuperior';
import HomeCarousel from './carousel';

function App() {
  return (
    <div className="App">
      <BarraSuperior></BarraSuperior>
      <HomeCarousel></HomeCarousel>
    </div>
  );
}

export default App;
