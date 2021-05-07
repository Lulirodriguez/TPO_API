import './main-categorias.css'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'

export default function CategoryBar(){
    const categories = [
        {
            'id': 1,
            'name': 'TENIS',
            'path': '/category/tenis',
        },
        {
            'id': 2,
            'name': 'FUTBOL',
            'path': '/category/futbol',
        },
        {
            'id': 3,
            'name': 'HOCKEY',
            'path': '/category/hockey',
        },
        {
            'id': 4,
            'name': 'RUGBY',
            'path': '/category/rugby',
        },
        {
            'id': 5,
            'name': 'VOLEY',
            'path': '/category/voley',
        },
        {
            'id': 6,
            'name': 'GOLF',
            'path': '/category/golf',
        },
        {
            'id': 7,
            'name': 'GYM',
            'path': '/category/gym',
        },
    ];
    return (
        <div>
            {categories.map(cat => (
                <Link key={cat.id} to={cat.path} >
                    <Button variant="dark" size="lg" className="categorybutton">{cat.name}</Button>{' '}
                </Link>
            ))}
            <Link key={0} to={`/category/sale`} >
                <Button variant="dark" size="lg" className="categorybutton salebutton">SALE</Button>{' '}
            </Link>
        </div>
    );
}