import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// 설문지에 대한 상세 내용을 보여주는 컴포넌트
function SurveyDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [localStateDetail, setLocalStateDetail] = useState();
  // return <div>Detail {id}</div>;
  // url 파라미터값 변경 시 실행

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        // const url = `http://ec2-15-164-163-67.ap-northeast-2.compute.amazonaws.com:8000/api/detail/${id}/`;
        const url = process.env.REACT_APP_API_URL + `/detail/${id}`;
        try {
          const response = await axios.get(url);
          setLocalStateDetail(response.data);
          console.log(localStateDetail);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      } else {
        return <div>Detail {id}</div>;
      }
    };
    fetchData();
  }, [id]);

  // 페이지 로딩 및 에러처리. 추후 컴포넌트로 분리해서 구현
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-4">
      <div className="">
        <div className="shadow-md rounded px-6 py-6">
          <h1 className="">{localStateDetail && localStateDetail.surveyName}</h1>
          {localStateDetail?.questions?.map((question, index) => (
            <div key={question.questionId} className="flex flex-col py-2">
              <div className="flex gap-1">
                <p>{index + 1}.</p>
                <p>{question.questionName}</p>
              </div>
              <div className="flex gap-9">
                {question?.answers?.map((answer, index) => (
                  <div key={answer.answerId} className="flex">
                    <input type={question.questionType} checked={answer.isCheck} readOnly />
                    <p className="px-1">{answer.answerName}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SurveyDetail;
