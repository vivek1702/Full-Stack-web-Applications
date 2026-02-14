import { useState } from "react";
import useCartContext from "../contexts/cartContext";
import useFetch from "../useFetch";
import toast from "react-hot-toast";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderPlaces, setOrderPlaced] = useState(null);
  const [orderStatus] = useState("Confirmed");
  const { allCartItems, clearCart } = useCartContext();
  const { data: savedAddress, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/address`,
  );

  //price calculation and show into frontend
  const totalPrice = allCartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const totalDiscount = allCartItems.reduce((acc, curr) => {
    const discounted = curr.price - curr.price * (curr.discountedPrice / 100);
    return acc + discounted * curr.quantity;
  }, 0);

  const deliveryCharge = allCartItems.length > 0 ? 100 : 0;
  const finalAmount = totalDiscount + deliveryCharge;

  async function handleOrderPlaced() {
    if (!selectedAddress) {
      toast.error("Please select and address");
      return;
    }

    if (allCartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      items: allCartItems,
      address: {
        name: selectedAddress.name,
        email: selectedAddress.email,
        address: selectedAddress.address,
        phone: selectedAddress.phone,
        pincode: selectedAddress.pincode,
      },
      totalAmount: totalPrice + deliveryCharge,
      orderStatus: orderStatus,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(orderData),
        },
      );
      if (!response.ok) {
        throw new Error("Order failed");
      }
      setOrderPlaced(true);
      clearCart();
      toast.success("Order Placed Successfully 🎉");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-8">
          {/* ADDRESS SECTION */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">Select Delivery Address</h5>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <select
                className="form-select mb-3"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const fullAddress = savedAddress.find(
                    (addr) => addr._id === selectedId,
                  );
                  setSelectedAddress(fullAddress);
                }}
              >
                <option value="">-- Select Address --</option>
                {savedAddress.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} - {item.pincode}
                  </option>
                ))}
              </select>
            )}

            {selectedAddress && (
              <div className="border rounded p-3 bg-light">
                <p className="fw-bold mb-1">{selectedAddress.name}</p>
                <p className="mb-1">{selectedAddress.address}</p>
                <p className="mb-1">Phone: {selectedAddress.phone}</p>
                <p className="mb-0">Pincode: {selectedAddress.pincode}</p>
              </div>
            )}
          </div>

          {/* CART ITEMS */}
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Order Items</h5>

            {allCartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              allCartItems.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <div>
                    <p className="mb-1 fw-semibold">{item.productName}</p>
                    <small>
                      ₹{item.price} × {item.quantity}
                    </small>
                  </div>
                  <div>₹{item.price * item.quantity}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Discounted Total</span>
              <span>₹{totalDiscount}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Final Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <button
              className="btn btn-dark w-100 mt-4"
              onClick={handleOrderPlaced}
              disabled={allCartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
