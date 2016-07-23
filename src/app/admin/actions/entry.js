import { getApi } from '../utils/fetch-helpers';

export const fetchPagesIndex = () => ({
  types: ['FETCH_PAGES_INDEX', 'FETCH_PAGES_INDEX_SUCCESS', 'FETCH_PAGES_INDEX_FAILURE'],
  call: () => getApi('/pages')
});
