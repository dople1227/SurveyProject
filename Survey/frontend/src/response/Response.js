import React from 'react';
import { useParams } from 'react-router-dom';

// 설문지에 응답하는 컴포넌트
const Response = () => {
  const { id } = useParams();
  return <h2>Response {id}</h2>;
};

export default Response;
