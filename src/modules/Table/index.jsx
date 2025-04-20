import React from "react";
import GroupOne from "./GroupOne";
import GroupTwo from "./GroupTwo";
import ActionButton from "../shared/components/atoms/ActionButton";

function ScheduleTable() {
  return (
    <div className="p-20">
      <div className="">
        <GroupOne />
      </div>
      <div className="">
        <GroupTwo />
      </div>
      <div className="flex justify-between gap-10 p-5">
        <div className="mt-6 w-1/2">
          <ActionButton label="Print" iconSrc="/assets/printicon.svg" />
        </div>
        <div className="mt-6 w-1/2">
          <ActionButton label="Download" iconSrc="/assets/downloadicon.svg" />
        </div>
      </div>
    </div>
  );
}

export default ScheduleTable;
