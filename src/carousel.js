import './carousel.css';
import Carousel from 'react-bootstrap/Carousel'

export default function HomeCarousel() {
    return(
        <div className="container">
            <div className="row justify-content-center">
                <Carousel>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block w-100"
                                src="https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_1280.jpg"
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
                                className="d-block w-100"
                                src="https://cdn.pixabay.com/photo/2015/07/02/10/23/training-828741_1280.jpg"
                                alt="First slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img
                                className="d-block w-100"
                                src="https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg"
                                alt="Third slide"
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> 
            </div>
        </div>
    );
}