import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import { setFilters } from 'actions/filters';
import { loadHomes } from 'actions/homes';
import GoogleMap from 'google-map-react';
import MapIcon from 'components/map-icon';

class Map extends Component {
  static defaultProps = {
    center: { lat: 47, lng: 2 },
    zoom: 7
  };

  static propTypes = {
    center: Types.object,
    dispatch: Types.func,
    icons: Types.object,
    zoom: Types.number
  };

  constructor(props) {
    super(props);

    this.onMapChange = this.onMapChange.bind(this);
  }

  onMapChange(event) {
    const mapFilters = {
      lat_north: event.bounds.nw.lat,
      lat_south: event.bounds.se.lat,
      lng_east: event.bounds.se.lng,
      lng_west: event.bounds.nw.lng,
      zoom: event.zoom
    };

    this.props.dispatch(setFilters(mapFilters));
    this.props.dispatch(loadHomes());
  }

  static renderMapMarkers(icons) {
    return icons.map((icon, index) => {
      return <MapIcon key={index} lng={icon.lo} lat={icon.la} />
    })
  }

  render() {
    return (
      <main className="map">
        <GoogleMap
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChange={this.onMapChange}
        >
          {Map.renderMapMarkers(this.props.icons)}
        </GoogleMap>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    icons: state.homes.getIn(['icons', 'listings'])
  };
};

export default connect(mapStateToProps)(Map);
