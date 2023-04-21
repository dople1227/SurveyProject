import React, { useState } from 'react';
import OptionItem from './OptionItem';

// 문항의 선택지를 관리하는 컴포넌트
function OptionList({ type, options, updateOptions }) {
  const [localOptions, setLocalOptions] = useState(options);

  const addOption = () => {
    const newOption = {
      id: Date.now(),
      value: '',
    };
    const updatedOptions = [...localOptions, newOption];
    setLocalOptions(updatedOptions);
    updateOptions(updatedOptions);
  };

  // 선택지 삭제버튼 이벤트
  const deleteOption = (id) => {
    const updatedOptions = localOptions.filter((option) => option.id !== id);
    setLocalOptions(updatedOptions);
    updateOptions(updatedOptions);
  };

  // 선택지 state변경
  const updateOption = (id, value) => {
    const updatedOptions = localOptions.map((option) =>
      option.id === id ? { ...option, value } : option,
    );
    setLocalOptions(updatedOptions);
    updateOptions(updatedOptions);
  };

  return (
    <div>
      {localOptions.map((option) => (
        <OptionItem
          key={option.id}
          type={type}
          option={option}
          deleteOption={deleteOption}
          updateOption={updateOption}
        />
      ))}
      <button type="button" onClick={addOption}>
        선택지 추가
      </button>
    </div>
  );
}

export default OptionList;
