import React, { useState } from 'react';
import AnswerItem from './AnswerItem';
import { v4 as uuidv4 } from 'uuid';

// 질문의 선택지들을 관리하는 컴포넌트
function AnswerList({
  questionType,
  questionId,
  answers,
  handleAnswersChange,
}) {
  const [localAnswerValues, setLocalAnswerList] = useState(answers);

  // 선택지 추가
  const addAnswer = () => {
    const newAnswer = {
      id: uuidv4(),
      answerName: '',
      questionType: 'checkbox',
      isCheck: false,
    };
    const updatedAnswer = [...localAnswerValues, newAnswer];
    setLocalAnswerList(updatedAnswer);
    handleAnswersChange(updatedAnswer);
  };

  // 선택지 삭제
  const deleteAnswer = (id) => {
    const updatedAnswers = localAnswerValues.filter(
      (answer) => answer.id !== id,
    );
    setLocalAnswerList(updatedAnswers);
    handleAnswersChange(updatedAnswers);
  };

  // 선택지 변경 시
  const handleAnswerValue = (id, answerState) => {
    // (개선필요) 라디오버튼 change이벤트일 시 기존 true값을 강제로 전부 false로변경
    let tempArr;
    if (questionType === 'radio' && answerState.type !== 'text') {
      tempArr = localAnswerValues.map((answer) => {
        return { ...answer, isCheck: false };
      });
    } else tempArr = localAnswerValues;

    const updatedAnswers = tempArr.map((answer) => {
      if (answer.id === id) {
        switch (answerState.type) {
          case 'text':
            return { ...answer, answerName: answerState.value };
          case 'radio':
            return { ...answer, isCheck: answerState.checked };
          default:
            return { ...answer, isCheck: answerState.checked };
        }
      } else {
        return answer;
      }
    });

    setLocalAnswerList(updatedAnswers);
    handleAnswersChange(updatedAnswers);
  };

  return (
    <div>
      {localAnswerValues.map((answer) => (
        <AnswerItem
          key={answer.id}
          questionType={questionType}
          answer={answer}
          deleteAnswer={deleteAnswer}
          handleAnswerValue={handleAnswerValue}
          questionId={questionId}
        />
      ))}
      <button
        type="button"
        onClick={addAnswer}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 "
      >
        선택지추가
      </button>
    </div>
  );
}

export default AnswerList;
