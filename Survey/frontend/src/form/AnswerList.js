import React, { useEffect, useState } from 'react';
import AnswerItem from './AnswerItem';
import { v4 as uuidv4 } from 'uuid';

// 질문의 선택지들을 관리하는 컴포넌트
function AnswerList({ question, answers, handleAnswersChange }) {
  const [localStateAnswers, setLocalStateAnswers] = useState(answers);
  // 선택지 추가
  const onClickAddAnswer = () => {
    const newAnswer = {
      answerId: uuidv4(),
      answerName: '',
      isCheck: question.questionType === 'radio' ? true : false,
    };

    const newStateAnswerss = [...localStateAnswers, newAnswer];
    setLocalStateAnswers(newStateAnswerss);
    handleAnswersChange(newStateAnswerss);
  };

  // 선택지 삭제
  const handleDeleteAnswer = (answerId) => {
    const updatedAnswers = localStateAnswers.filter((answer) => answer.answerId !== answerId);
    setLocalStateAnswers(updatedAnswers);
    handleAnswersChange(updatedAnswers);
  };

  // 자식컴포넌트(선택지들)의 상태변경 시
  const handleStateAnswers = (answerId, updatedAnswers) => {
    // 라디오버튼 change이벤트일 시 기존 true값을 강제로 전부 false로변경
    let tempArr;
    if (question.questionType === 'radio' && updatedAnswers.type !== 'text') {
      tempArr = localStateAnswers.map((answer) => {
        return { ...answer, isCheck: false };
      });
    } else tempArr = localStateAnswers;

    const newAnswers = tempArr.map((answer) => {
      if (answer.answerId === answerId) {
        switch (updatedAnswers.type) {
          case 'text':
            return { ...answer, answerName: updatedAnswers.value };
          case 'radio':
            return { ...answer, isCheck: updatedAnswers.checked };
          default:
            return { ...answer, isCheck: updatedAnswers.checked };
        }
      } else {
        return answer;
      }
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 "
      >
        선택지추가
      </button>
    </div>
  );
}

export default AnswerList;
