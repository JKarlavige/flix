import axios from 'axios';

export default function fetchResults(url) {
  return axios.get(url)
  .then(res => res.data)
  .catch((error) => console.warn(error));
}
