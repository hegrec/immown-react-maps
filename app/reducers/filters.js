import { SET_FILTERS } from 'actions/filters';

const initialState = {
  lat_north: 0,
  lat_south: 0,
  lng_east: 0,
  lng_west: 0,
  sort: 'featured',
  apartments: true,
  houses: true,
  land: true,
  page: 1,
  zoom: 7
};

export default function filters(state = initialState, action) {
  switch(action.type) {
    case SET_FILTERS:
      return Object.assign({}, state, action.filters);
    default:
      return state;
  }
};
