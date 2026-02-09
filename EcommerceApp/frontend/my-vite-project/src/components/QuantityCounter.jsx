import { useState } from "react";

export default function useCounter() {
  const [quantity, setQuantity] = useState(1);

  function IncrementQty() {
    setQuantity(() => quantity + 1);
  }

  function DecrementQty() {
    if (quantity > 1) {
      setQuantity(() => quantity - 1);
    }
  }

  return { quantity, IncrementQty, DecrementQty };
}
