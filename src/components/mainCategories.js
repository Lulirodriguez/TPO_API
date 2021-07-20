import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    "Access-Control-Allow-Origin": '*',
    // "Access-Control-Allow-Methods": GET,POST,PUT,DELETE,
  }
}); 

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
        paddingLeft:'10px',
        paddingRight:'5px',
        paddingTop:'5px',
        paddingBottom:'5px',
        fontWeight: '500',
        fontSize:'20px',
        fontFamily: 'Cantarell',


    },
    saleButton: {
        color: 'red',
        paddingLeft:'10px',
        paddingRight:'5px',
        paddingTop:'5px',
        paddingBottom:'5px',
        fontWeight: '500',
        fontSize:'20px',
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

// 


export default function CategoryBar(){
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    
    useEffect(()=> {
        getCategories();
        console.log(categories);
    },[]);

    const getCategories = async () => {
        let categoryData = await api.get("/categorias");
        setCategories(categoryData.data);
    }

    return (
        <div className={classes.root}>
            {categories && categories.map(cat => (
                <Link key={cat.idCategoria} to={`/category/${cat.idCategoria}`} style={{ textDecoration: 'none' }}>
                    <Button size="large" className={classes.margin} > 
                    {cat.nombre}</Button>{' '}
                </Link>
            ))}
            {/* <Link key={0} to={`/category/sale`} style={{ textDecoration: 'none' }}>
                <Button size="large" className={classes.saleButton} >SALE</Button>{' '}
            </Link> */}
        </div>
    );
}

// const categories = [
    //     {
    //         'id': 1,
    //         'name': 'TENIS',
    //         'path': '/category/tenis',
    //     },
    //     {
    //         'id': 2,
    //         'name': 'FUTBOL',
    //         'path': '/category/futbol',
    //     },
    //     {
    //         'id': 3,
    //         'name': 'HOCKEY',
    //         'path': '/category/hockey',
    //     },
    //     {
    //         'id': 4,
    //         'name': 'RUGBY',
    //         'path': '/category/rugby',
    //     },
    //     {
    //         'id': 5,
    //         'name': 'VOLEY',
    //         'path': '/category/voley',
    //     },
    //     {
    //         'id': 6,
    //         'name': 'GOLF',
    //         'path': '/category/golf',
    //     },
    //     {
    //         'id': 7,
    //         'name': 'GYM',
    //         'path': '/category/gym',
    //     },
    // ];