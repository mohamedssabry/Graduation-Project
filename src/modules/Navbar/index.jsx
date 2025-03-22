import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg px-20 py-4 flex items-center justify-between ">
      <div className="flex items-center">
        <img
          src="/assets/tables-logo.svg"
          alt="Tables Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-blue-500 font-bold text-2xl">Tables</h1>
      </div>
      <div className="flex gap-15">
        <NavLink
          to="/table/edit-inputs/"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
        >
          Edit inputs
        </NavLink>
        <NavLink
          to="/table/new-table/"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
        >
          New table
        </NavLink>
        <NavLink
          to="/table/edit-table/"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
        >
          Edit table
        </NavLink>
        <NavLink
          to="/table/"
          end
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
