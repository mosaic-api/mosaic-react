import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { signup, signin } from './mosaic-api.js'

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

    handleSignIn = async(e) => {
        e.preventDefault()
        const user = {
            email: this.state.emailInput,
            password: this.state.passwordInput,
        }
        try{
            const userData = await signin(user)
            this.props.setUser(userData.body)
            this.props.history.push('/')
        } catch (err) {
            alert(err)
        }
    }
    handleSignUp = async(e) => {
        e.preventDefault()
        const user = {
            email: this.state.emailInput,
            password: this.state.passwordInput,
            name: this.state.nameInput
        }
        try{
            const userData = await signup(user)
            this.props.setUser(userData.body)
            this.props.history.push('/')
        } catch (err) {
            alert(err)
        }
    }
    

    button = () => (this.state.logBool) ? 
        <Button variant="contained" color="primary" size="large" onClick={this.handleSignIn}>LogIn</Button> : 
        <Button variant="contained" color="primary" size="large" onClick={this.handleSignUp}>SignUp</Button>;
    hidden = () => this.state.logBool ? {display:'none'}: {display:'inline-block'};
    render() {
        return (
            <div id="login-parent">
                <h1 className="title">Mosaic</h1>

                <form id="form-container"> 
                    <Button variant="contained" color="secondary" size="small" onClick={e => this.setState({logBool: !this.state.logBool})}>{this.state.logBool ? "Don't have an account?": "Already Signed Up?"}</Button>

                    <TextField id="nameInput" style={this.hidden()} value={this.state.nameInput} onChange={this.handleInput} label="Name" variant="outlined"/>

                    <TextField required id="emailInput" value={this.state.emailInput} onChange={this.handleInput} label="Email" variant="outlined"/>

                    <TextField required id="passwordInput" value={this.state.passwordInput} type="password" onChange={this.handleInput} label="Password" variant="outlined"/>
                    {this.button()}
                </form>
            </div>
        )
    }
}
