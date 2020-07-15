import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    checkLogin = () =>{
        let users = JSON.parse(localStorage.getItem('users'))
        let flag = false
        // console.log(users)
        users.forEach(element => {
            if(element.email === this.state.email){
                if(element.password === this.state.password){
                    flag=true
                }
            }
        });
        if(flag){
            localStorage.setItem('isLoggedIn',true)
            this.props.history.push("/")
        }else{
            alert('unauthorized')
        }
    }
    render() {
        return (
            <div className="container">
                <div className="container">
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.checkLogin}>Login</button>
                </div>
                <br />
                New User <Link to="/register">Click Here</Link>
            </div>
        )
    }
}

export default Login
