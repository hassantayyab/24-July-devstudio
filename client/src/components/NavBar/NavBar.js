import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import { getCustomers } from '../../store/actions/customer'
import { Link } from "react-router-dom";
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">EMAGS</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/Home">Home</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Edito">Edito</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Focus">Focus</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Debate">Debate</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Reperes">Reperes</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Investir">Investir</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/EnChiffres">En Chiffres</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/EnImages">En Images</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
