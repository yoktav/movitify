import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(response.statusText);
}

async function fetchData(url, options = {}) {
  const config = options;
  config.headers = {
    Accept: 'application/json',
  };

  return axios
    .get(url, config)
    .then(checkStatus)
    .catch(error => {
      throw new Error(error);
    });
}

export { fetchData };
