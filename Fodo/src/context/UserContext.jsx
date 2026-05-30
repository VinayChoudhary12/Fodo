import { createContext, useState } from "react";

export const DataContext = createContext();

const UserContext = ({ children }) => {

  const [input, setInput] = useState("");
  const [cart, setCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DataContext.Provider
      value={{ input, setInput ,cart,setCart,isOpen,setIsOpen}}
    >
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;