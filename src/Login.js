import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { signup, signin } from './mosaic-api.js';
import MosaicTitle from './MosaicTitle.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

export default class Login extends Component {
    state = {
        nameInput: '',
        emailInput: '',
        passwordInput: '',
        logBool: true,
        loading: false,
        //snack bar
        open: false

    }
    //snack bar stuff
    handleClick = () => {
        this.setState({open: true})
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        this.setState({open: false})
    };
    //^snackbar stuff
    handleInput = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    switchLoadingState() {
        this.setState({ loading: !this.state.loading})
    } 

    handleSignIn = async(e) => {
        e.preventDefault()
        this.switchLoadingState()
        const user = {
            email: this.state.emailInput,
            password: this.state.passwordInput,
        }
        try{
            const userData = await signin(user)
            this.props.setUser(userData.body)
           
            this.props.history.push('/gameboard/$$$')
        } catch (err) {
            this.setState({open: true})
        }
        this.switchLoadingState()
    }
    handleSignUp = async(e) => {
        e.preventDefault()
        this.switchLoadingState()
        const user = {
            email: this.state.emailInput,
            password: this.state.passwordInput,
            name: this.state.nameInput
        }
        try{
            const userData = await signup(user)
            this.props.setUser(userData.body)
           
            this.props.history.push('/gameboard/$$$')
        } catch (err) {
            this.setState({open: true})
        }
        this.switchLoadingState()
    }
    

    button = () => (this.state.logBool) ? 
        <Button variant="contained" color="primary" size="large" onClick={this.handleSignIn}>LogIn</Button> : 
        <Button variant="contained" color="primary" size="large" onClick={this.handleSignUp}>SignUp</Button>;

    hidden = () => this.state.logBool ? {display:'none'}: {display:'inline-block'};
    render() {
        const background = {backgroundColor: this.props.bgColor}
        return (
            <div style={background} id="login-parent">
                <MosaicTitle />
                <Button variant="contained" color="secondary" size="medium" onClick={()=> this.props.history.push('/gameboard/$$$')}>Go Play</Button>

                <form id="form-container"> 
                    <Button variant="contained" color="secondary" size="small" onClick={e => this.setState({logBool: !this.state.logBool})}>{this.state.logBool ? "Don't have an account?": "Already Signed Up?"}</Button>

                    <TextField id="nameInput" style={this.hidden()} value={this.state.nameInput} onChange={this.handleInput} label="Name" variant="outlined"/>

                    <TextField required id="emailInput" value={this.state.emailInput} onChange={this.handleInput} label="Email" variant="outlined"/>

                    <TextField required id="passwordInput" value={this.state.passwordInput} type="password" onChange={this.handleInput} label="Password" variant="outlined"/>
                    {(this.state.loading) ? <CircularProgress /> : this.button()}
                </form>

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">
                         {(this.state.logBool) ? 'user does not exist or wrong password' : 'user already exists or invalid input'}   
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
