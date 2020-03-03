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
import { getRandomColor } from './mosaic-api.js';


export default class App extends Component {
  state = { 
    startColor: "#FFF"
}

componentDidMount = async() => {
    const colorData = getRandomColor();
    this.setState({
        startColor: (await colorData).body.hex.value,
    })
    
}
handleColorSwitch = async() => {
    const colorData = getRandomColor();
    this.setState({startColor: (await colorData).body.hex.value})
}
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <TopDrawer></TopDrawer>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/gameboard" render={() => <GameBoard startColor={ this.state.startColor } />} />
            <Route exact path="/userboards" component={UserBoards} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/" render={() => <Landing startColor={ this.state.startColor } handleColorSwitch={this.handleColorSwitch} />} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}