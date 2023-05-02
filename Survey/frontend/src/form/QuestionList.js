import React, { useState } from 'react';
import QuestionItem from './QuestionItem';
import { v4 as uuidv4 } from 'uuid';

/*
  질문들을 관리하는 컴포넌트. 질문 동적추가 / 생성 담당
*/
function QuestionList({ handleQuestionsChange, questions }) {
  const [localStateQuestions, setLocalStateQuestions] = useState(questions || []);

  // 질문추가 버튼클릭 시 실행
  const onClickAddQuestion = () => {
    const newQuestion = {
      questionId: uuidv4(),
      questionName: '',
      questionType: 'checkbox',
      answers: [],
    };
    const newStateQuestions = [...localStateQuestions, newQuestion];
    setLocalStateQuestions(newStateQuestions);
    handleQuestionsChange(newStateQuestions);
  };

  // 질문삭제 버튼클릭 시 실행
  const handleDeleteQuestion = (questionId) => {
    const removeQuestions = localStateQuestions.filter(
      (question) => question.questionId !== questionId,
    );
    setLocalStateQuestions(removeQuestions);
    handleQuestionsChange(removeQuestions);
  };

  // 자식컴포넌트(질문들) state변경 시 실행
  const handleStateQuestions = (questionId, updatedQuestions) => {
    const newQuestions = localStateQuestions.map((question) =>
      question.questionId === questionId ? updatedQuestions : question,
    );
    setLocalStateQuestions(newQuestions);
    handleQuestionsChange(newQuestions);
  };

  return (
    <div className="">
      <div className="">
        <button
          type="button"
          onClick={onClickAddQuestion}
          className="mt-2 bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded  "
        >
          질문추가
        </button>
        {localStateQuestions.map((question) => (
          <div className="" key={question.questionId}>
            <QuestionItem
              question={question}
              handleDeleteQuestion={handleDeleteQuestion}
              handleStateQuestions={handleStateQuestions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
