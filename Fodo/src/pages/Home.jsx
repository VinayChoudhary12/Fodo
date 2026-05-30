
import React, { useEffect, useState } from "react";
import Navbar from "../components/Nav";
import { Categories } from "../Categories";
import Card from "../components/Card";
import axios from "axios";
import {DataContext} from "../context/UserContext"
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Card2 from '../components/Card2';
import {useSelector} from 'react-redux'
import { toast } from "react-toastify";
const Home = () => {

  //// Search Bar input 
const { input } = useContext(DataContext);
const {cart ,setCart} = useContext(DataContext);
const {isOpen ,setIsOpen} =useContext(DataContext);

  // Original API Data
  const [allRecipes, setAllRecipes] = useState([]);

  // Filtered Data
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  // API CALL
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/recipes?limit=0"
      );

      setAllRecipes(res.data.recipes);

      // Initially show all
      setRecipes(res.data.recipes);

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  ///search bar filter

useEffect(() => {

  const new_item = allRecipes.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(input.toLowerCase())
  );

  setRecipes(new_item);

}, [input,allRecipes]);



  // FILTER FUNCTION
  const filterItems = (category) => {

    // Show All
    if (category === "All") {
      setRecipes(allRecipes);
      return;
    }

    // Filter Recipes
    const filtered = allRecipes.filter((item) => {

      // Name Filter
      if (
        item.name
          .toLowerCase()
          .includes(category.toLowerCase())
      ) {
        return true;
      }

      // Tags Filter
      if (
        item.tags?.some(
          (tag) =>
            tag.toLowerCase() ===
            category.toLowerCase()
        )
      ) {
        return true;
      }

      // MealType Filter
      if (
        item.mealType?.some(
          (meal) =>
            meal.toLowerCase() ===
            category.toLowerCase()
        )
      ) {
        return true;
      }

      return false;
    });

    setRecipes(filtered);
  };


let items = useSelector(
  (state) => state.cart
);

console.log(items);

useEffect(() => {
  console.log("Redux Cart:", items);
}, [items]);




//let
let subTotal =items.reduce((total,item)=>{
    return total+item.price*item.quantity
}, 0) 

let deliveryCharge = subTotal > 0 ? 30 : 0;
let taxes = subTotal * 0.5 / 100;
let total = subTotal + deliveryCharge + taxes;

    return (
  <div className="w-full min-h-screen bg-gray-100">
    <Navbar />

    {/* Heading */}
    <div className="px-4 sm:px-6 md:px-12 pt-6 sm:pt-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Explore Categories
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Discover your favorite food items
      </p>
    </div>

    {/* Categories */}
    {!input ? (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 py-8 sm:py-10">
        {Categories.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => filterItems(item.name)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center py-5 sm:py-6"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Icon className="text-3xl sm:text-4xl text-orange-500" />
              </div>

              <h2 className="mt-3 sm:mt-4 text-sm sm:text-lg font-semibold text-gray-700 text-center px-2">
                {item.name}
              </h2>
            </div>
          );
        })}
      </div>
    ) : null}

    {/* Cards */}
    <Card recipes={recipes} loading={loading} />

    {/* Overlay */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsOpen(false)}
      />
    )}

    {/* Cart Drawer */}
    <div
      className={`fixed top-0 right-0 h-screen w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] bg-white shadow-lg transition-all duration-500 overflow-y-auto z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex items-center justify-between px-4 sm:px-6 py-5 sm:py-7 border-b sticky top-0 bg-white z-10">
        <span className="text-lg sm:text-xl font-semibold">
          Order Items
        </span>

        <RxCross2
          className="text-2xl cursor-pointer hover:text-red-500 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      </header>

      {items.length > 0 ? (
        <>
          <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
            {items.map((item) => (
              <Card2
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="p-4 sm:p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Subtotal:</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Delivery Charge:</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Taxes:</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mt-6 transition"
              onClick={() =>
                toast.success("Order placed successfully!")
              }
            >
              Buy Now
            </button>
          </div>
        </>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 flex items-center justify-center mb-5 text-4xl">
            🛒
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-center">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Looks like you haven't added any food items yet.
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  </div>
);
}   
export default Home;
