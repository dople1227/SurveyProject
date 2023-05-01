import React, { useState } from 'react';

// 설문지에 대한 상세 내용을 보여주는 컴포넌트
function SurveyDetailItem({ survey, handleStateChange }) {
  const [localStateSurvey, setlocalStateSurvey] = useState(survey || []);

  return (
    <div className="shadow-xl rounded px-6 py-6 ">
      <h1 className="">{localStateSurvey.surveyName}</h1>
      {localStateSurvey.questions?.map((question, index) => (
        <div key={question.questionId} className="flex flex-col py-2">
          <div className="">
            <label>{index + 1}.</label>
            <label>{question.questionName}</label>
          </div>
          <div className="flex flex-wrap">
            {question?.answers?.map((answer, index) => (
              <div className="flex px-3" key={answer.answerId}>
                <input
                  id={answer.answerId}
                  type={question.questionType}
                  checked={answer.isCheck}
                  readOnly
                />
                <label htmlFor={answer.answerId} className="px-1">
                  {answer.answerName}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SurveyDetailItem;
