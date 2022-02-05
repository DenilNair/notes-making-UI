import React, { Component } from 'react';
import HeaderComponent from './components/header/header-component';

import Contact from './components/contact-us/contact-us-component';
import Create from './components/create-note/create-note-component';
import View from './components/view-note/view-note-component';
import Home from './components/header/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  render() {
    return <div >
     
      <Router>
      <HeaderComponent />
                        <Routes><Route path="/" element={ <Home/>} />
                          
                          <Route path="/view" element={ <View/>} />
                          <Route path="/contact-us" element={ <Contact/>} />
                          <Route path="/create" element={ <Create/>} />
                          
                      
                        
                        </Routes>
      </Router>
      
     
    </div>;
  }
}

