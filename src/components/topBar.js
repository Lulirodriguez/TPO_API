import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import logo from '../images/mysportKit-logo.jpeg';
// import Login from './App.js';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  color: {
      color: 'white',
      backgroundColor: 'black', //#212121
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  image:{
    width: '188px',
    height: '29px',
  },
 
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function TopBar({isLoggedIn,setIsLoggedIn}) {
  const classes = useStyles();
  // const { admin } = useContext(Login);
  // const [isAdmin, setIsAdmin] = admin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!!isLoggedIn ? (
        <div>
          <Link to='/profile' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>Ver Perfil</MenuItem>
          </Link>
          <MenuItem style={{ textDecoration: 'none', color: '#da3770'}} onClick={() => handleLogOut()}>Cerrar Sesión</MenuItem>
        </div>
      ) : (
        <div>
          <Link to='/sign-in' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>Iniciar sesión / Crear una cuenta</MenuItem>
          </Link>
      {/* {isAdmin ? (
      <Link to='/admin' style={{ textDecoration: 'none', color: '#da3770' }}>
        <MenuItem onClick={handleMenuClose}>Administrador</MenuItem>
      </Link>
      ) : (<></>)*/}
        </div>
      )} }
      
    </Menu>
  );

  const mobileMenuId = 'primary-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <Link to='/cart' style={{ textDecoration: 'none', color: '#da3770'}}>
          <IconButton aria-label="show 4 items in cart"
            aria-controls="primary-account-menu"
            aria-haspopup="true" 
            className={classes.color}>
                <ShoppingCartIcon />
            </IconButton>
            {/* <p>Carrito</p> */}
        </Link>
      </MenuItem>
      {isLoggedIn ? (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to='/profile' style={{ textDecoration: 'none', color: '#da3770'}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-account-menu"
                aria-haspopup="true"
                className={classes.color}

              >
                <AccountCircle />
              </IconButton>
            </Link>
            {/* <p>Ver Perfil</p> */}
          </MenuItem>
          <MenuItem style={{ textDecoration: 'none', color: '#da3770'}} onClick={() => handleLogOut()}>Cerrar Sesión</MenuItem>
          
        </div>
      ) : (
        <div>
          <Link to='/sign-in' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>Iniciar sesión / Crear una cuenta</MenuItem>
          </Link>
        </div>
      )}
      {/* {isAdmin ? (
      <Link to='/admin' style={{ textDecoration: 'none', color: '#da3770' }}>
        <MenuItem onClick={handleMenuClose}>Administrador</MenuItem>
      </Link>
      ) : (<></>)} */}
      
    </Menu>
  );
  // const logo = require('./mysportKit-logo.jpeg');

  return (
    <div className={classes.grow}>
      <AppBar className={classes.color} position="static">
        <Toolbar>
          <Link to="/" >
            <img alt="" src={logo} className={classes.image} />
          </Link>
          {/* <Typography className={classes.title} variant="h6" noWrap> 
            MYSPORT KIT
          </Typography>  */}
          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                <NotificationsIcon />
              
            </IconButton> */}
              <Link to= '/cart'>
                <IconButton aria-label="show 4 items in the cart" className={classes.color}>
                    <ShoppingCartIcon />
                </IconButton>
              </Link>
            <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
          
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
