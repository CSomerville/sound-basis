import { deleteApi } from '../utils/fetch-helpers';

export const fetchUnlockPages = () => ({
  types: ['FETCH_UNLOCK_PAGES', 'FETCH_UNLOCK_PAGES_SUCCESS', 'FETCH_UNLOCK_PAGES_FAILURE'],
  call: () => deleteApi('/pages-locked', {})
});
