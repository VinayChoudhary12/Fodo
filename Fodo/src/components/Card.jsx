import React from "react";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/CartSlice.js";
import { toast } from "react-toastify";

const Card = ({ recipes, loading }) => {
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4 sm:px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {recipes?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 sm:h-52 object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                  {item.name}
                </h2>

                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  <span className="font-semibold">Cuisine:</span>{" "}
                  {item.cuisine}
                </p>

                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  <span className="font-semibold">Rating:</span> ⭐{" "}
                  {item.rating}
                </p>

                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  <span className="font-semibold">Price:</span> $
                  {item.caloriesPerServing}
                </p>

                <button
                  className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition"
                  onClick={() => {
                    dispatch(
                      AddItem({
                        id: item.id,
                        name: item.name,
                        price: item.caloriesPerServing,
                        image: item.image,
                        quantity: 1,
                      })
                    );

                    toast.success("Item added to Cart!");
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {!recipes?.length && (
          <div className="flex justify-center items-center h-[50vh]">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-500">
              No Recipes Found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;