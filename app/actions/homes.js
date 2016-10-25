import API from 'app.api';

export const REQUEST_HOME_SIDEBAR = 'REQUEST_HOME_SIDEBAR';
export const REQUEST_HOME_ICONS = 'REQUEST_HOME_ICONS';
export const RECEIVE_HOME_SIDEBAR = 'RECEIVE_HOME_SIDEBAR';
export const RECEIVE_HOME_ICONS = 'RECEIVE_HOME_ICONS';

let sidebarPromise = null;
let iconPromise = null;

export const loadHomes = () => (dispatch, getState) => {
  const state = getState();

  dispatch(requestHomeIcons());
  dispatch(requestHomeSidebar());

  if (sidebarPromise) {
    sidebarPromise._httpRequest.abort();
  }

  if (iconPromise) {
    iconPromise._httpRequest.abort();
  }

  iconPromise = API.loadHomeIcons(state.filters);
  sidebarPromise = API.loadHomeSidebar(state.filters);


  Promise.all([
    iconPromise,
    sidebarPromise
  ])
  .then((result) => {
    iconPromise = null;
    sidebarPromise = null;


    dispatch(receiveHomeIcons(result[0]));
    dispatch(receiveHomeSidebar(result[1]));
  })
    .catch(() => {
      sidebarPromise = null;
      iconPromise = null;
    });
};

const requestHomeSidebar = () => ({
  type: REQUEST_HOME_SIDEBAR
});

const requestHomeIcons = () => ({
  type: REQUEST_HOME_ICONS
});

const receiveHomeSidebar = (sidebar) => ({
  type: RECEIVE_HOME_SIDEBAR,
  currentPage: sidebar.current_page,
  pageCount: sidebar.page_count,
  listings: sidebar.listings
});

const receiveHomeIcons = (icons) => ({
  type: RECEIVE_HOME_ICONS,
  hasMore: icons.has_more,
  icons: icons.icons
});
