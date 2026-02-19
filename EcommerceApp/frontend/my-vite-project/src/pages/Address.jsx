import { useEffect, useState } from "react";

export default function AddressPage() {
  const [editId, setEditId] = useState(null);
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

    if (editId) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/address/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        console.log("Update failed");
        return;
      }

      setEditId(null);
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }

    //After saving, fetch updated list
    fetchAddresses();

    //clear form data
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      pincode: "",
    });
  }

  function handleUpdate(id) {
    const addressToEdit = addresses.find((item) => item._id === id);

    if (!addressToEdit) return;

    setFormData({
      name: addressToEdit.name,
      email: addressToEdit.email,
      address: addressToEdit.address,
      phone: addressToEdit.phone,
      pincode: addressToEdit.pincode,
    });

    setEditId(id);
  }

  // Delete address
  async function handleDelete(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/api/address/${id}`, {
      method: "DELETE",
    });

    fetchAddresses();
  }

  return (
    <div className="card shadow-sm p-4 mb-5 border-0 bg-light">
      <h4 className="mb-3">{editId ? "Edit Address" : "Add New Address"}</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-dark">
          {editId ? "Update Address" : "Save Address"}
        </button>
      </form>

      <h2 className="mb-4 mt-5">Saved Addresses</h2>

      <div className="row">
        {addresses.map((item) => (
          <div key={item._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">{item.name}</h5>

                <p className="text-muted mb-1">{item.email}</p>

                <p className="mb-1">{item.address}</p>

                <p className="mb-1">📞 {item.phone}</p>

                <p className="mb-3">📍 {item.pincode}</p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
