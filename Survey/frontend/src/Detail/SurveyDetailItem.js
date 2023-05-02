import React, { useState } from 'react';

// 설문지에 대한 상세 내용을 보여주는 컴포넌트
function SurveyDetailItem({ survey, handleStateChange, readonly }) {
  const [localStateSurvey, setlocalStateSurvey] = useState(survey || []);

  //라디오버튼 이벤트
  const onChangeRadio = (e) => {
    if (readonly) {
    } else {
      const { id, name } = e.target;
      const questionId = Number(name);
      const answerId = Number(id);

      const updatedSurvey = {
        ...localStateSurvey,
        questions: localStateSurvey.questions.map((question) => {
          if (question.questionId === questionId) {
            return {
              ...question,
              answers: question.answers.map((answer) => {
                if (answer.answerId === answerId) {
                  return { ...answer, isCheck: true };
                } else {
                  return { ...answer, isCheck: false };
                }
              }),
            };
          } else {
            return question;
          }
        }),
      };
      setlocalStateSurvey(updatedSurvey);
      handleStateChange(updatedSurvey);
    }
  };

  //체크박스 이벤트
  const onChangeCheck = (e) => {
    if (readonly) {
    } else {
      const { id, name } = e.target;
      const questionId = Number(name);
      const answerId = Number(id);

      const updatedSurvey = {
        ...localStateSurvey,
        questions: localStateSurvey.questions.map((question) => {
          if (question.questionId === questionId) {
            return {
              ...question,
              answers: question.answers.map((answer) => {
                if (answer.answerId === answerId) {
                  return {
                    ...answer,
                    isCheck: e.target.checked,
                  };
                } else {
                  return answer;
                }
              }),
            };
          } else {
            return question;
          }
        }),
      };
      setlocalStateSurvey(updatedSurvey);
      handleStateChange(updatedSurvey);
    }
  };

  return (
    <div>
      {localStateSurvey.questions?.map((question, index) => (
        <div key={question.questionId} className="flex flex-col py-2">
          <div className="">
            <label>{index + 1}.</label>
            <label>{question.questionName}</label>
          </div>
          <div className="flex flex-wrap">
            {question?.answers?.map((answer, index) => (
              <div className="flex px-3" key={answer.answerId}>
                {question.questionType === 'checkbox' && (
                  <input
                    id={answer.answerId}
                    type={question.questionType}
                    checked={answer.isCheck || false}
                    name={question.questionId}
                    onChange={onChangeCheck}
                  />
                )}
                {question.questionType === 'radio' && (
                  <input
                    id={answer.answerId}
                    type={question.questionType}
                    checked={answer.isCheck || false}
                    name={question.questionId}
                    onChange={onChangeRadio}
                  />
                )}
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
