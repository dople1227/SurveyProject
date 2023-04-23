/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { SlWrench } from 'react-icons/sl';
import { SlTrash } from 'react-icons/sl';

const SurveyListTable = ({ data, handleClickModify, handleClickDelete }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">번호</th>
            <th className="px-6 py-4 font-medium text-gray-900">이름</th>
            <th className="px-6 py-4 font-medium text-gray-900">문항수</th>
            <th className="px-6 py-4 font-medium text-gray-900">응답자수</th>
            <th className="px-6 py-4 font-medium text-gray-900">Icons</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((data) => (
            <tr key={data.surveyId} className="hover:bg-gray-50">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900 ">
                {data.surveyId}
              </th>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">
                {data.name}
              </td>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">
                {data.questionCount}
              </td>
              <td className="px-6 py-4 text-sm  whitespace-nowrap ">
                {data.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2  ">
                  <div className="">
                    <button
                      className="focus:ring-2 focus:ring-offset-2  focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      onClick={handleClickModify}
                      data-surveyid={data.surveyId}
                    >
                      수정하기
                    </button>
                  </div>
                  <div>
                    <button
                      className="focus:ring-2 focus:ring-offset-2  focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      onClick={handleClickDelete}
                      data-surveyid={data.surveyId}
                    >
                      삭제하기
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
