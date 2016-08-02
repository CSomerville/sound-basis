export default (state = makeDefaults(), action) => {
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
    case 'EDIT_PAGE_NAME':
      return Object.assign({}, state, {
        nameEditable: [...state.nameEditable, action.id]
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
    default:
      return state;
  }
}

const makeDefaults = () => ({
  canEdit: false,
  editablePages: [],
  promptAddPage: false
});
