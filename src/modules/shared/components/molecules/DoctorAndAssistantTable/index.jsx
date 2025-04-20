import React from "react";
import PropTypes from "prop-types";

const DoctorAndAssistantTable = ({ columns, data, rowKey }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-grey-300 text-center table-fixed">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`border font-normal border-black px-2 py-2 ${
                  column.title === "The Time"
                    ? "bg-white text-black"
                    : "bg-blue-500 text-white"
                } `}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border border-black px-2 py-4 h-16"
                >
                  {row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DoctorAndAssistantTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string.isRequired,
};

export default DoctorAndAssistantTable;
