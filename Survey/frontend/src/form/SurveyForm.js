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

  // url 파라미터값 변경 시 실행
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
      } else {
        if (isEdit) {
          setIsEdit(false);
          window.location.reload();
        }
      }
    };
    fetchData();
  }, [id]);

  // 자식컴포넌트(질문,선택지)의 state변경될 때 실행
  const handleQuestionsChange = (updatedSurvey) => {
    setLocalStateSurvey(updatedSurvey);
  };

  // 설문지 제목 변경 시 실행
  const onChangeSurveyName = (e) => {
    setSurveyName(e.target.value);
  };

  // Submit 버튼클릭 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가 or 수정에따라 변경되는 값 SET
    let url, method, successMessage;
    if (isEdit) {
      url = `http://localhost:8000/api/survey/${id}/`;
      method = 'put';
      successMessage = '설문지가 수정되었습니다.';
    } else {
      url = `http://localhost:8000/api/survey/`;
      method = 'post';
      successMessage = '설문지가 생성되었습니다.';
    }

    // 서버의 CORS 세팅과 일치되도록 SET
    const api = axios.create({
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      // withCredentials: true,
    });

    // 백엔드로 전송할 데이터 SET
    const data = {
      surveyName: surveyName,
      questions: localStateSurvey,
    };
    // console.log(data);
    // axios.post 요청 실행
    try {
      const response = await api[method](url, data);
      alert(successMessage);
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
              {isEdit ? '수정하기' : '등록하기'}
            </button>
          </div>
          <div className="flex-col w-1/2"></div>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
