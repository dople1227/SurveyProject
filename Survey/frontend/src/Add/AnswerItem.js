import React, { useState } from 'react';

// 개별 선택지을 표시하고 수정하는 컴포넌트
function AnswerItem({
  questionType,
  questionId,
  answer,
  deleteAnswer,
  handleAnswerValue,
}) {
  // 선택지 이름변경 시 이벤트
  const handleNameChange = (e) => {
    handleAnswerValue(answer.id, e.target);
  };

  //체크박스 이벤트
  const handleCheckboxChange = (e) => {
    handleAnswerValue(answer.id, e.target);
  };

  //라디오버튼 이벤트
  const handleRadioChange = (e) => {
    handleAnswerValue(answer.id, e.target);
  };

  //셀렉트 이벤트
  const handleSelectChange = (e) => {
    handleAnswerValue(answer.id, e.target);
  };

  //셀렉트의 옵션추가버튼 이벤트
  const addSelectAnswer = (e) => {
    // updateOption(option.id, e.target.checked);
  };
  return (
    <div className="flex flex-row ml-1">
      <div>
        {questionType === 'checkbox' && (
          <input
            type={questionType}
            name={questionType + answer.id}
            checked={answer.value}
            onChange={handleCheckboxChange}
          />
        )}
        {questionType === 'radio' && (
          <input
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            type={questionType}
            name={questionType + questionId}
            onChange={handleRadioChange}
          />
        )}
        {questionType === 'select' && (
          <div>
            <button type="button" onClick={() => addSelectAnswer(answer.id)}>
              셀렉트에 옵션추가
            </button>
            <select
              name={questionType + answer.id}
              onChange={handleSelectChange}
            ></select>
          </div>
        )}
      </div>
      <div className="mb-1 ml-1">
        <input
          type="text"
          placeholder="선택지"
          onChange={handleNameChange}
          className="border border-gray-300 focus:outline-none focus:border-blue-700"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 ml-1 "
          type="button"
          onClick={() => deleteAnswer(answer.id)}
        >
          선택지삭제
        </button>
      </div>
    </div>
  );
}

export default AnswerItem;
