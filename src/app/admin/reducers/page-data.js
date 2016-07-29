export default (state = makeDefaults(), action) => {
  console.log(action);
  switch (action.type) {
    case 'FETCH_PAGES_INDEX_SUCCESS':
      return Object.assign({}, state, {
        pages: action.res.pages,
        subPages: action.res.subPages,
        items: action.res.items
      });
    default:
      return state;
  }
}

const makeDefaults = () => ({
  pages: [],
  subPages: [],
  items: []
});
