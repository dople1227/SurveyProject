import React, { useState } from 'react';
import AnswerList from './AnswerList';

// 개별 질문을 표시하고 수정하는 컴포넌트
function QuestionItem({ question, handleDeleteQuestion, handleStateQuestions }) {
  // 질문제목 변경 시 실행
  const onChangeTitle = (e) => {
    handleStateQuestions(question.questionId, {
      ...question,
      questionName: e.target.value,
    });
  };

  // 질문타입 변경 시 실행
  const onChangeQuestionType = (e) => {
    // 결과 state 부모 컴포넌트로 전달
    handleStateQuestions(question.questionId, {
      ...question,
      questionType: e.target.value,
    });
  };

  // 자식컴포넌트(선택지들) state변경 시 실행
  const handleAnswersChange = (updatedAnswers) => {
    handleStateQuestions(question.questionId, { ...question, answers: updatedAnswers });
  };

  return (
    <div className="">
      <div className="mt-14 flex">
        <div className=" flex-col mb-2">
          <input
            type="text"
            placeholder="질문을 입력하세요"
            value={question.questionName}
            onChange={onChangeTitle}
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500 mr-2"
          />
          <button
            type="button"
            onClick={() => handleDeleteQuestion(question.questionId)}
            className="mt-2 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
          >
            질문삭제
          </button>
        </div>
        <div className="ml-1 mr-1">
          <select value={question.questionType} onChange={onChangeQuestionType}>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            {/* <option value="select">Select</option> */}
          </select>
        </div>
        <div className="">
          <AnswerList
            question={question}
            answers={question.answers}
            handleAnswersChange={handleAnswersChange}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
