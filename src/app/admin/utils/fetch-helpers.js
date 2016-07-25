import fetch from 'isomorphic-fetch';
import camelize from 'camelize';

const base = '/api'

export function getApi(urlFrag) {
  const url = base + urlFrag;

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(parsed => camelize(parsed));
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const err = new Error(res.statusText);
    err.res = res;
    throw err;
  }
}
