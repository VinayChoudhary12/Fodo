import React, { useContext } from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { DataContext } from "../context/UserContext";
import { useSelector } from "react-redux";

const Nav = () => {
  const { input, setInput, setIsOpen } = useContext(DataContext);

  const cart1 = useSelector((state) => state.cart);

  return (
    <nav className="w-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg px-4 sm:px-6 md:px-12 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] bg-white rounded-full flex items-center justify-center shadow-md">
            <MdFastfood className="text-2xl sm:text-3xl text-orange-500" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Foodie
          </h1>
        </div>

        {/* Search Bar */}
        <form
          className="flex items-center bg-white px-4 py-2 rounded-full w-full md:w-[45%] shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <IoSearch className="text-gray-500 text-lg sm:text-xl mr-2 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search delicious food..."
            className="w-full outline-none text-gray-700 bg-transparent text-sm sm:text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition duration-300">
            <FaShoppingCart className="text-xl sm:text-2xl text-orange-500" />
          </div>

          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart1.length}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;