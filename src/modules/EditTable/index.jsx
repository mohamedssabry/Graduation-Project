import React from "react";
import GroupOne from "../Table/GroupOne";
import GroupTwo from "../Table/GroupTwo";
import ActionButton from "../shared/components/atoms/ActionButton";

function EditTable() {
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
             <ActionButton label="Cancel edit" />
           </div>
           <div className="mt-6 w-1/2">
             <ActionButton label="Save edit"  />
           </div>
         </div>
    </div>
  );
}

export default EditTable;
