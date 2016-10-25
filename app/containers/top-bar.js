import React, { Component } from 'react';

export default class TopBar extends Component {

  render() {
    return (
      <header className="header">
        <img src="img/logo.png" className="header-logo" />
        <form action="/search">
          <input
            className="header-search-input"
            placeholder="Search"
            name="query"
          />
        </form>
      </header>
    );
  }
}
