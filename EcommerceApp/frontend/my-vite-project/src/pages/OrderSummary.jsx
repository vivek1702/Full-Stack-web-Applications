import { useEffect, useState } from "react";

export default function OrderSummary() {
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders`,
        );
        const data = await response.json();

        if (data.length > 0) {
          setLatestOrder(data[0]); // because sorted by createdAt:-1
        }
      } catch (error) {
        console.log("Error fetching order");
      } finally {
        setLoading(false);
      }
    }

    fetchLatestOrder();
  }, []);

  if (loading) {
    return <div className="container py-5">Loading order...</div>;
  }

  if (!latestOrder) {
    return (
      <div className="container py-5">
        <h4>No recent orders found.</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-success">🎉 Order Confirmed</h4>
          <span className="badge bg-success fs-6">
            {latestOrder.orderStatus}
          </span>
        </div>

        <hr />

        {/* ADDRESS SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">Shipping Address</h5>
          <div className="bg-light p-3 rounded">
            <p className="mb-1 fw-bold">{latestOrder.address.name}</p>
            <p className="mb-1">{latestOrder.address.address}</p>
            <p className="mb-1">📞 {latestOrder.address.phone}</p>
            <p className="mb-0">📍 {latestOrder.address.pincode}</p>
          </div>
        </div>

        {/* ITEMS SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">Ordered Items</h5>

          {latestOrder.items.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center border-bottom py-3"
            >
              <div>
                <p className="mb-1 fw-semibold">{item.productName}</p>
                <small className="text-muted">
                  ₹{item.price} × {item.quantity}
                </small>
              </div>
              <div className="fw-bold">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        {/* PRICE SECTION */}
        <div className="bg-light p-4 rounded">
          <h5 className="fw-semibold mb-3">Payment Details</h5>

          <div className="d-flex justify-content-between mb-2">
            <span>Total Amount</span>
            <span className="fw-bold text-dark">
              ₹{latestOrder.totalAmount}
            </span>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
