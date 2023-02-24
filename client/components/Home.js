import React from 'react';
import { connect } from 'react-redux';
import Nnlists from './Nnlists';
import SingleNn from './SingleNn';
import AddNn from './AddNn';
import Account from './Account';
import { Link, Switch, Route } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  const name = auth.username.charAt(0).toUpperCase() + auth.username.slice(1);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <h3>Welcome, {name}</h3>
        <h4>
          Your Nice Point : {'😀'.repeat(auth.nicePoint)}({auth.nicePoint})
        </h4>
        <Link to="/home/addlist">
          <Button variant="contained" endIcon={<PostAddIcon />}>
            New Post
          </Button>
        </Link>
      </Box>
      <Switch>
        <Route exact path="/home" component={Nnlists} />
        <Route path="/home/account" component={Account} />
        <Route path="/home/nnlists/:id" component={SingleNn} />
        <Route path="/home/addlist" component={AddNn} />
      </Switch>
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect((state) => state)(Home);
