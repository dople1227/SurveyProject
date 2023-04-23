import React, { useState } from 'react';
import QuestionItem from './QuestionItem';
import { v4 as uuidv4 } from 'uuid';

// 질문들을 관리하는 컴포넌트
function QuestionList({ handleQuestionsChange }) {
  const [localQuestionList, setLocalQuestionList] = useState([]);

  // 질문 추가
  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      questionName: '',
      questionType: 'checkbox',
      answers: [],
    };
    const updatedQuestionList = [...localQuestionList, newQuestion];
    setLocalQuestionList(updatedQuestionList);
    handleQuestionsChange(updatedQuestionList);
  };

  // 질문 삭제
  const deleteQuestion = (id) => {
    const updatedQuestionList = localQuestionList.filter(
      (question) => question.id !== id,
    );
    setLocalQuestionList(updatedQuestionList);
    handleQuestionsChange(updatedQuestionList);
  };

  // 질문리스트 변경 시
  const handleQuestions = (id, updatedQuestion) => {
    const updatedQuestions = localQuestionList.map((question) =>
      question.id === id ? updatedQuestion : question,
    );
    setLocalQuestionList(updatedQuestions);
    handleQuestionsChange(updatedQuestions);
  };

  return (
    <span className="">
      <button
        type="button"
        onClick={addQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2  "
      >
        질문추가
      </button>
      {localQuestionList.map((question) => (
        <div className="flex flex-row">
          <QuestionItem
            key={question.id}
            question={question}
            deleteQuestion={deleteQuestion}
            handleQuestions={handleQuestions}
          />
        </div>
      ))}
    </span>
  );
}

export default QuestionList;
