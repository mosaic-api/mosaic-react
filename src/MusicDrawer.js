import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import { Select, InputLabel, MenuItem } from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { saveBoard, updateBoard } from './mosaic-api';
// import SettingsIcon from '@material-ui/icons/Settings';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';


export default class MusicDrawer extends Component {
    render() {
        return (
            <div>

                <Button id="muteButton">Mute</Button>
                <Button id="playButton">Play</Button>
                <Button id="stopButton">Stop</Button>
                <Button id="speedButton">Speed</Button>

            </div>
        )
    }
}
