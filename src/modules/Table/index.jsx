import React from "react";
import GroupOne from "./GroupOne";
import GroupTwo from "./GroupTwo";

function ScheduleTable() {
  return (
    <div className="p-20">
      <div className="">
        <GroupOne />
      </div>
      <div className="">
        <GroupTwo />
      </div>
      <div className="flex justify-between gap-50 p-5">
        <div className="mt-6 w-1/2">
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full text-2xl flex justify-center gap-2 cursor-pointer">
            Print
            <img src="/assets/printicon.svg" alt="" width={25} />
          </button>
        </div>
        <div className="mt-6 w-1/2">
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full text-2xl flex justify-center gap-2 cursor-pointer">
            Download
            <img src="/assets/downloadicon.svg" alt="" width={23} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleTable;
