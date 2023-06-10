import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxios = ({ url, dispatch }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAPI = () => {
      axios
        .get(url)
        .then((response) => setResponse(response.data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };

    getAPI();
  }, [dispatch, url]);

  return { response, error, loading };
};

export default useAxios;
