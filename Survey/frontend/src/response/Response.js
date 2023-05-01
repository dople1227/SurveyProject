import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyDetailItem from '../detail/SurveyDetailItem';

// 설문지에 대한 상세 내용을 보여주는 컴포넌트
function Response() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [localStateDetail, setLocalStateDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        // const url = `http://ec2-15-164-163-67.ap-northeast-2.compute.amazonaws.com:8000/api/detail/${id}/`;
        const url = process.env.REACT_APP_API_URL + `/detail/${id}`;
        try {
          const response = await axios.get(url);
          setLocalStateDetail(response.data);
          // console.log(localStateDetail);
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

  // 자식컴포넌트(설문지)의 state변경될 때 실행
  const handleStateChange = (updatedSurvey) => {
    setLocalStateDetail(updatedSurvey);
  };

  // Submit 버튼클릭 시 실행
  const handleSubmit = async (e) => {
    console.log(localStateDetail);
  };

  // 페이지 로딩 및 에러처리. 추후 컴포넌트로 분리해서 구현
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-10">
      <SurveyDetailItem survey={localStateDetail} handleStateChange={handleStateChange} />
      <div className="mt-10 flex gap-4">
        <form onSubmit={handleSubmit}>
          <label>전화번호</label>
          <input
            type="tel"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
            required
            className="border border-blue-200 focus:outline-none focus:border-blue-400 mr-2"
          />
          <button
            onClick={handleSubmit}
            className="focus:ring-2 focus:ring-offset-2  focus:ring-red-300 text-sm leading-none text-gray-600 py-1 px-5 bg-blue-200 rounded hover:bg-blue-400 focus:outline-none"
          >
            응답하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default Response;
