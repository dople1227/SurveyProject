import React, { useEffect, useState } from 'react';
import AnswerItem from './AnswerItem';
import { v4 as uuidv4 } from 'uuid';

// 질문의 선택지들을 관리하는 컴포넌트
function AnswerList({
  questionType,
  questionId,
  answers,
  handleAnswersChange,
}) {
  const [localStateAnswers, setLocalStateAnswers] = useState(answers);
  // 선택지 추가
  const onClickAddAnswer = () => {
    const newAnswer = {
      id: uuidv4(),
      answerName: '',
      isCheck: questionType === 'radio' ? true : false,
    };

    const newStateAnswerss = [...localStateAnswers, newAnswer];
    setLocalStateAnswers(newStateAnswerss);
    handleAnswersChange(newStateAnswerss);
  };

  // 선택지 삭제
  const handleDeleteAnswer = (id) => {
    const updatedAnswers = localStateAnswers.filter(
      (answer) => answer.id !== id,
    );
    setLocalStateAnswers(updatedAnswers);
    handleAnswersChange(updatedAnswers);
  };

  // 자식컴포넌트(선택지들)의 상태변경 시
  const handleStateAnswers = (id, updatedAnswers) => {
    // (개선필요) 라디오버튼 change이벤트일 시 기존 true값을 강제로 전부 false로변경
    let tempArr;
    if (questionType === 'radio' && updatedAnswers.type !== 'text') {
      tempArr = localStateAnswers.map((answer) => {
        return { ...answer, isCheck: false };
      });
    } else tempArr = localStateAnswers;

    const newAnswers = tempArr.map((answer) => {
      if (answer.id === id) {
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
          key={answer.id}
          questionType={questionType}
          answer={answer}
          handleDeleteAnswer={handleDeleteAnswer}
          handleStateAnswers={handleStateAnswers}
          questionId={questionId}
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
