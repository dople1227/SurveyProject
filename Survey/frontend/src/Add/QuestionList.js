import React, { useState } from 'react';
import QuestionItem from './QuestionItem';

// 문항들을 관리하는 컴포넌트
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      title: '',
      type: 'checkbox',
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  //문항 삭제
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  //답변리스트의 변경된 상태를 반영
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? updatedQuestion : question,
      ),
    );
  };

  return (
    <div>
      <button type="button" onClick={addQuestion}>
        문항 추가
      </button>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      ))}
    </div>
  );
}

export default QuestionList;
