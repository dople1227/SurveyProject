import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyDetailItem from '../detail/SurveyDetailItem';

// 설문지에 대한 상세 내용을 보여주는 컴포넌트
function Response() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [localStateDetail, setLocalStateDetail] = useState();
  const [surveyName, setSurveyName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        // const url = `http://ec2-15-164-163-67.ap-northeast-2.compute.amazonaws.com:8000/api/detail/${id}/`;
        const url = process.env.REACT_APP_API_URL + `/response/${id}`;
        try {
          const response = await axios.get(url);
          setSurveyName(response.data.surveyName);
          setLocalStateDetail(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      } else {
        return <div>Detail {id}</div>;
      }
    };
    fetchData();
  }, [id]);

  // 설문지 제목 변경 시 실행
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  // 자식컴포넌트(설문지)의 state변경될 때 실행
  const handleStateChange = (updatedSurvey) => {
    setLocalStateDetail(updatedSurvey);
  };

  // Submit 버튼클릭 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + `/api/response/`;
    const method = 'post';
    const successMessage = '설문지에 응답 했습니다.';

    // 백엔드로 전송할 데이터 SET
    const { surveyName, surveyId, questions } = localStateDetail;
    let data = {
      surveyId: surveyId,
      phoneNumber: phoneNumber,
      questions: questions,
    };

    // axios.post 요청 실행
    try {
      const response = await axios[method](url, data);
      alert(successMessage);
      // window.location.reload();
    } catch (error) {
      /*
        유효성 검사 구현
        유효성 검사 에러일시에만 alert()
        유효성 검사 및 알림메시지 설정부분은 백엔드에서 구현
        프론트엔드에서 response.data.errorMessage 하나만 사용하도록 처리하려했으나
        프레임워크에서 처리하는 response값 할당부분에 개입해야 되는걸로보여 보류
      */
      if (error.response.data.errorMessage) {
        alert(error.response.data.errorMessage);
        console.error('유효성 검사 실패:', error);
      } else if (error.response.data.non_field_errors) {
        alert(error.response.data.non_field_errors);
        console.error('유효성 검사 실패:', error);
      } else if (error.response.data.name) {
        alert(error.response.data.name);
        console.error('유효성 검사 실패:', error);
      } else if (error.response.data.phoneNumber) {
        alert(error.response.data.phoneNumber);
        console.error('유효성 검사 실패:', error);
      } else console.error('API 요청 실패:', error);
    }
  };

  // 페이지 로딩 및 에러처리. 추후 컴포넌트로 분리해서 구현
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-10">
      <div className="shadow-xl rounded px-6 py-6 ">
        <h1 className="py-4">{surveyName}</h1>
        <SurveyDetailItem survey={localStateDetail} handleStateChange={handleStateChange} />
        <div className="mt-10 flex gap-4">
          <form onSubmit={handleSubmit}>
            <label>전화번호</label>
            <input
              type="tel"
              pattern="[0-9]{9,12}"
              required
              className="mr-2 ml-2 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
            <button
              onClick={handleSubmit}
              className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white  px-2 border border-blue-500 hover:border-transparent rounded  "
            >
              응답하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Response;
