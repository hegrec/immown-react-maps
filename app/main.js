import React, { Component } from 'react';
import Content from './containers/content';
import TopBar from './containers/top-bar';

export default class Main extends Component {
  render() {
    return (
      <div className="app">
        <TopBar />
        <Content />
      </div>
    );
  }
}
