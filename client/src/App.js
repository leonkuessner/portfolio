
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from 'react-router-dom';
// import LogIn from './components/admin-section/LogIn';
import Admin from './components/admin-section/Admin';
import Homepage from './components/pages/homepage/Homepage';
import Navbar from './components/Navbar';
import AboutMe from './components/pages/aboutMe/AboutMe';
import Projects from './components/pages/projects/Projects';
import Contact from './components/pages/contact/Contact';
import { Component, useState } from 'react';
import PrivateRoute from './components/admin-section/PrivateRoute'
import Login from './components/admin-section/LogIn'

function App() {
  return (
      <div className="body-wrapper">
        <Router>
            <Switch>
                <Route exact path="/" component={Navbar} />
            </Switch>
            <Switch>
                <Route exact path="/" component={Homepage} />
            </Switch>
            <Switch>
                <Route exact path="/" component={AboutMe} />
            </Switch>
            <Switch>
                <Route exact path="/" component={Projects} />
            </Switch>
            <Switch>
                <Route exact path="/" component={Contact} />
            </Switch>
            {/* <Navbar />
            <Homepage />
            <AboutMe />
            <Projects />
            <Contact /> */}
            <Switch>
                <Route exact path="/login" component={Login} />
            </Switch>
            <Switch>
                <PrivateRoute path="/admin">
                  <Admin />
                </PrivateRoute>
            </Switch>
        </Router>
      </div>
  );
}

export default App;
