import React from "react";

const SurveyListTable = ({ data, loading, error }) => {
    return (       
        <table>
        <caption>설문지 리스트</caption>
        <thead>
            <tr>
                <td>번호</td>                    
                <th>이름</th>
                <th>문항수</th>
                <th>응답자수</th>
            </tr>
        </thead>
        <tbody>
        {data.map(data =>(
            <tr key={data.surveyId}>
                <td>{data.surveyId}</td>
                <td>{data.name}</td>
                <td>{data.questionCount}</td>
                <td>{data.name}</td>
            </tr>                
        ))}
        </tbody>
    </table>
    );
  };
  export default SurveyListTable;