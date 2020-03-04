import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { saveBoard } from './mosaic-api';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({handleChangeScheme, gameState, user, colorName}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleSave = async() => {
      const stringyState = JSON.stringify(gameState)
      const gameObject = {
        board_name: colorName,
        game_board: stringyState
      }
      await saveBoard(gameObject, user);
  }

  const fullList = side => (
    <div className={classes.fullList} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
          <InputLabel id="label">Color Scheme</InputLabel>
          <Select onChange={(e) => handleChangeScheme(e)} labelId="label" id="select" value="mode">
              <MenuItem value="monochrome">Monochrome</MenuItem>
              <MenuItem value="monochrome-dark">Monochrome-Dark</MenuItem>
              <MenuItem value="monochrome-light">Monochrome-Light</MenuItem>
              <MenuItem value="analogic">Analogic</MenuItem>
              <MenuItem value="complement">Complement</MenuItem>
              <MenuItem value="analogic-complement">Analogic-Complement</MenuItem>
              <MenuItem value="triad">Triad</MenuItem>
              <MenuItem value="quad">Quad</MenuItem>
          </Select>
          <Button onClick={e => handleSave()}>Save Mosaic</Button>
      </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)}>Open Bottom</Button>
      <SwipeableDrawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>{fullList('bottom')}</SwipeableDrawer>
    </div>
  );
}