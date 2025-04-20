import { NavLink } from "react-router-dom";

const adminLinks = [
  { path: "/table/edit-inputs/", label: "Edit inputs" },
  { path: "/table/new-table/", label: "New table" },
  { path: "/table/edit-table/", label: "Edit table" },
  { path: "/table/", label: "Home", end: true },
];

const doctorLinks = [
  { path: "/table/teaching-assistant/", label: "Teaching Assistant" },
  { path: "/table/doctor/", label: "Doctor" },
  { path: "/table/", label: "Home", end: true },
];

const role = "admin"; 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg px-20 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/assets/tables-logo.svg"
          alt="Tables Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-blue-500 font-bold text-2xl">Tables</h1>
      </div>
      <div className="flex gap-15">
        {(role === "admin" ? adminLinks : doctorLinks).map(
          ({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `pb-1 border-b-2 ${
                  isActive ? "border-black" : "border-transparent"
                }`
              }
            >
              {label}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
