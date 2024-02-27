import { NavLink } from "react-router-dom";
import { userData } from "../data";
// import Button from "./ui/Button";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    location.replace("/login");
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Todo App
          </span>
        </Link>
        {userData ? (
          <div className="flex relative items-center md:order-2 space-x-3 rtl:space-x-reverse">
            <NavLink className="text-white" to={"/profile"}>
              Profile
            </NavLink>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>

            {isOpen && (
              <div
                className="z-50 absolute right-0 top-8 left-auto my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userData.user.username}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {userData.user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      onClick={logout}
                      className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <ul className="flex items-center space-x-3">
            <li className="text-white duration-200 font-semibold text-base">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-white duration-200 font-semibold text-base">
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
