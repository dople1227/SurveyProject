import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import SurveyListTable from './SurveyListTable';

function SurveyList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (page) => {
      const url = 'http://localhost:8000/api/survey';
      try {
        // 로딩 및 에러처리 초기화
        setError(null);
        setData(null);
        setLoading(true);

        // 설문지목록 get요청
        const response = await axios.get(url, {
          params: { page: page },
        });
        console.log(response.data.results);
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  // 로딩 및 에러처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  // 페이징 이벤트
  const handleChangePage = (event, value) => setPage(value);

  return (
    <div>
      <SurveyListTable data={data}></SurveyListTable>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
      ></Pagination>
    </div>
  );
}

export default SurveyList;
