import { useEffect, useState } from "react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
  });

  // Fetch all addresses
  async function fetchAddresses() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/address`);
    const data = await res.json();
    setAddresses(data);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle input change
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Add new address
  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    fetchAddresses();

    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      pincode: "",
    });
  }

  // Delete address
  async function handleDelete(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/api/address/${id}`, {
      method: "DELETE",
    });

    fetchAddresses();
  }

  return (
    <div className="container mt-4">
      <h2>Add New Address</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <textarea
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-primary">
          Save Address
        </button>
      </form>

      <h2>Saved Addresses</h2>

      {addresses.map((item) => (
        <div key={item._id} className="card mb-3 p-3">
          <h5>{item.name}</h5>
          <p>{item.address}</p>
          <p>Phone: {item.phone}</p>
          <p>pincode: {item.pincode}</p>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
