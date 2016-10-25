import React, { Component } from 'react';
import Map from './map';
import Sidebar from './sidebar';

export default class Content extends Component {

  render() {
    return (
      <div className="content">
        <Sidebar />
        <Map />
      </div>
    );
  }
}
