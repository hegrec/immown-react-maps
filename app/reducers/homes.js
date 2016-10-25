import { Map, List } from 'immutable';
import { RECEIVE_HOME_ICONS, RECEIVE_HOME_SIDEBAR, REQUEST_HOME_SIDEBAR, REQUEST_HOME_ICONS } from 'actions/homes';

const initialState = Map({
  sidebar: Map({
    state: "ready",
    currentPage: 1,
    pageCount: 1,
    listings: List(),
  }),
  icons: Map({
    state: "ready",
    hasMore: false,
    listings: List(),
  })
});

export default function homes(state = initialState, action) {
  switch(action.type) {
    case REQUEST_HOME_SIDEBAR:
      return state.setIn(['sidebar','state'], 'fetching');
    case REQUEST_HOME_ICONS:
      return state.setIn(['icons','state'], 'fetching');
    case RECEIVE_HOME_ICONS:
      return state
        .setIn(['icons', 'state'], 'ready')
        .setIn(['icons', 'hasMore'], action.has_more)
        .setIn(['icons', 'listings'], List(action.icons));
    case RECEIVE_HOME_SIDEBAR:
      return state
        .setIn(['sidebar', 'state'], 'ready')
        .setIn(['sidebar', 'currentPage'], action.currentPage)
        .setIn(['sidebar', 'pageCount'], action.pageCount)
        .setIn(['sidebar', 'listings'], List(action.listings));
    default:
      return state;
  }
};
