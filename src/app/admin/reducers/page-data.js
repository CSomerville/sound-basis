import findIndex from 'lodash/findIndex';
import uuid from 'node-uuid';

export default (state = makeDefaults(), action) => {

  let index;

  switch (action.type) {
    case 'FETCH_PAGES_INDEX_SUCCESS':
      return Object.assign({}, state, {
        pages: action.res.pages,
        subPages: action.res.subPages,
        items: action.res.items
      });
    case 'FETCH_EDIT_PAGES':
      return Object.assign({}, state, {
        previousPages: action.pages
      });
    case 'CANCEL_EDIT_PAGES':
      return Object.assign({}, state, {
        pages: previousPages
      });
    case 'UPDATE_PAGE_NAME':
      index = findIndex(state.pages, (page => page.id === action.id));
      return Object.assign({}, state, {
        pages: [
          ...state.pages.slice(0, index),
          Object.assign({}, state.pages[index], {
            name: action.name
          }),
          ...state.pages.slice(index + 1)
        ]
      });
    case 'NEW_HAS_SUB_PAGES':
      return Object.assign({}, state, {
        pages: [
          ...state.pages,
          newPage(true, state.pages.length)
        ]
      });
    case 'NEW_HAS_NO_SUB_PAGES':
      return Object.assign({}, state, {
        pages: [
          ...state.pages,
          newPage(false, state.pages.length)
        ]
      });
    case 'PAGE_TOGGLE_ACTIVE':
      index = findIndex(state.pages, (page => page.id === action.id));
      return Object.assign({}, state, {
        pages: [
          ...state.pages.slice(0, index),
          Object.assign({}, state.pages[index], {
            active: !state.pages[index].active  
          }),
          ...state.pages.slice(index + 1)
        ]
      });
    default:
      return state;
  }
}

const makeDefaults = () => ({
  pages: [],
  subPages: [],
  items: [],
  previousPages: []
});

const newPage = (hasSubPages, position) => ({
  id: uuid.v4(),
  name: '',
  hasSubPages: hasSubPages,
  position: position,
  active: false
});
