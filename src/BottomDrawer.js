import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { saveBoard } from './mosaic-api';
import SettingsIcon from '@material-ui/icons/Settings';
// import SaveAlert from 'SaveAlert.js';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  }
}));

export default function SwipeableTemporaryDrawer({handleChangeScheme, gameState, user, colorName, scheme, currentMode}) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mode, setMode] = React.useState('');

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  const handleChangeSelect = e => {
    setMode(e.target.value);
    handleChangeScheme(e)
  }
  const handleSave = async() => {
      const stringyState = JSON.stringify(gameState)
      const stringyScheme = JSON.stringify(scheme)
      const gameObject = {
        board_name: colorName,
        game_board: stringyState,
        scheme: stringyScheme,
        mode: currentMode
      }
      await saveBoard(gameObject, user);
  }
  
  const fullList = side => (
    <div className={classes.fullList} id="bottom-drawer-contents" role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
      <em>{colorName}</em>
      <FormControl variant="outlined" className={classes.formControl}>

          <InputLabel id="select-label">Color Palette</InputLabel>

          <Select onChange={handleChangeSelect} labelId="select-label" id="select-outlined" value={mode}>

              <MenuItem value="monochrome">Monochrome</MenuItem>
              <MenuItem value="monochrome-dark">Monochrome-Dark</MenuItem>
              <MenuItem value="monochrome-light">Monochrome-Light</MenuItem>
              <MenuItem value="analogic">Analogic</MenuItem>
              <MenuItem value="complement">Complement</MenuItem>
              <MenuItem value="analogic-complement">Analogic-Complement</MenuItem>
              <MenuItem value="triad">Triad</MenuItem>
              <MenuItem value="quad">Quad</MenuItem>
          </Select>
      </FormControl>
      <Button variant="contained" size="small" color="secondary" onClick={e => handleSave()} startIcon={<AddCircleIcon/>}>Save Mosaic</Button>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)} size="large" startIcon={<SettingsIcon/>}></Button>

      <SwipeableDrawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>{fullList('bottom')}</SwipeableDrawer>
    </div>
  );
}