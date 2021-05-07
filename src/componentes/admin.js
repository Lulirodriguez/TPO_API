import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  darkBlend: {
      backgroundColor: 'black',
      color: 'white',
  },
  end: {
      paddingBottom: '50px',
  }
}));

function Orders({transactions}) {
  const classes = useStyles();
  return (
    <React.Fragment >
      <h3 className={classes.darkBlend}>Recent Orders</h3>
      <Table maxWidth="lg" size="small">
        <TableHead>
          <TableRow className={classes.darkBlend}>
            <TableCell className={classes.darkBlend}>Date</TableCell>
            <TableCell className={classes.darkBlend}>Name</TableCell>
            <TableCell className={classes.darkBlend}>Ship To</TableCell>
            <TableCell className={classes.darkBlend}>Payment Method</TableCell>
            <TableCell className={classes.darkBlend} align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.darkBlend}>
          {rows.map((row) => (
            <TableRow key={row.id} className={classes.darkBlend}>
              <TableCell className={classes.darkBlend}>{row.date}</TableCell>
              <TableCell className={classes.darkBlend}>{row.name}</TableCell>
              <TableCell className={classes.darkBlend}>{row.shipTo}</TableCell>
              <TableCell className={classes.darkBlend}>{row.paymentMethod}</TableCell>
              <TableCell className={classes.darkBlend} align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const useStyles2 = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    darkBlend: {
        backgroundColor: 'black',
        color: 'white',
    },
    end: {
        paddingBottom: '50px',
    }
  }));

function Products({products}) {
    const classes = useStyles2();

    const agregarProducto = () => {

    }

    const editarProducto = (row) => {

    }

    const eliminarProducto = (row) => {

    }


    return (
      <React.Fragment >
        <h1 className={classes.darkBlend}>USUARIO ADMINISTRADOR</h1>
        <h3 className={classes.darkBlend}>Products</h3>
        <Table maxWidth="lg" size="small">
            <TableHead>
                <TableRow className={classes.darkBlend}>
                    <TableCell className={classes.darkBlend} align="center">
                    <Button variant="contained" onClick={() => agregarProducto()} className={classes.button}>
                        Agregar Producto
                    </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>

        <Table maxWidth="lg" size="small">
          <TableHead>
            <TableRow className={classes.darkBlend}>
              <TableCell className={classes.darkBlend}>Id</TableCell>
              <TableCell className={classes.darkBlend}>Name</TableCell>
              <TableCell className={classes.darkBlend}>Description</TableCell>
              <TableCell className={classes.darkBlend}>Price</TableCell>
              <TableCell className={classes.darkBlend} align="right">
                </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.darkBlend}>
            {products.map((row) => (
              <TableRow key={row.id} className={classes.darkBlend}>
                <TableCell className={classes.darkBlend}>{row.item.id}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.nombre}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.descripcion}</TableCell>
                <TableCell className={classes.darkBlend}>{row.item.precio}</TableCell>
                <TableCell className={classes.darkBlend}> </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                  <Button variant="contained" onClick={() => editarProducto(row)} className={classes.button}>
                      Editar Producto
                  </Button>
                </TableCell>
                <TableCell className={classes.darkBlend} align="right">
                  <Button variant="contained" onClick={() => eliminarProducto(row)} className={classes.button}>
                      Eliminar Producto
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.end}></div>
      </React.Fragment>
    );
  }


const Admin = ({products,transactions}) => {
    return(
        <>
            <Products products={products}/>
            <Orders orders={transactions}/>
        </>
    );
}

export default Admin;