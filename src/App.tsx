import React, {Component} from 'react'
import './App.css';
import GetList from './Assets/components/GetList';
import Nav from './Assets/components/shared/Nav';
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import UserDetail from './Assets/components/UserDetail';
class App extends Component{
  render(){
    return (
      <Router>
      <div className="App">
        <Nav></Nav>
        <Switch>
          <Route path="/" exact component={GetList}/>
          <Route path="/UserDetail/:id" component={UserDetail}></Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
