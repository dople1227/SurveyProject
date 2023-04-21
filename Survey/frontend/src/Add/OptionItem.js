import React, { useState } from 'react';

// 개별 선택지를 표시하고 수정하는 컴포넌트
function OptionItem({ type, option, deleteOption, updateOption }) {
  const [value, setValue] = useState(option.value);

  // 선택지 이름변경 시 이벤트
  const handleValueChange = (e) => {
    console.log('handleValueChange');
    setValue(e.target.value);
    updateOption(option.id, e.target.value);
  };

  //체크박스 이벤트
  const handleCheckboxChange = (e) => {
    console.log('handleCheckboxChange');
    updateOption(option.id, e.target.checked);
  };

  //라디오버튼 이벤트
  const handleRadioChange = (e) => {
    console.log('handleRadioChange');
    updateOption(option.id, e.target.checked);
  };

  //셀렉트 이벤트
  const handleSelectChange = (e) => {
    console.log('handleSelectChange');
    updateOption(option.id, e.target.checked);
  };

  //셀렉트의 옵션추가버튼 이벤트
  const addSelectOption = (e) => {
    console.log('addSelectOption');
    // updateOption(option.id, e.target.checked);
  };
  return (
    <div>
      {type === 'checkbox' && (
        <input
          type={type}
          name={type + option.id}
          checked={option.value}
          onChange={handleCheckboxChange}
        />
      )}
      {type === 'radio' && (
        <input type={type} name={type} onChange={handleRadioChange} />
      )}
      {type === 'select' && (
        <div>
          <button type="button" onClick={() => addSelectOption(option.id)}>
            셀렉트에 옵션추가
          </button>
          <select
            name={type + option.id}
            onChange={handleSelectChange}
          ></select>
        </div>
      )}
      <input
        type="text"
        placeholder="선택지"
        value={value}
        onChange={handleValueChange}
      />
      <button type="button" onClick={() => deleteOption(option.id)}>
        선택지 삭제
      </button>
    </div>
  );
}

export default OptionItem;
