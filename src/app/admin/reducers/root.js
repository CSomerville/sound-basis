import { combineReducers } from 'redux';
import pageData from './page-data';
import editPagesGUI from './edit-pages-gui';

const rootReducer = combineReducers({
  pageData,
  editPagesGUI
});

export default rootReducer;
