import useCartContext from "../contexts/cartContext";

export function CartCounter() {
  const { allCartItems } = useCartContext();
  return (
    <div>
      <span>🛒: {allCartItems.length}</span>
    </div>
  );
}
