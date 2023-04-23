/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { SlWrench } from 'react-icons/sl';
import { SlTrash } from 'react-icons/sl';

const SurveyListTable = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <caption>설문지 리스트</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    번호
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    이름
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    문항수
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    응답자수
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    Icons
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {data.map((data) => (
                  <tr key={data.surveyId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {data.surveyId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {data.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {data.questionCount}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {data.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <div className="mr-2">
                          <button>
                            <SlTrash />
                          </button>
                        </div>
                        <div>
                          <button>
                            <SlWrench />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SurveyListTable;
