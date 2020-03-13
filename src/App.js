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
import PrivateRoute from './PrivateRoute.js';
import { getInitGameState } from './helper.js';




export default class App extends Component {
  state = { 
    startColor: "#0047AB",
    colorName: null,
    user: null,
    bgColor: null,
    gameboard: getInitGameState(),
    schemeArray: [],
    mode: 'analogic-complement',
    id: null,
    playInt: null,
    musicboard: getInitGameState(),
    playbackMap: getInitGameState(),
    isMuted: false,
    isPlaying: false,
    playbackSpeed: 500,
    lastRandomNote: 0
}
setAppState = (object) => {
  this.setState(object)
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
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} bgColor={this.state.bgColor} setUser={this.setUser}/>} />

            <Route exact path="/gameboard/:id?" render={() => (<GameBoard 
            colorName={this.state.colorName} 
            startColor={this.state.startColor } 
            bgColor={this.state.bgColor} 
            user={this.state.user} 
            gameboard={this.state.gameboard}
            schemeArray={this.state.schemeArray}
            mode={this.state.mode}
            id={this.state.id}
            playInt={this.state.playInt}
            musicboard={this.state.musicboard}
            setAppState={this.setAppState}
            playbackMap={this.state.playbackMap}
            isMuted={this.state.isMuted}
            isPlaying={this.state.isPlaying}
            playbackSpeed={this.state.playbackSpeed}
            lastRandomNote={this.state.lastRandomNote}
            />)} />

            

            <PrivateRoute exact path="/userboards" component={UserBoards} bgColor={this.state.bgColor} user={this.state.user} setAppState={this.setAppState}/>
            <Route exact path="/aboutus" bgColor={this.state.bgColor} component={AboutUs} setAppState={this.setAppState} />
            <Route exact path="/" render={(props) => <Landing {...props} user={this.state.user} startColor={ this.state.startColor } handleColorSwitch={this.handleColorSwitch} lastRandomNote={this.state.lastRandomNote} setAppState={this.setAppState}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
