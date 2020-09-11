import React from 'react';
import './App.css';
import {BrowserRouter as Brow,Route, Switch} from 'react-router-dom'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'
import Landing from './landing/Landing'
import Custom from './custom/Custom'
import Creative from './customer/Creative'

function App() {
  return (
    <div className="App">
    <Brow>
      <Switch>
        <Route exact path='/' component={Signin} /> 
        <Route path='/signup' component={Signup} />
        <Route path='/landing' component={Landing} />
        <Route path='/custom' component={Custom} />
        <Route path='/api/:id' component={Creative} />
        <Route path='/user' component={Creative} />
      </Switch>
    </Brow>
    </div>
  );
}


export default App;
