import React from 'react';
import './App.css';
import {BrowserRouter as Brow,Route, Switch} from 'react-router-dom'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'
import Landing from './landing/Landing'
import Custom from './custom/Custom'
import Creative from './customer/Creative'
import NotFound from './unfound/Unfound'
import Reset from './reset/Reset'
import ForgotPassword from './forgot/Forgot'

function App() {
  return (
    <div className="App">
    <Brow>
      <Switch>
        <Route exact path='/' component={Signin} /> 
        <Route path='/signup' component={Signup} />
        <Route path='/landing' component={Landing} />
        <Route path='/custom' component={Custom} />
        <Route path='/user' component={Creative} />
        <Route path='/api' component={Creative} />
        <Route exact path='/reset' component={Reset} />
        <Route exact path='/forgot' component={ForgotPassword} />
        <Route component={NotFound} />
      </Switch>
    </Brow>
    </div>
  );
}

//<Route path='/user/:id' component={Creative} /><Route component={notFound} />
export default App;
