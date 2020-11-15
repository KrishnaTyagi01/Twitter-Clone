import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup'
import Landing from './user/Landing'
import Home from './user/Home'
import PrivateRoute from './user/PrivateRoute'
import Navbar from './user/Navbar'
import Tweet from './user/Tweet'
import Profile from './user/Profile'
import UserProfile from './user/UserProfile'

const Routes = ()=>{
return(
    <BrowserRouter>
      <Switch>

          <Route exact path="/signin"><Signin/></Route>
          <Route exact path="/navbar"><Navbar /></Route>
          <Route exact path="/signup"><Signup/></Route>
          <Route exact path="/" component={Landing}/>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute exact path="/tweet" component={Tweet}/>
          <PrivateRoute exact path="/profile/:userId" component={Profile}/>
          <PrivateRoute exact path="/profile/by/:userId" component={UserProfile}/>
      </Switch>
    </BrowserRouter>
)
}


export default Routes;