import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

export default class Login extends Component {
    state = {
        nameInput: '',
        emailInput: '',
        passwordInput: '',
        logBool: true,
    }

    handleInput = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    //change these to functions
    button = () => (this.state.logBool) ? 
        <Button variant="contained" color="primary" size="large" onClick={this.handleLogin}>LogIn</Button> : 
        <Button variant="contained" color="primary" size="large" onClick={this.handleSignup}>SignUp</Button>;
    hidden = () => this.state.logBool ? {display:'none'}: {display:'inline-block'};
    render() {
        return (
            <div>
                    <Button variant="contained" color="secondary" size="small" onClick={e => this.setState({logBool: !this.state.logBool})}>{this.state.logBool ? "Don't have an account?": "Already Signed Up?"}</Button>
                    <TextField id="nameInput" style={this.hidden()} value={this.state.nameInput} onChange={this.handleInput} label="Name" variant="outlined"/>
                    <TextField id="emailInput" value={this.state.emailInput} onChange={this.handleInput} label="Email" variant="outlined"/>
                    <TextField id="passwordInput" value={this.state.passwordInput} onChange={this.handleInput} label="Password" variant="outlined"/>
                    {this.button()}
            </div>
        )
    }
}
