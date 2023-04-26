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
  return <div>Detail {id}</div>;
  // url 파라미터값 변경 시 실행
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id) {
  //       setLoading(true);
  //       // const url = `http://ec2-15-164-163-67.ap-northeast-2.compute.amazonaws.com:8000/api/detail/${id}/`;
  //       // const url = `http://localhost:8000/api/detail/${id}/`;
  //       try {
  //         // const response = await axios.get(url);
  //         // const { surveyName, questions } = response.data;
  //         // console.log(response.data);
  //         // setLocalStateDetail(questions);
  //         return <div>Detail {id}</div>;
  //       } catch (e) {
  //         setError(e);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       return <div>Detail {id}</div>;
  //     }
  //   };
  //   fetchData();
  // }, [id]);
}
export default SurveyDetail;
