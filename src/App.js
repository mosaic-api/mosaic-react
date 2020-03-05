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
// import TopDrawer from './TopDrawer.js';
import { getRandomColor } from './mosaic-api.js';
import PrivateRoute from './PrivateRoute.js'



export default class App extends Component {
  state = { 
    startColor: "#0047AB",
    user: null,
    bgColor: null
}

componentDidMount = async() => {
    const colorData = await getRandomColor();
    const rgbaString = `rgba(${colorData.body.rgb.r}, ${colorData.body.rgb.g}, ${colorData.body.rgb.b}, 0.3)`
    this.setState({
        startColor: colorData.body.hex.value, 
        colorName: colorData.body.name.value,
        bgColor: rgbaString
    })
    
}
handleColorSwitch = async() => {
    const colorData = await getRandomColor();
    const rgbaString = `rgba(${colorData.body.rgb.r}, ${colorData.body.rgb.g}, ${colorData.body.rgb.b}, 0.3)`
    this.setState({
      startColor: colorData.body.hex.value, 
      colorName: colorData.body.name.value,
      bgColor: rgbaString
    })
}
setUser = (user) => {
  this.setState({user: user})

}
  
  render() {
    return (
      <div id="App">
        <BrowserRouter>
          {/* <TopDrawer></TopDrawer> */}
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>} />

            <Route exact path="/gameboard/:id?" render={() => <GameBoard colorName={this.state.colorName} startColor={ this.state.startColor } bgColor={this.state.bgColor} user={this.state.user} />} />
            {/* <PrivateRoute exact path="/gameboard/:id?" component={GameBoard} colorName={this.state.colorName} startColor={ this.state.startColor} user={this.state.user} /> */}

            <PrivateRoute exact path="/userboards" component={UserBoards} user={this.state.user} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/" render={(props) => <Landing {...props} user={this.state.user} startColor={ this.state.startColor } handleColorSwitch={this.handleColorSwitch} />} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}