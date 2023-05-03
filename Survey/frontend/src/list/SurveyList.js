import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import SurveyListTable from './SurveyListTable';
import useFetchTable from '../hooks/useFetchTable';
import axios from 'axios';

function SurveyList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, loading, error, totalPages } = useFetchTable(
    // process.env.REACT_APP_API_URL + '/api/survey',
    process.env.REACT_APP_API_URL + '/api/list',
    {},
    page,
  );

  // 페이지 이동시 실행
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // 설문지명 클릭 시 실행
  const handleClickDetail = (e) => {
    const surveyId = e.currentTarget.dataset.surveyid;
    if (surveyId) {
      navigate(`/detail/${surveyId}`);
    }
  };

  // 수정클릭 시 실행
  const handleClickModify = (e) => {
    const surveyId = e.currentTarget.dataset.surveyid;
    if (surveyId) {
      navigate(`/form/${surveyId}`);
    }
  };

  // 삭제클릭 시 실행
  const handleClickDelete = async (e) => {
    //axios요청에 필요한 변수 SET
    const surveyId = e.currentTarget.dataset.surveyid;
    const url = process.env.REACT_APP_API_URL + `/api/survey/${surveyId}/`;
    // const url = `http://localhost:8000/api/survey/${surveyId}/`;
    const method = 'delete';
    const successMessage = '설문지가 삭제되었습니다.';

    // axios.delete 요청 실행
    try {
      await axios[method](url);
      alert(successMessage);
      window.location.reload(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  // 응답클릭 클릭 시 실행
  const handleClickResponse = (e) => {
    const surveyId = e.currentTarget.dataset.surveyid;
    if (surveyId) {
      navigate(`/response/${surveyId}`);
    }
  };

  // 페이지 로딩 및 에러처리. 추후 컴포넌트로 분리해서 구현
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-8">
      <SurveyListTable
        data={data}
        handleClickModify={handleClickModify}
        handleClickDelete={handleClickDelete}
        handleClickDetail={handleClickDetail}
        handleClickResponse={handleClickResponse}
      />
      <Pagination count={totalPages} page={page} onChange={handleChangePage} />
    </div>
  );
}

export default SurveyList;
