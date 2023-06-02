import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { meAgain } from '../store';
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
const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(meAgain(auth.id));
  }, []);

  const name = auth.username.charAt(0).toUpperCase() + auth.username.slice(1);
  let showingPoint = auth.nicePoint;
  if (auth.nicePoint > 10) {
    showingPoint = 10;
  }
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
          Your Nice Point : {'😀'.repeat(showingPoint)}({auth.nicePoint})
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

export default Home;
