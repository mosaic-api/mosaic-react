import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { withRouter } from 'react-router-dom';
import TopDrawer from './TopDrawer.js';
import MosaicTitle from './MosaicTitle.js';


export default withRouter(class Landing extends Component {
    state = {
        fade: false,
    }

    handlePlay = () => {
        this.props.setAppState({
            lastRandomNote: 0
        })
        this.props.history.push('/gameboard')
    }
    
    componentDidMount = () => {
        this.setState({
            fade: true
        })
    }
    render() {
        const color = {backgroundColor: `${this.props.startColor}`}
        return (
            <div style={color} id="landing-app">
                <div id="landing-container">
                    <Fade in={this.state.fade} timeout={3000}>
                        <MosaicTitle />
                    </Fade>
                    <div id="button-container">
                        <Button variant="contained" color="primary" size="large" onClick={this.handlePlay} startIcon={<PlayCircleFilledIcon  />}>Play</Button>
                        
                        <Button variant="contained" onClick={this.props.handleColorSwitch} color="secondary" size="small" startIcon={<ColorLensIcon />}>Color Switch</Button>
                    </div>
                </div>
                <TopDrawer user={this.props.user} setAppState={this.props.setAppState} />

            </div>
        )
    }
})
