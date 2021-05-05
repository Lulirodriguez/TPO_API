import './carousel.css';
import Carousel from 'react-bootstrap/Carousel'

import img1 from './img1.webp';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img 5.jpg';
import img6 from './img6.webp';


export default function HomeCarousel() {
    return(
        <div className="container">
            <div className="row justify-content-center">
                <Carousel>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block carousel-image"
                                src={img1}
                                alt="First slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Top Level Fitness Gear</h3>
                            <p>Train with our gear, be a Winner</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block carousel-image"
                                src = {img3}
                                alt="Third slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block carousel-image"
                                src={img4}
                                alt="Fourth slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Toao aoao ao </h3>
                            <p>sgmmaemAEtr</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block carousel-image"
                                src={img6}
                                alt="Fifth slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>hola mundo</h3>
                            <p>esta es la quinta diapo</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block carousel-image"
                                src={img5}
                                alt="Fifth slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>hola gente</h3>
                            <p>esta es la sexta diapo</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> 
            </div>
        </div>
    );
}