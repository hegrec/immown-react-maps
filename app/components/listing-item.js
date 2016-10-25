import React, { Component, PropTypes as Types } from 'react';

const typeMap = {
  1: 'House',
  2: 'Apartment',
  3: 'Land'
};

export default class ListingItem extends Component {
  static propTypes = {
    listing: Types.object
  };


  static renderImage(listing) {
    if (!listing.images) {
      return;
    }

    return (
      <img className='listing-item-image' src={ `http://cdn.immown.dev${ listing.images[0].standard_url }` } />
    )
  }

  static renderPropertyType(listing) {
    const propertyType = typeMap[listing.construction_type];

    return (
      <span>{ propertyType } for sale</span>
    );
  }

  render() {
    const { listing } = this.props;

    return (
    <li className="listing-item">
      { ListingItem.renderImage(listing) }
      { ListingItem.renderPropertyType(listing) }
      <div>{ listing.price }</div>
      <div>{ listing.num_rooms } Rooms</div>
      <div>{ listing.num_bedrooms } Bedrooms</div>
      <div>{ listing.town.name }</div>
    </li>
    );
  }
}
