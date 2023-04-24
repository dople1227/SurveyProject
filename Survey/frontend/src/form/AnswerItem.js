// 개별 선택지을 표시하고 수정하는 컴포넌트
import { useState } from 'react';

function AnswerItem({ question, answer, handleDeleteAnswer, handleStateAnswers }) {
  const [localQuestion, setLocalQuestion] = useState(question);
  const [localAnswer, setLocalAnswer] = useState(answer);

  // 선택지 이름변경 시 이벤트
  const onChangeName = (e) => {
    handleStateAnswers(answer.answerId, e.target);
  };

  //체크박스 이벤트
  const onChangeCheckbox = (e) => {
    setLocalAnswer(e.target.isCheck);
    handleStateAnswers(answer.answerId, e.target);
  };

  //라디오버튼 이벤트
  const onChangeRadio = (e) => {
    setLocalAnswer(e.target.isCheck);
    handleStateAnswers(answer.answerId, e.target);
  };

  //셀렉트 이벤트
  const onChangeSelect = (e) => {
    setLocalAnswer(e.target.isCheck);
    handleStateAnswers(answer.answerId, e.target);
  };

  //셀렉트의 옵션추가버튼 이벤트
  const onClickAddSelectOptions = (e) => {
    // updateOption(option.id, e.target.checked);
  };
  return (
    <div className="flex flex-row ml-1">
      <div>
        {question.questionType === 'checkbox' && (
          <input
            type={question.questionType}
            name={question.questionType + answer.answerId}
            checked={answer.isCheck}
            onChange={onChangeCheckbox}
          />
        )}
        {question.questionType === 'radio' && (
          <input
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            type={question.questionType}
            name={question.questionType + question.questionId}
            checked={answer.isCheck}
            onChange={onChangeRadio}
          />
        )}
        {question.questionType === 'select' && (
          <div>
            <button type="button" onClick={() => onClickAddSelectOptions(answer.answerId)}>
              셀렉트에 옵션추가
            </button>
            <select
              name={localQuestion.questionType + answer.answerId}
              onChange={onChangeSelect}
            ></select>
          </div>
        )}
      </div>
      <div className="mb-1 ml-1">
        <input
          type="text"
          placeholder="선택지"
          onChange={onChangeName}
          className="border border-gray-300 focus:outline-none focus:border-blue-700"
          value={answer.answerName}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 ml-1 "
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
