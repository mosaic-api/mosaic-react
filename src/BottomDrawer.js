import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { saveBoard, updateBoard } from './mosaic-api';
import SettingsIcon from '@material-ui/icons/Settings';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
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

export default function SwipeableTemporaryDrawer({handleChangeScheme, gameState, user, colorName, scheme, currentMusic, id, getSaved}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
    const stringyMusicBoard = JSON.stringify(currentMusic)
    if (!id){
      const gameObject = {
        board_name: colorName,
        game_board: stringyState,
        scheme: stringyScheme,
        music_board: stringyMusicBoard
      }
      const saved = await saveBoard(gameObject, user);
      getSaved(saved.body)
    } else {
      const gameObject = {
        game_board: stringyState,
        scheme: stringyScheme,
        music_board: stringyMusicBoard
      }
      await updateBoard(gameObject, user, id)
    }
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
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
      <Button variant="contained" size="small" color="secondary" disabled={user ? false : true} onClick={e => handleSave()} startIcon={<AddCircleIcon/>}>{user ? 'Save Mosaic': 'Must Login'}</Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <Button onClick={toggleDrawer('bottom', true)} size="large" startIcon={<SettingsIcon/>}></Button>

      <SwipeableDrawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>{fullList('bottom')}</SwipeableDrawer>

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Saved!
        </Alert>
      </Snackbar>
    </div>
  );
}