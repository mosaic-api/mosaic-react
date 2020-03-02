import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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
      <Button variant="contained" color="primary" startIcon={<PlayCircleFilledIcon/>}>Play</Button>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('top', true)}>Open Top</Button>
      <SwipeableDrawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)} onOpen={toggleDrawer('top', true)}>{fullList('top')}</SwipeableDrawer>
    </div>
  );
}