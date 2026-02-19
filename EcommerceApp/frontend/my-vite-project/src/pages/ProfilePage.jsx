import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, addressRes] = await Promise.all([
          fetch(`${BASE_URL}/api/orders`),
          fetch(`${BASE_URL}/api/address`),
        ]);

        const ordersData = await ordersRes.json();
        const addressData = await addressRes.json();

        setOrders(ordersData);
        setAddresses(addressData);
      } catch (error) {
        console.log("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" />
        <p className="mt-3">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mt-5 mb-5">
        {/* Profile Header */}
        <Link to="/addressDetails" className="text-decoration-none text-dark">
          <div className="card shadow-sm border-0 mb-5 p-4">
            <h3 className="fw-bold">My Profile</h3>
            <p className="text-muted mb-0">
              Manage your addresses and track your orders
            </p>
          </div>
        </Link>

        {/* Address Section */}
        <div className="mb-5">
          <h4 className="mb-4">Saved Addresses</h4>

          {addresses.length === 0 ? (
            <div className="alert alert-secondary">No addresses found.</div>
          ) : (
            <div className="row">
              {addresses.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body">
                      <h6 className="fw-bold">{item.name}</h6>
                      <p className="text-muted mb-1">{item.email}</p>
                      <p className="mb-1">{item.address}</p>
                      <p className="mb-1">📞 {item.phone}</p>
                      <p className="mb-0">📍 {item.pincode}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div>
          <h4 className="mb-4">Order History</h4>

          {orders.length === 0 ? (
            <div className="alert alert-secondary">No orders placed yet.</div>
          ) : (
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="fw-semibold">{order._id}</td>
                        <td className="fw-semibold">{order.createdAt}</td>
                        <td className="fw-bold">₹ {order.totalAmount}</td>
                        <td>
                          <span className="badge bg-success">
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
