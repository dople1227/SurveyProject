// 개별 선택지을 표시하고 수정하는 컴포넌트
import { useState } from 'react';

function AnswerItem({ question, answer, handleDeleteAnswer, handleStateAnswers }) {
  // 선택지 이름변경 시 이벤트
  const onChangeName = (e) => {
    handleStateAnswers(answer.answerId, e.target);
  };
  return (
    <div className="flex flex-row ml-1">
      <div className="mb-1 ml-1">
        <input
          type="text"
          placeholder="선택지"
          onChange={onChangeName}
          className="shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500 mr-2"
          value={answer.answerName}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white  px-2 border border-blue-500 hover:border-transparent rounded  "
          type="button"
          onClick={() => handleDeleteAnswer(answer.answerId)}
        >
          선택지삭제
        </button>
      </div>
    </div>
  );
}

export default AnswerItem;
