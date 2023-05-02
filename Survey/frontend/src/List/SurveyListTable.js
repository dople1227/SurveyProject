import React from 'react';
import { SlWrench, SlTrash, SlPencil } from 'react-icons/sl';

const SurveyListTable = ({
  data,
  handleClickModify,
  handleClickDelete,
  handleClickDetail,
  handleClickResponse,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-2">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">번호</th>
            <th className="px-6 py-4 font-medium text-gray-900">이름</th>
            <th className="px-6 py-4 font-medium text-gray-900">문항수</th>
            <th className="px-6 py-4 font-medium text-gray-900">선택지수</th>
            <th className="px-6 py-4 font-medium text-gray-900">응답수</th>
            <th className="px-6 py-4 font-medium text-gray-900">Icons</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((data) => (
            <tr key={data.surveyId} className="hover:bg-gray-50">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900 ">{data.surveyId}</th>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">
                <button className="" onClick={handleClickDetail} data-surveyid={data.surveyId}>
                  {data.name}
                </button>
              </td>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">{data.questionCount}</td>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">{data.answerCount}</td>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">{data.respondentCount}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2  ">
                  <div className="">
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={handleClickModify}
                      data-surveyid={data.surveyId}
                    >
                      <SlWrench></SlWrench>
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={handleClickDelete}
                      data-surveyid={data.surveyId}
                    >
                      <SlTrash></SlTrash>
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={handleClickResponse}
                      data-surveyid={data.surveyId}
                    >
                      <SlPencil></SlPencil>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SurveyListTable;
