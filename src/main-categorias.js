import Button from 'react-bootstrap/Button'
import './main-categorias.css'

export default function CategoryBar(){
    return (
        <div>
            <Button variant="dark" size="lg" className="categorybutton">Tenis</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">Futbol</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">Hockey</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">Rugby</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">Voley</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton">Gym</Button>{' '}
            <Button variant="dark" size="lg" className="categorybutton salebutton">Sale</Button>{' '}
        </div>
    );
}