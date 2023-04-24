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
    //질문유형 변경 시 기존 체크된 값들을 전부 false로 초기화하고 첫번째 항목을 true로 변경
    //정상작동안함. 수정필요
    // let updatedAnswers = [];
    // if (e.target.value === 'radio') {
    //   updatedAnswers = question.answers.map((answer, index) => ({
    //     ...answer,
    //     isCheck: index === 0 ? true : false,
    //   }));
    // } else {
    //   updatedAnswers = question.answers.map((answer) => ({
    //     ...answer,
    //     isCheck: false,
    //   }));
    // }

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
            onClick={() => handleDeleteQuestion(question.questionId)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 "
          >
            질문삭제
          </button>
        </div>
        <div className="ml-1 mr-1">
          <select value={question.questionType} onChange={onChangeQuestionType}>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
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
