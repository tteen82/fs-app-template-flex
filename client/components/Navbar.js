import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Typography variant="h1" component="div" sx={{}}>
      inSantagram
    </Typography>
    <Typography variant="h6" component="div" sx={{ marginLeft: '20px' }}>
      RU Nice or Naughty?
    </Typography>
    <nav>
      {isLoggedIn ? (
        <Toolbar sx={{ backgroundColor: '#A3E4D7' }}>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'white' }}
            >
              Home
            </Typography>
          </Link>
          <Link to="/home/account">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'white' }}
            >
              Account
            </Typography>
          </Link>
          <a href="#" onClick={handleClick}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'white' }}
            >
              Logout
            </Typography>
          </a>
        </Toolbar>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Toolbar sx={{ backgroundColor: '#A3E4D7' }}>
            <Link to="/login">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: 'white' }}
              >
                Login
              </Typography>
            </Link>
            <Link to="/signup">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: 'white' }}
              >
                Sign Up
              </Typography>
            </Link>
          </Toolbar>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
