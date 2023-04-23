import React, { useState } from 'react';
import AnswerList from './AnswerList';

// 개별 질문을 표시하고 수정하는 컴포넌트
function QuestionItem({
  question,
  handleDeleteQuestion,
  handleStateQuestions,
}) {
  // 질문제목 변경 시 이벤트
  const onChangeTitle = (e) => {
    handleStateQuestions(question.id, {
      ...question,
      questionName: e.target.value,
    });
  };

  // 질문타입 변경 시 이벤트 (셀렉트박스)
  const onChangeType = (e) => {
    handleStateQuestions(question.id, {
      ...question,
      questionType: e.target.value,
    });
  };

  // 자식컴포넌트(선택지들)의 상태변경 시 이벤트
  const handleAnswersChange = (updatedAnswers) => {
    handleStateQuestions(question.id, { ...question, answers: updatedAnswers });
  };

  return (
    <div className="">
      <div className="mt-14 flex flex-wrap">
        <div className=" flex-col mb-2">
          <input
            type="text"
            placeholder="질문을 입력하세요"
            value={question.questionName}
            onChange={onChangeTitle}
            className="border border-gray-300 focus:outline-none focus:border-blue-700 mr-2"
          />
          <button
            type="button"
            onClick={() => handleDeleteQuestion(question.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 "
          >
            질문삭제
          </button>
        </div>
        <div className="ml-1 mr-1">
          <select value={question.questionType} onChange={onChangeType}>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
          </select>
        </div>
        <div className="">
          <AnswerList
            questionType={question.questionType}
            answers={question.answers}
            handleAnswersChange={handleAnswersChange}
            questionId={question.id}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
