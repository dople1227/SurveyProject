import React, { useState } from 'react';
import OptionList from './OptionList';

// 개별 문항을 표시하고 수정하는 컴포넌트
function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  // 문항제목 배열
  const [title, setTitle] = useState(question.title);
  // 문항유형 배열 (체크박스/라디오/셀렉트)
  const [type, setType] = useState(question.type);
  // 답변리스트 배열
  const [options, setOptions] = useState(question.options);

  // 문항제목 변경 시 이벤트
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    updateQuestion(question.id, { ...question, title: e.target.value });
  };

  // 문항타입 변경 시 이벤트 (셀렉트박스)
  const handleTypeChange = (e) => {
    setType(e.target.value);
    updateQuestion(question.id, { ...question, type: e.target.value });
  };

  // 답변리스트변경 시 이벤트
  const updateOptions = (updatedOptions) => {
    setOptions(updatedOptions);
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="문항 제목"
        value={title}
        onChange={handleTitleChange}
      />
      <select value={type} onChange={handleTypeChange}>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
        <option value="select">Select</option>
      </select>
      <OptionList type={type} options={options} updateOptions={updateOptions} />
      <button type="button" onClick={() => deleteQuestion(question.id)}>
        문항 삭제
      </button>
    </div>
  );
}

export default QuestionItem;
