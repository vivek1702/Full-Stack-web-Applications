import { createContext, useContext, useEffect, useState } from "react";

const wishListContext = createContext();
const useWishListContext = () => useContext(wishListContext);
export default useWishListContext;

export function WishListProvider({ children }) {
  const [allWishListItem, setAllWishListItem] = useState(() => {
    const storedData = localStorage.getItem("wishlistItem");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItem", JSON.stringify(allWishListItem));
  }, [allWishListItem]);

  function updateWishList(selectedItem) {
    setAllWishListItem((prevItem) => {
      const existing = prevItem.find((item) => item._id === selectedItem._id);
      if (existing) {
        return prevItem;
      }
      return [...prevItem, selectedItem];
    });
  }

  function deleteWishListItem(deletedItemId) {
    setAllWishListItem((prevItems) =>
      prevItems.filter((item) => item._id !== deletedItemId),
    );
  }

  return (
    <wishListContext.Provider
      value={{ allWishListItem, updateWishList, deleteWishListItem }}
    >
      {children}
    </wishListContext.Provider>
  );
}
