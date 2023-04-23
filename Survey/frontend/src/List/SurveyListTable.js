import React from 'react';

const SurveyListTable = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
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
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((data) => (
                  <tr key={data.surveyId}>
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
