import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { withRouter } from 'react-router-dom';


export default withRouter(class Landing extends Component {
    state = {
        fade: false,
    }
    componentDidMount = () => {
        this.setState({
            fade: true
        })
    }
    render() {
        const color = {backgroundColor: `${this.props.startColor}`}
        return (
            <div style={color} id="landing-container">
                <Fade in={this.state.fade} timeout={3000}>
                    <h1 className="title">Mosaic</h1>
                </Fade>
                <div className="button-container">
                    <Button variant="contained" color="primary" size="large" startIcon={<PlayCircleFilledIcon />}>Play</Button>
                    <Button variant="contained" onClick={this.props.handleColorSwitch} color="secondary" size="small" startIcon={<ColorLensIcon />}>Color Switch</Button>
                </div>
            </div>
        )
    }
})
