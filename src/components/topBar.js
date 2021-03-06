import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

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
  nameDisplay: {
    fontSize: '15px',
    color: 'black',
  }
}));

export default function TopBar({isLoggedIn,setIsLoggedIn,user,setUser,isAdmin,setIsAdmin,cart,setCart,setReadyToPay}) {
  const classes = useStyles();
  // const { admin } = useContext(Login);
  // const [isAdmin, setIsAdmin] = admin;

  const [color, setColor] = useState('#ffffff') //'#f50057';

  useEffect(()=> {
    if(cart && cart.length!==0){
      setColor('#f50057');
    }
    else{
      setColor('#ffffff');
    }
  },[cart]);

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
    setUser(null);
    setIsAdmin(false);
    setCart([]);
    setReadyToPay(false);
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
          <Tooltip  placement="left" title={user!=null? `${user.nombre} ${user.apellido}`:''}>
            <Link to='/profile' style={{ textDecoration: 'none', color: '#da3770' }}>
              <MenuItem onClick={handleMenuClose}>Ver Perfil </MenuItem>
            </Link>
          </Tooltip>
          {isAdmin ? (
          <Link to='/admin' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>Administrador</MenuItem>
          </Link>
          ) : (<></>)}
          <Link to='/' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem style={{ textDecoration: 'none', color: '#da3770'}} onClick={() => handleLogOut()}>Cerrar Sesi??n</MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/sign-in' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>Iniciar sesi??n / Crear una cuenta</MenuItem>
          </Link>
        </div>
      )}
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
        <Link to='/cart' style={{ textDecoration: 'none', color: color}}>
          <IconButton aria-label="cart"
            aria-controls="cart"
            aria-haspopup="true" 
            className={classes.color}>
              <ShoppingCartIcon />
              {/*cart && cart.length!=0 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon /> */}
            </IconButton>
        </Link>
      </MenuItem>
      {isLoggedIn ? (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to='/profile' style={{ textDecoration: 'none'}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-account-menu"
                aria-haspopup="true"
                className={classes.color}
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </MenuItem>
          {isAdmin ? (
            <Link to='/admin' style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleMenuClose}>
              <IconButton
                      aria-label="admin panel"
                      aria-controls="admin-panel"
                      aria-haspopup="true"
                      className={classes.color}

                    >
                  <SupervisorAccountRoundedIcon />
                </IconButton>
              </MenuItem>
            </Link>
            ) : (<></>)}
          <Link to='/' style={{ textDecoration: 'none'}}>
            <MenuItem style={{ textDecoration: 'none', color: '#000000'}} onClick={() => handleLogOut()}>
              <IconButton
                aria-label="log out"
                aria-controls="log-out"
                aria-haspopup="true"
                className={classes.color}
              >
                <ExitToAppRoundedIcon/>
              </IconButton>
            </MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/sign-in' style={{ textDecoration: 'none', color: '#da3770' }}>
            <MenuItem onClick={handleMenuClose}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-account-menu"
                aria-haspopup="true"
                className={classes.color}
              >
                <AccountCircle />
              </IconButton>
            </MenuItem>
          </Link>
        </div>
      )}
      
      
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
          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

          <Link to= '/cart' style={{color: color}}>
            <IconButton aria-label="cart" style={{color: color}}>
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
      {/* {user!=null && <Typography className={classes.nameDisplay} variant="h9"> 
        ??Hola {user.nombre} {user.apellido}!
      </Typography>} */}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
