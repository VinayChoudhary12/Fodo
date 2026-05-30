import {
  MdFastfood,
  MdFreeBreakfast,
  MdSoupKitchen,
  MdDinnerDining,
} from "react-icons/md";

import { GiNoodles, GiFullPizza } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";

export const Categories = [
  {
    id: 1,
    name: "All",
    icon: MdFastfood,
  },
  {
    id: 2,
    name: "Breakfast",
    icon: MdFreeBreakfast,
  },
  {
    id: 3,
    name: "Soup",
    icon: MdSoupKitchen,
  },
  {
    id: 4,
    name: "Pasta",
    icon: GiNoodles,
  },
  {
    id: 5,
    name: "Main Course",
    icon: MdDinnerDining,
  },
  {
    id: 6,
    name: "Pizza",
    icon: GiFullPizza,
  },
  {
    id: 7,
    name: "Burger",
    icon: FaHamburger,
  },
];

