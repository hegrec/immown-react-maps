import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import ListingItem from 'components/listing-item';

class Sidebar extends Component {
  static propTypes = {
    listings: Types.object
  };

  static renderListings(listings) {
    return listings.map((listing, index) => {
      return (
        <ListingItem key={index} listing={listing} />
      );
    })
  }

  render() {
    return (
      <aside className="sidebar">
        <ul className="listing-list">
          { Sidebar.renderListings(this.props.listings) }
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: state.homes.getIn(['sidebar', 'listings'])
  };
};

export default connect(mapStateToProps)(Sidebar);
