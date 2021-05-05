import Button from 'react-bootstrap/Button'
import './main-categorias.css'

export default function CategoryBar(){
    return (
        <div>
            <Button variant="dark" size="lg" className="categorybutton">TENIS</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">FUTBOL</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">HOCKEY</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">RUGBY</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">VOLEY</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">GOLF</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">GYM</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton salebutton">SALE</Button>{' '}
        </div>
    );
}