import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {

  title = "2019 Reads";
  subtitle = "Man vs. New Year's resolution";

  render() {
    return (
        <section className="hero is-info header-hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1"><Link to={'/'}>{this.title}</Link></h1>
              <h1 className="subtitle is-4">{this.subtitle}</h1>
            </div>
          </div>
        </section>
    )
  }
}

export default Header;
          