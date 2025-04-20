import React from "react";
import DoctorAndAssistantTable from "../../shared/components/molecules/DoctorAndAssistantTable";
import ActionButton from "../../shared/components/atoms/ActionButton";

const columns = [
  {
    key: "sunday",
    title: "Sunday",
    dataIndex: "sunday",
  },
  {
    key: "monday",
    title: "Monday",
    dataIndex: "monday",
  },
  {
    key: "tuesday",
    title: "Tuesday",
    dataIndex: "tuesday",
  },
  {
    key: "wednesday",
    title: "Wednesday",
    dataIndex: "wednesday",
  },
  {
    key: "thursday",
    title: "Thursday",
    dataIndex: "thursday",
  },
  {
    key: "friday",
    title: "Friday",
    dataIndex: "friday",
  },
  {
    key: "saturday",
    title: "Saturday",
    dataIndex: "saturday",
  },
  {
    key: "theTime",
    title: "The Time",
    dataIndex: "theTime",
  },
];

const data = [
  {
    id: 1,
    sunday: "9:00 AM - 11:00 AM",
    monday: "11:00 AM - 1:00 PM",
    tuesday: "1:00 PM - 3:00 PM",
    wednesday: "3:00 PM - 5:00 PM",
    thursday: "5:00 PM - 7:00 PM",
    friday: "7:00 PM - 9:00 PM",
    saturday: "9:00 AM - 11:00 AM",
    theTime: "11:00 AM - 1:00 PM",
  },
  {
    id: 2,
    sunday: "11:00 AM - 1:00 PM",
    monday: "1:00 PM - 3:00 PM",
    tuesday: "3:00 PM - 5:00 PM",
    wednesday: "5:00 PM - 7:00 PM",
    thursday: "7:00 PM - 9:00 PM",
    friday: "9:00 AM - 11:00 AM",
    saturday: "11:00 AM - 1:00 PM",
    theTime: "1:00 PM - 3:00 PM",
  },
  {
    id: 3,
    sunday: "1:00 PM - 3:00 PM",
    monday: "3:00 PM - 5:00 PM",
    tuesday: "5:00 PM - 7:00 PM",
    wednesday: "7:00 PM - 9:00 PM",
    thursday: "9:00 AM - 11:00 AM",
    friday: "11:00 AM - 1:00 PM",
    saturday: "1:00 PM - 3:00 PM",
    theTime: "3:00 PM - 5:00 PM",
  },
  {
    id: 4,
    sunday: "3:00 PM - 5:00 PM",
    monday: "5:00 PM - 7:00 PM",
    tuesday: "7:00 PM - 9:00 PM",
    wednesday: "9:00 AM - 11:00 AM",
    thursday: "11:00 AM - 1:00 PM",
    friday: "1:00 PM - 3:00 PM",
    saturday: "3:00 PM - 5:00 PM",
    theTime: "5:00 PM - 7:00 PM",
  },
  {
    id: 5,
    sunday: "5:00 PM - 7:00 PM",
    monday: "7:00 PM - 9:00 PM",
    tuesday: "9:00 AM - 11:00 AM",
    wednesday: "11:00 AM - 1:00 PM",
    thursday: "1:00 PM - 3:00 PM",
    friday: "3:00 PM - 5:00 PM",
    saturday: "5:00 PM - 7:00 PM",
    theTime: "7:00 PM - 9:00 PM",
  },
];

const AssistantTable = () => {
  return (
    <div className="p-20">
      <DoctorAndAssistantTable columns={columns} data={data} rowKey="id" />
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
};

export default AssistantTable;
