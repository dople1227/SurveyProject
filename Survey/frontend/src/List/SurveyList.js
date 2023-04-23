import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import SurveyListTable from './SurveyListTable';
import useFetchTable from '../hooks/useFetchTable';

function SurveyList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, loading, error, totalPages } = useFetchTable(
    'http://localhost:8000/api/survey',
    {},
    page,
  );

  // 페이지 이동
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Survey 수정 클릭시 실행되는 함수
  const handleClickModify = (e) => {
    const surveyId = e.target.dataset.surveyid;
    if (surveyId) {
      navigate(`/form/${surveyId}`);
    }
  };

  // Survey 삭제 클릭시 실행되는 함수
  const handleClickDelete = (e) => {
    console.log(e);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SurveyListTable
        data={data}
        handleClickModify={handleClickModify}
        handleClickDelete={handleClickDelete}
      />
      <Pagination count={totalPages} page={page} onChange={handleChangePage} />
    </div>
  );
}

export default SurveyList;
