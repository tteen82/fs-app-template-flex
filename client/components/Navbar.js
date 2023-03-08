import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Box sx={{ padding: '1rem' }}>
      <Typography
        variant="h1"
        component="div"
        sx={{ fontSize: '4rem', margin: 'auto' }}
      >
        inSantagram
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ marginLeft: '20px', fontSize: '1rem' }}
      >
        RU Nice or Naughty?
      </Typography>
    </Box>
    <nav style={{ width: '100%' }}>
      {isLoggedIn ? (
        <Toolbar
          sx={{
            backgroundColor: '#A3E4D7',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
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
          <Toolbar
            sx={{
              backgroundColor: '#A3E4D7',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
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
