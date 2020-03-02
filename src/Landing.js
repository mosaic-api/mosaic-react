import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ColorLensIcon from '@material-ui/icons/ColorLens';

export default class Landing extends Component {
    render() {
        return (
            <div id="landing-container">
                <h1>Mosaic</h1>
                <div className="button-container">
                    <Button variant="contained" color="primary" size="large" startIcon={<PlayCircleFilledIcon />}>Play</Button>
                    <Button variant="contained" color="secondary" size="small" startIcon={<ColorLensIcon />}>Color Switch</Button>
                </div>
            </div>
        )
    }
}
