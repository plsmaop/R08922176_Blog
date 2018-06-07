import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../containers/navBar';
import Login from '../containers/login';
import Register from '../containers/register';
import ArticleList from '../containers/articleList';
import PageNotFound from './pageNotFound';

export default () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/" exact component={ArticleList} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/articleList" exact component={ArticleList} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
