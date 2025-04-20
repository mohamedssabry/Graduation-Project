import React from "react";
import "../index.css";

// Time slots from 9:00 AM to 3:00 PM
const startTime = 9; // 9:00 AM
const endTime = 15; // 3:00 PM

// Generate an array of time slots for each hour from 9 AM to 3 PM
const timeSlots = Array.from({ length: endTime - startTime + 1 }, (_, i) => {
  const hour = startTime + i;
  // Convert time to 12-hour format (1, 2, 3, etc.)
  return `${hour > 12 ? hour - 12 : hour}:00`;
});

const DayHeader = ({ day }) => (
  <th
    colSpan={timeSlots.length}
    className="bg-blue-500 text-white border border-gray-300 p-2 text-center"
  >
    {day}
  </th>
);

const TimeSlotHeader = () => (
  <>
    {timeSlots.map((slot, idx) => (
      <th
        key={`time-${idx}`}
        className="border border-gray-300 p-2 text-center"
      >
        {slot}
      </th>
    ))}
  </>
);

const EmptyCell = () => (
  <td className="border border-gray-300 p-1 text-center"></td>
);

const GroupOne = () => {
  return (
    <div className="overflow-x-auto flex" dir="rtl">
      <div className="writing-vertical-rl transform rotate-180 origin-center -ml-1 inline-block border border-gray-300 p-2 text-center bg-blue-500 text-white">
        المجموعة (1)
      </div>
      <table className="w-full border-collapse table-fixed text-sm ">
        <thead>
          <tr>
            {/* Group and A1 column header */}
         
            <th
              className="border border-gray-300 p-2 text-center "
              rowSpan={2}
            ></th>

            {/* Day headers */}
            {["السبت", "الاثنين", "الأربعاء"].map((day, idx) => (
              <DayHeader key={idx} day={day} />
            ))}
          </tr>

          <tr>
            {/* Time headers for each day */}
            {Array(3)
              .fill(null)
              .map((_, dayIdx) => (
                <TimeSlotHeader key={dayIdx} />
              ))}
          </tr>
        </thead>

        <tbody>
          {/* Render rows */}
          {Array(20)
            .fill(null)
            .map((_, idx) => (
              <tr key={idx}>
                {/* Group label in tbody */}
                <td className="border border-gray-300 text-center ">
                  {`A${idx + 1}`}
                </td>

                {/* Saturday */}
                {Array(timeSlots.length)
                  .fill(null)
                  .map((_, i) => (
                    <EmptyCell key={`sat-${i}`} />
                  ))}

                {/* Monday */}
                {Array(timeSlots.length)
                  .fill(null)
                  .map((_, i) => (
                    <EmptyCell key={`mon-${i}`} />
                  ))}

                {/* Wednesday */}
                {Array(timeSlots.length)
                  .fill(null)
                  .map((_, i) => (
                    <EmptyCell key={`wed-${i}`} />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupOne;
