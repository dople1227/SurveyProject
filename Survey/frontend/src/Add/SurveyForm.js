import React, { useState } from 'react';
import QuestionList from './QuestionList';
import axios from 'axios';

// 설문지에 대한 정보와 문항을 관리하는 컴포넌트
function SurveyForm() {
  const [surveyName, setSurveyName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [questionValue, setQuestionValue] = useState();

  // 선택지리스트변경 시 이벤트
  const handleQuestionsChange = (updatedQuestions) => {
    setQuestionValue(updatedQuestions);
  };

  // 설문지 제목 변경시
  const handleTitleChange = (e) => {
    setSurveyName(e.target.value);
  };

  // // 설문지 전화번호 변경시
  // const handlePhoneNumberChange = (e) => {
  //   setphoneNumber(e.target.value);
  // };

  // submit 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = axios.create({
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-CSRFToken',
    });

    // 요청할 데이터 SET
    const url = 'http://localhost:8000/api/survey/';
    const data = {
      surveyName: surveyName,
      phoneNumber,
      questions: questionValue,
    };
    // axios.post 요청 보내기
    try {
      const response = await api.post(url, data);
      alert('설문지가 생성되었습니다.');
      console.log('API 요청 성공:', response.data);
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
                onChange={handleTitleChange}
                className="border border-gray-300 focus:outline-none focus:border-blue-700"
              />
            </div>
            {/* <div className="flex flex-col basis-1/4">
              <label className="mb-1 font-semibold">선택지자 전화번호</label>
              <input
                type="text"
                placeholder="응답자 전화번호"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="border border-gray-300 focus:outline-none focus:border-blue-700"
              />
            </div> */}
          </div>
          <QuestionList handleQuestionsChange={handleQuestionsChange} />
        </div>
        <div>
          <div className="flex-col w-1/2">
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
