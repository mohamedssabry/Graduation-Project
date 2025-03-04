import React, { useState } from "react";
import { TextInput } from "../shared/components/atoms";
import iconimg from "../../assets/imgs/iconimg.svg";

const GenerateForm = () => {
  const [materials, setMaterials] = useState([{ id: Date.now() }]);
  const [halls, setHalls] = useState([{ id: Date.now() }]);

  const addMaterial = () => {
    setMaterials([...materials, { id: Date.now() }]);
  };

  const removeMaterial = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const addHall = () => {
    setHalls([...halls, { id: Date.now() }]);
  };

  const removeHall = (id) => {
    setHalls(halls.filter((hall) => hall.id !== id));
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gradient-to-r from-blue-200 to-white">
      <div className="bg-white p-12 rounded-3xl shadow-lg w-2/4">
        <form>
          <div className="mb-4">
            <TextInput
              label="Name of the university or institute"
              placeholder="university"
              type="text"
              name="university"
              className="w-full"
              onChange={() => {}}
            />
          </div>

          <div className="mb-4">
            <TextInput
              label="Specialization"
              placeholder="Accounting or business information systems"
              type="text"
              name="specialization"
              className="w-full"
              onChange={() => {}}
            />
          </div>

          <div className="mb-4">
            <TextInput
              label="Academic year"
              placeholder="2025/2024"
              type="text"
              name="academicYear"
              className="w-full"
              onChange={() => {}}
            />
          </div>

          <div className="mb-4">
            <TextInput
              label="Academic Semester"
              placeholder="First or second"
              type="text"
              name="academicSemester"
              className="w-full"
              onChange={() => {}}
            />
          </div>

          <div className="mb-4">
            <p className="block text-xl mb-2">
              Working hours during the school day
            </p>
            <div className="flex justify-between gap-4">
              <TextInput
                placeholder="from"
                type="text"
                name="from"
                className="w-full"
                onChange={() => {}}
              />
              <TextInput
                placeholder="to"
                type="text"
                name="to"
                className="w-full"
                onChange={() => {}}
              />
            </div>
          </div>

          {materials.map((material) => (
            <div key={material.id} className="mb-4">
              <TextInput
                label="Scientific material data"
                placeholder="Material name"
                type="text"
                name="materialName"
                className="w-full"
                onChange={() => {}}
              />
              <div className="flex justify-between gap-4 pt-3">
                <TextInput
                  placeholder="Lecture time"
                  type="text"
                  name="lectureTime"
                  className="w-full"
                  onChange={() => {}}
                />
                <TextInput
                  placeholder="Doctor's name"
                  type="text"
                  name="doctorName"
                  className="w-full"
                  onChange={() => {}}
                />
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex items-center justify-center ">
                  <span className="text-blue-500 text-sm">
                    Does the material have a section?
                  </span>
                  <input
                    type="checkbox"
                    className="ml-2 mt-1 border-gray-300 "
                  />
                </div>
                <span
                  className="text-gray-500 text-sm cursor-pointer"
                  onClick={() => removeMaterial(material.id)}
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              className="bg-blue-500  text-white font-black rounded-xl  flex items-center justify-center w-1/10 cursor-pointer"
              onClick={addMaterial}
            >
              <span className="text-3xl">+</span>
            </button>
          </div>

          {halls.map((hall) => (
            <div key={hall.id} className="mb-4">
              <p className="block text-xl mb-2">Lecture hall data</p>
              <div className="flex justify-between gap-4">
                <TextInput
                  placeholder="Hall name"
                  type="text"
                  name="hallName"
                  className="w-full"
                  onChange={() => {}}
                />
                <TextInput
                  placeholder="Hall capacity"
                  type="text"
                  name="hallCapacity"
                  className="w-full"
                  onChange={() => {}}
                />
              </div>
              <span
                className="text-gray-500 text-sm cursor-pointer flex justify-end pt-2"
                onClick={() => removeHall(hall.id)}
              >
                Delete
              </span>
            </div>
          ))}
          <div className=" flex justify-center mb-5">
            <button
              type="button"
              className="bg-blue-500  text-white font-black rounded-xl  flex items-center justify-center w-1/10 cursor-pointer"
              onClick={addHall}
            >
              <span className="text-3xl">+</span>
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between gap-4">
              <TextInput
                label="Number of students"
                placeholder="1000"
                type="text"
                name="numberOfStudents"
                className="w-full"
                onChange={() => {}}
              />
              <TextInput
                label="Number of groups"
                placeholder="5 groups"
                type="text"
                name="numberOfGroups"
                className="w-full"
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between gap-4">
              <TextInput
                label="Number of sections"
                placeholder="24"
                type="text"
                name="numberOfSections"
                className="w-full"
                onChange={() => {}}
              />
              <TextInput
                label="Number of students in sections"
                placeholder="20"
                type="text"
                name="numberOfStudentsInSection"
                className="w-full"
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full text-2xl flex justify-center gap-2 cursor-pointer"
            >
              Generate
              <img src={iconimg} alt="" width={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateForm;
