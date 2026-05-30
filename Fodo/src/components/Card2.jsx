import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  RemoveItem,
  IncrementQuantity,
  decrementQuantity,
} from "../redux/CartSlice.js";

const Card2 = ({ name, id, price, image, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Quantity */}
          <div className="flex flex-col gap-3 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
              {name}
            </h2>

            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                onClick={() =>
                  quantity > 1
                    ? dispatch(decrementQuantity(id))
                    : null
                }
              >
                -
              </button>

              <span className="font-medium text-gray-700 min-w-[20px] text-center">
                {quantity}
              </span>

              <button
                className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
                onClick={() => dispatch(IncrementQuantity(id))}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4">
          <span className="text-lg sm:text-xl font-bold text-orange-500">
            ₹{price.toFixed(2)}
          </span>

          <button
            className="text-red-500 hover:text-red-700 transition"
            onClick={() => dispatch(RemoveItem(id))}
          >
            <RiDeleteBin6Line className="text-2xl cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card2;