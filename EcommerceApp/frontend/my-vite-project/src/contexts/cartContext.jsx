import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();
const useCartContext = () => useContext(cartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const [allCartItems, setCartItems] = useState(() => {
    const storeItem = localStorage.getItem("cartItem");
    return storeItem ? JSON.parse(storeItem) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(allCartItems));
  }, [allCartItems]);

  console.log(allCartItems);

  function updateCartItem(selectedItem, initalQty, selectedSize) {
    setCartItems((prevItem) => {
      const existing = prevItem.find((item) => item._id === selectedItem._id);

      if (existing) {
        return prevItem.map((item) =>
          item._id === selectedItem._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                selectedSize: (item.selectedSize = selectedSize),
              }
            : item,
        );
      }
      return [
        ...prevItem,
        { ...selectedItem, quantity: initalQty, selectedSize: selectedSize },
      ];
    });
  }

  function DecreaseQty(id) {
    setCartItems((prevItem) =>
      prevItem.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  function IncreaseQty(id) {
    setCartItems((prevItem) =>
      prevItem.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function deleteCartItem(deletedItemId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== deletedItemId),
    );
  }

  return (
    <cartContext.Provider
      value={{
        allCartItems,
        updateCartItem,
        DecreaseQty,
        IncreaseQty,
        deleteCartItem,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
