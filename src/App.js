import React, { Component } from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch } from 'react-router-dom';
import './App.css';
import Login from './Login.js';
import GameBoard from './GameBoard.js';
import UserBoards from './UserBoards.js';
import AboutUs from './AboutUs.js';
import Landing from './Landing.js';
import TopDrawer from './TopDrawer.js';

export default class App extends Component {

  
  render() {
    return (
      <div>
        <BrowserRouter>
          <TopDrawer></TopDrawer>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/gameboard" component={GameBoard} />
            <Route exact path="/userboards" component={UserBoards} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}