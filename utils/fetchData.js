import axios from 'axios';

async function fetchData(url) {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchData as default };
