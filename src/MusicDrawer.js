import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
// const storedUser = JSON.parse(localStorage.getItem('user'));

const SwipeableTemporaryDrawer = withRouter(({history, isMuted}) => {
//   const realUser = user ? user : storedUser;


  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    logBool: true,
  });

  const [value, setValue] = React.useState(30);

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

//   const handleMyBoards = () => history.push('/userboards');
//   const handleLoginButton = () => history.push('/login');
//   const handleLogoutButton = () => {
//     localStorage.clear();
//     history.push('/login');
//   };



  const handleMute = () => {
      console.log('MUTE!')
  }

  const button = () => (!isMuted) ? 
    <Button variant="contained" size="small" color="secondary" onClick={e => handleMute()} startIcon={<MusicNoteIcon/>}>Mute</Button> : <div>
    <Button variant="contained" size="small" color="secondary" onClick={e => handleMute()} startIcon={<MusicOffIcon/>}>Unmute</Button>
  </div>
  ;

  const fullList = side => (
    <div className={classes.fullList} id="music-drawer-contents" role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>

      

      {button()}
      <Button variant="contained" size="small" color="primary" onClick={e => history.push('/')} startIcon={<SubscriptionsIcon/>}>My Mosaics</Button>
      <Button variant="contained" size="small" color="primary" onClick={e => history.push('/')} startIcon={<AddCircleIcon/>}>New Mosaic</Button>  
    </div>
  );

  return (
    <div id="top-drawer-div">
      <Button id="musicDrawerButton" onClick={toggleDrawer('top', true)} size="large" startIcon={<MusicVideoIcon/>}></Button>
      
      <SwipeableDrawer anchor="bottom" open={state.top} onClose={toggleDrawer('top', false)} onOpen={toggleDrawer('top', true)}>{fullList('top')}</SwipeableDrawer>
    </div>
  );
})

export default SwipeableTemporaryDrawer;