import React from 'react';
import { useParams } from 'react-router-dom';

// 설문지에 대한 자세한 내용을 보여주는 컴포넌트
function SurveyDetail() {
  const { id } = useParams();
  return <div>Detail {id}</div>;
}
export default SurveyDetail;
