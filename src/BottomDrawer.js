import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Select, InputLabel, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
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

  const fullList = side => (
    <div className={classes.fullList} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
          <InputLabel id="label">Age</InputLabel>
          <Select labelId="label" id="select" value="20">
              <MenuItem value="10">Ten</MenuItem>
              <MenuItem value="20">Twenty</MenuItem>
          </Select>
      </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)}>Open Bottom</Button>
      <SwipeableDrawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>{fullList('bottom')}</SwipeableDrawer>
    </div>
  );
}