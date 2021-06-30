import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import CustomInput from "./CustomInput/CustomInput.js";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardAvatar from "./Card/CardAvatar.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import avatar from "../images/marc.jpg";
import transactionsFile from '../jsonFiles/transactions.json';

import './userProfile.css';

const styles = {
  cardCategoryWhite: {
    color: "#000000",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const EditProfile = ({user}) => {
  const classes = useStyles();

  return(
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink'}}>
            <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
            <p className={classes.cardCategoryWhite}>Complete su perfil</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}>
                    {user ? user.email : ''}
                </CustomInput>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre"
                  id="nombre"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  >
                  {user ? user.firstName : ''}
                </CustomInput>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Apellido"
                  id="last-name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  >
                  {user ? user.lastName : ''}
                </CustomInput>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}}>Actualizar Perfil</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const DireccionEnvio = () => {
  const classes = useStyles();
  return (
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'black'}}>
            <h4 className={classes.cardTitleWhite}>Dirección de Envío</h4>
            <p className={classes.cardCategoryWhite}>Cambiar preferencias de envío</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Direccion 1"
                  id="direx1"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Direccion 2"
                  id="direx2"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Localidad"
                  id="localidad"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Provincia"
                  id="provincia"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Codigo Postal"
                  id="postalCode"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="País"
                  id="pais"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}}>Actualizar Detalles de Envío</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const MetodoDePago = () => {
  const classes = useStyles();
  return (
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'black'}}>
            <h4 className={classes.cardTitleWhite}>Método de Pago</h4>
            <p className={classes.cardCategoryWhite}>Cambiar preferencias de pago</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre en la Targeta"
                  id="cardName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Numero de la Tarjeta"
                  id="cardNumber"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Fecha Vencimiento"
                  id="expiredDate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Código de Seguridad"
                  id="securityCode"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
            <Button style={{backgroundColor:'pink', color: 'black'}}>Actualizar Método de Pago</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
}

const MisCompras = ({transactions}) => {
  const classes = useStyles();
  return(
    <div style={{marginTop: '8%', minWidth:'60%', maxWidth:'60%'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader style={{backgroundColor:'pink', color: 'pink'}}>
            <h4 className={classes.cardTitleWhite}>Mis Compras</h4>
            <p className={classes.cardCategoryWhite}>Visualización de transacciones</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <Table maxWidth="lg" size="small">
                <TableHead>
                  <TableRow >
                    <TableCell >Producto</TableCell>
                    <TableCell >Cantidad</TableCell>
                    <TableCell >Precio</TableCell>
                    <TableCell >Destinatario</TableCell>
                    <TableCell >Dirección de entrega</TableCell>
                    <TableCell >Numero de Tarjeta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {transactions.map((row) => (
                    <TableRow key={row.id} >
                      <TableCell >{row.compra.item.nombre}</TableCell>
                      <TableCell >{row.compra.item.cantidad}</TableCell>
                      <TableCell >{row.compra.item.precio}</TableCell>
                      <TableCell >{row.shippment.firstName} {row.shippment.lastName}</TableCell>
                      <TableCell >{row.shippment.address1} {row.shippment.address2}, C.P: {row.shippment.zipCode}, {row.shippment.city} {row.shippment.state}, {row.shippment.country}</TableCell>
                      <TableCell >{row.payment.cardNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GridContainer>
            </CardBody>
          <CardFooter style={{margin:'auto', padding:'2%'}}>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );  
}


export default function UserProfile({user}) {
  const classes = useStyles();
  const [display, setDisplay] = useState(1);

  return (
    <div className="profileContainer">
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile style={{marginTop:'25%'}}>
            <CardAvatar profile>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img src="data:image/png;base64,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" alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{user && user.isAdmin ? "Administrador": "Cliente"}</h6>
              <h4 className={classes.cardTitle}>{user? user.firstName + user.lastName : "Not logged in"}</h4>
              <p className={classes.description}>
                Dirección de correo electrónico: {user? user.email : "-"}
              </p>
              <Button color="primary" round style={{backgroundColor:'pink', color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(1)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                Perfil
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(2)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Dirección de Envío
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(3)}>
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Método de Pago
                </Link>
              </Button>
              <br/>
              <Button color="primary" round style={{backgroundColor:'pink',  color: 'black', minWidth:'35%'}} onClick={(e) => setDisplay(4)}> 
                <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                  Mis compras
                </Link>
              </Button>
              <br/>
            </CardBody>
          </Card>
        </GridItem>
        {display===1?<EditProfile user={user}/>:<></>}
        {display===2?<DireccionEnvio user={user}/>:<></>}
        {display===3?<MetodoDePago user={user}/>:<></>}
        {display===4?<MisCompras transactions={transactionsFile}/>:<></>}
      </GridContainer>
    </div>
  );
}

