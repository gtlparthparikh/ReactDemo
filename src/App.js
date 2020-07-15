import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/Home'
import './App.css';
import Routes from './routes'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    )
  }
}

export default App;
