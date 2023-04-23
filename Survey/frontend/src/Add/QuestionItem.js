import React, { useState } from 'react';
import AnswerList from './AnswerList';

// 개별 질문을 표시하고 수정하는 컴포넌트
function QuestionItem({ question, deleteQuestion, handleQuestions }) {
  // 질문제목 배열
  const [questionName, setQuestionName] = useState(question.questionName);
  // 질문유형 배열 (체크박스/라디오/셀렉트)
  const [questionType, setQuestionType] = useState(question.questionType);
  // 선택지리스트 배열
  const [answers, setAnswers] = useState(question.answers);

  // 질문제목 변경 시 이벤트
  const handleTitleChange = (e) => {
    setQuestionName(e.target.value);
    handleQuestions(question.id, { ...question, questionName: e.target.value });
  };

  // 질문타입 변경 시 이벤트 (셀렉트박스)
  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
    handleQuestions(question.id, { ...question, questionType: e.target.value });
  };

  // 선택지리스트변경 시 이벤트
  const handleAnswersChange = (updatedAnswers) => {
    setAnswers(updatedAnswers);
    handleQuestions(question.id, { ...question, answers: updatedAnswers });
  };

  return (
    <div className="">
      <div className="mt-14 flex flex-wrap">
        <div className=" flex-col mb-2">
          <input
            type="text"
            placeholder="질문을 입력하세요"
            value={questionName}
            onChange={handleTitleChange}
            className="border border-gray-300 focus:outline-none focus:border-blue-700 mr-2"
          />
          <button
            type="button"
            onClick={() => deleteQuestion(question.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 "
          >
            질문삭제
          </button>
        </div>
        <div className="ml-1 mr-1">
          <select value={questionType} onChange={handleTypeChange}>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
          </select>
        </div>
        <div className="">
          <AnswerList
            questionType={questionType}
            answers={answers}
            handleAnswersChange={handleAnswersChange}
            questionId={question.id}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
