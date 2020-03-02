import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ColorLensIcon from '@material-ui/icons/ColorLens';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <h1>Mosaic</h1>
                <Button variant="contained" color="primary" startIcon={<PlayCircleFilledIcon/>}>Play</Button>
                <Button variant="contained" color="secondary" startIcon={<ColorLensIcon />}>Color Switch</Button>
            </div>
        )
    }
}
