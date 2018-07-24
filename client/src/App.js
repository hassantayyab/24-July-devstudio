import React, { Component } from "react";
// import { Provider } from 'react-redux'
import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// import store from "./store";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Edito from "./components/Edito/Edito";
import Focus from "./components/Focus/Focus";
import Debate from "./components/Debate/Debate";
import Reperes from "./components/Reperes/Reperes";
import Investir from "./components/Investir/Investir";
import EnChiffres from "./components/EnChiffres/EnChiffres";
import EnImages from "./components/EnImages/EnImages";

class App extends Component {
  render() {
    return (
      // <Provider store={ store }>
      <div className="App">
        <Router>
          <div>
            <NavBar />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Edito" component={Edito} />
            <Route exact path="/Focus" component={Focus} />
            <Route exact path="/Debate" component={Debate} />
            <Route exact path="/Reperes" component={Reperes} />
            <Route exact path="/Investir" component={Investir} />
            <Route exact path="/EnChiffres" component={EnChiffres} />
            <Route exact path="/EnImages" component={EnImages} />
          </div>
        </Router>
      </div>
      // </Provider>
    );
  }
}

export default App;
