import React, { useState } from 'react';
import QuestionItem from './QuestionItem';
import { v4 as uuidv4 } from 'uuid';

// 질문들을 관리하는 컴포넌트
function QuestionList({ handleQuestionsChange }) {
  const [localStateQuestions, setLocalStateQuestions] = useState([]);

  // 질문추가
  const onClickAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      questionName: '',
      questionType: 'checkbox',
      answers: [],
    };
    const newStateQuestions = [...localStateQuestions, newQuestion];
    setLocalStateQuestions(newStateQuestions);
    handleQuestionsChange(newStateQuestions);
  };

  // 질문삭제
  const handleDeleteQuestion = (id) => {
    const removeQuestions = localStateQuestions.filter(
      (question) => question.id !== id,
    );
    setLocalStateQuestions(removeQuestions);
    handleQuestionsChange(removeQuestions);
  };

  // 자식컴포넌트(질문들)의 상태변경 시
  const handleStateQuestions = (id, updatedQuestions) => {
    const newQuestions = localStateQuestions.map((question) =>
      question.id === id ? updatedQuestions : question,
    );
    setLocalStateQuestions(newQuestions);
    handleQuestionsChange(newQuestions);
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={onClickAddQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2  "
      >
        질문추가
      </button>
      {localStateQuestions.map((question) => (
        <div className="flex flex-row" key={question.id}>
          <QuestionItem
            question={question}
            handleDeleteQuestion={handleDeleteQuestion}
            handleStateQuestions={handleStateQuestions}
          />
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
