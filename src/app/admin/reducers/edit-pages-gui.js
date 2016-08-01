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
    default:
      return state;
  }
}

const makeDefaults = () => ({
  canEdit: false,
  nameEditable: []
});
