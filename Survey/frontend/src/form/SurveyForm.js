import { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// 설문지에 대한 정보와 문항을 관리하는 컴포넌트
function SurveyForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [surveyName, setSurveyName] = useState('');
  const [localStateSurvey, setLocalStateSurvey] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  // 파라미터가 변경될 때만 실행
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        setIsEdit(true);
        const url = `http://localhost:8000/api/survey/${id}/`;
        try {
          const response = await axios.get(url);
          const { surveyName, questions } = response.data;
          setSurveyName(surveyName);
          setLocalStateSurvey(questions);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  // 자식컴포넌트(질문,선택지)의 상태변경 시
  const handleQuestionsChange = (updatedSurvey) => {
    setLocalStateSurvey(updatedSurvey);
  };

  // 설문지 제목변경
  const onChangeSurveyName = (e) => {
    setSurveyName(e.target.value);
    setLocalStateSurvey();
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 요청할 데이터 SET
    const url = isEdit
      ? `http://localhost:8000/api/survey/${id}/`
      : 'http://localhost:8000/api/survey/';
    const method = isEdit ? 'put' : 'post';

    const api = axios.create({
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      // withCredentials: true,
    });
    const data = {
      surveyName: surveyName,
      questions: localStateSurvey,
    };

    /*  미구현 */

    // axios.post 요청 보내기
    try {
      const response = await api[method](url, data);
      alert('설문지가 생성되었습니다.');
    } catch (error) {
      /*
        유효성 검사에 실패한 에러메시지만 alert()으로 보여줌
        유효성 검사 및 알림메시지 설정부분은 백엔드로 구현
        프론트엔드에선 response.data.errorMessage만 받으면 되는걸로 처리하려했으나
        DRF의 response 값 세팅부분에 강제로 개입해야 되는거라 1차시도 실패
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-10 py-5">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex flex-row">
            <div className="flex flex-col basis-1/4 ">
              <label className="mb-1 font-semibold">설문지 이름</label>
              <input
                type="text"
                placeholder="설문지 이름"
                value={surveyName}
                onChange={onChangeSurveyName}
                className="border border-gray-300 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>
          <QuestionList
            handleQuestionsChange={handleQuestionsChange}
            questions={localStateSurvey}
          />
        </div>
        <div>
          <div className="flex-col w-1/2 mt-14">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 "
            >
              등록하기
            </button>
          </div>
          <div className="flex-col w-1/2"></div>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
