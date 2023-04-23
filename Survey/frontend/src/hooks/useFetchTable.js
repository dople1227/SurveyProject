import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchTable(url, params, page) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get 요청
        const response = await axios.get(url, { params: { ...params, page } });
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 5));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, page]);

  return { data, loading, error, totalPages };
}

export default useFetchTable;
