import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'
import Landing from './landing/Landing'
import Custom from './landing/Custom'
import Creative from './landing/Creative'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Signin} /> 
        <Route path='/signup' component={Signup} />
        <Route path='/landing' component={Landing} />
        <Route path='/redUser' component={Custom} />
        <Route path='/api/:id' component={Custom} />
        <Route path='/user' component={Creative} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}


export default App;
