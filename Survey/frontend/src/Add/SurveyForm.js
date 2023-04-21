import React, { useState } from 'react';
import QuestionList from './QuestionList';
import axios from 'axios';

// 설문지에 대한 정보와 문항을 관리하는 컴포넌트
function SurveyForm() {
  const [title, setTitle] = useState('');

  //설문지 제목 변경시
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  //submit 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    const surveyData = {
      title,
      //여기에 문항의 모든 정보를 가져온다.
      questions: { title: '', type: '', options: {} },
      // questions.map((question) => {
      //   return {
      //     title: question.title,
      //     type: question.type,
      //     options: question.options.map((option) => option.value),
      //   };}),
    };
    axios
      .post('api/survey', { surveyData })
      .then((res) => {
        console.log(res);
        console.log('seccess');
      })
      .catch((err) => {
        console.log(err);
        console.log('fail');
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>설문지 생성</h1>
      <div>
        <input
          type="text"
          placeholder="설문지 제목"
          value={title}
          onChange={handleTitleChange}
        />
        <QuestionList />
        {/* <QuestionList questions={questions} setQuestions={setQuestions} /> */}
      </div>
      <button>POST전송</button>
    </form>
  );
}

export default SurveyForm;
