import React from 'react';
import { connect } from 'react-redux';
import Nnlists from './Nnlists';
import SingleNn from './SingleNn';
import AddNn from './AddNn';
import { Link, Switch, Route } from 'react-router-dom';

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      <h4>
        Your Nice Point : {'😀'.repeat(auth.nicePoint)}({auth.nicePoint})
        <Link to="/home/addlist">Add Post</Link>
      </h4>
      <Switch>
        <Route exact path="/home" component={Nnlists} />
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
