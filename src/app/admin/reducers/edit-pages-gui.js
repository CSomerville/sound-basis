import findIndex from 'lodash/findIndex';

export default (state = makeDefaults(), action) => {
  console.log(action);
  let index;

  switch(action.type) {
    case 'FETCH_EDIT_PAGES':
      return Object.assign({}, state, {
        canEdit: false
      });
    case 'FETCH_EDIT_PAGES_SUCCESS':
      return Object.assign({}, state, {
        canEdit: true
      });
    case 'UNLOCK_EDIT_PAGES_SUCCESS':
      return Object.assign({}, state, {
        canEdit: false
      });
    case 'ADD_PAGE':
      return Object.assign({}, state, {
        promptAddPage: true
      });
    case 'NEW_HAS_SUB_PAGES':
      return Object.assign({}, state, {
        promptAddPage: false
      });
    case 'NEW_HAS_NO_SUB_PAGES':
      return Object.assign({}, state, {
        promptAddPage: false
      });
    case 'CANCEL_ADD_PAGE':
      return Object.assign({}, state, {
        promptAddPage: false
      });
    case 'CAN_EDIT_PAGE':
      return Object.assign({}, state, {
        editablePages: [
          ...state.editablePages,
          action.id
        ]
      });
    case 'PROMPT_DELETE_PAGE':
      return Object.assign({}, state, {
        pageToDelete: action.id
      });
    case 'CANCEL_DELETE_PAGE':
      return Object.assign({}, state, {
        pageToDelete: null
      });
    case 'FETCH_DELETE_PAGE_SUCCESS':
      return Object.assign({}, state, {
        pageToDelete: null
      });
    case 'CANCEL_EDIT_PAGE':
      index = findIndex(state.editablePages, (id => id === action.id));
      return Object.assign({}, state, {
        editablePages: [
          ...state.editablePages.slice(0, index),
          ...state.editablePages.slice(index + 1)
        ]
      });
    case 'FETCH_SAVE_PAGE_SUCCESS':
      index = findIndex(state.editablePages, (id => id === action.id));
      return Object.assign({}, state, {
        editablePages: [
          ...state.editablePages.slice(0, index),
          ...state.editablePages.slice(index + 1)
        ]
      });
    default:
      return state;
  }
}

const makeDefaults = () => ({
  canEdit: false,
  editablePages: [],
  promptAddPage: false,
  pageToDelete: null
});
