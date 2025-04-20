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
    sunday: "8:00 AM - 10:00 AM",
    monday: "10:00 AM - 12:00 PM",
    tuesday: "12:00 PM - 2:00 PM",
    wednesday: "2:00 PM - 4:00 PM",
    thursday: "4:00 PM - 6:00 PM",
    friday: "6:00 PM - 8:00 PM",
    saturday: "8:00 AM - 10:00 AM",
    theTime: "10:00 AM - 12:00 PM",
  },
  {
    id: 2,
    sunday: "10:00 AM - 12:00 PM",
    monday: "12:00 PM - 2:00 PM",
    tuesday: "2:00 PM - 4:00 PM",
    wednesday: "4:00 PM - 6:00 PM",
    thursday: "6:00 PM - 8:00 PM",
    friday: "8:00 AM - 10:00 AM",
    saturday: "10:00 AM - 12:00 PM",
    theTime: "12:00 PM - 2:00 PM",
  },
  {
    id: 3,
    sunday: "12:00 PM - 2:00 PM",
    monday: "2:00 PM - 4:00 PM",
    tuesday: "4:00 PM - 6:00 PM",
    wednesday: "6:00 PM - 8:00 PM",
    thursday: "8:00 AM - 10:00 AM",
    friday: "10:00 AM - 12:00 PM",
    saturday: "12:00 PM - 2:00 PM",
    theTime: "2:00 PM - 4:00 PM",
  },
  {
    id: 4,
    sunday: "2:00 PM - 4:00 PM",
    monday: "4:00 PM - 6:00 PM",
    tuesday: "6:00 PM - 8:00 PM",
    wednesday: "8:00 AM - 10:00 AM",
    thursday: "10:00 AM - 12:00 PM",
    friday: "12:00 PM - 2:00 PM",
    saturday: "2:00 PM - 4:00 PM",
    theTime: "4:00 PM - 6:00 PM",
  },
  {
    id: 5,
    sunday: "4:00 PM - 6:00 PM",
    monday: "6:00 PM - 8:00 PM",
    tuesday: "8:00 AM - 10:00 AM",
    wednesday: "10:00 AM - 12:00 PM",
    thursday: "12:00 PM - 2:00 PM",
    friday: "2:00 PM - 4:00 PM",
    saturday: "4:00 PM - 6:00 PM",
    theTime: "6:00 PM - 8:00 PM",
  },
];

const DoctorTable = () => {
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

export default DoctorTable;
