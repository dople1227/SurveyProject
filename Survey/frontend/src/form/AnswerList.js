import React, { useEffect, useState } from 'react';
import AnswerItem from './AnswerItem';
import { v4 as uuidv4 } from 'uuid';

/*
  선택지들을 관리하는 컴포넌트. 선택지 동적추가 / 생성 담당
*/
function AnswerList({ question, answers, handleAnswersChange }) {
  const [localStateAnswers, setLocalStateAnswers] = useState(answers);
  // 선택지 추가
  const onClickAddAnswer = () => {
    const newAnswer = {
      answerId: uuidv4(),
      answerName: '',
    };

    const newStateAnswerss = [...localStateAnswers, newAnswer];
    setLocalStateAnswers(newStateAnswerss);
    handleAnswersChange(newStateAnswerss);
  };

  // 선택지 삭제 버튼클릭 시 실행
  const handleDeleteAnswer = (answerId) => {
    const updatedAnswers = localStateAnswers.filter((answer) => answer.answerId !== answerId);
    setLocalStateAnswers(updatedAnswers);
    handleAnswersChange(updatedAnswers);
  };

  // 자식컴포넌트(선택지들) state변경 시 실행
  const handleStateAnswers = (answerId, updatedAnswers) => {
    // 위 결과값에 state의 값을 반영
    const newAnswers = localStateAnswers.map((answer) => {
      if (answer.answerId === answerId) {
        return { ...answer, answerName: updatedAnswers.value };
      } else return answer;
    });
    setLocalStateAnswers(newAnswers);
    handleAnswersChange(newAnswers);
  };

  return (
    <div>
      {localStateAnswers.map((answer) => (
        <AnswerItem
          key={answer.answerId}
          question={question}
          answer={answer}
          handleDeleteAnswer={handleDeleteAnswer}
          handleStateAnswers={handleStateAnswers}
        />
      ))}
      <button
        type="button"
        onClick={onClickAddAnswer}
        className="mt- bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white px-2 border border-blue-500 hover:border-transparent rounded  "
      >
        선택지추가
      </button>
    </div>
  );
}

export default AnswerList;
