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

  // 페이지 이동시 실행
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // 수정하기 클릭 시 실행
  const handleClickModify = (e) => {
    const surveyId = e.target.dataset.surveyid;
    if (surveyId) {
      navigate(`/form/${surveyId}`);
    }
  };

  // 삭제하기 클릭 시 실행
  const handleClickDelete = (e) => {
    console.log(e);
  };

  // 페이지 로딩 및 에러처리. 추후 컴포넌트로 분리해서 구현
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
