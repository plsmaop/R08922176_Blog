import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/login';
import Register from '../containers/register';
import ArticleList from '../containers/articleList';
import PageNotFound from './pageNotFound';
import Article from '../containers/article';
import Editor from '../containers/editor';

const Router = () => (
  <Switch>
    <Route path="/" exact component={ArticleList} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/articleList" exact component={ArticleList} />
    <Route path="/editor" exact component={Editor} />
    <Route path="/article/:id" exact component={Article} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Router;
