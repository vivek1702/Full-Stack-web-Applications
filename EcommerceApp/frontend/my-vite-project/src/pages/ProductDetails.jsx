import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import useCounter from "../components/QuantityCounter";

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(null);
  const { productId } = useParams();
  const { data, loading } = useFetch(
    `http://localhost:3000/api/products/${productId}`,
  );
  // quantity counter
  const { quantity, IncrementQty, DecrementQty } = useCounter();

  //discounted price calculation
  const discountAmount = data.price - data.price * (data.discountedPrice / 100);

  //sizes
  const sizes = data.size;
  console.log(sizes);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="container py-3">
      <div className="row">
        {/* LEFT: Product Image */}
        <div className="col-md-4 d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            {/* Image Card */}
            <div
              className="card shadow-sm mb-3"
              style={{ width: "300px", height: "420px" }}
            >
              <img
                src={data.productImage}
                alt={data.productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Buttons */}
            <div
              className="d-flex flex-column gap-2"
              style={{ width: "300px" }}
            >
              <button className="btn btn-warning fw-semibold w-100">
                Buy Now
              </button>
              <button className="btn btn-outline-dark fw-semibold w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Product Details --> */}
        <div className="col-md-8">
          <h3 className="fw-semibold">{data.productName}</h3>

          {/* Rating */}
          <div className="mb-2">
            <span className="fw-semibold">{data.rating}</span> ⭐
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="fs-4 fw-bold me-2">
              ₹{Math.round(discountAmount)}
            </span>
            <span className="text-muted text-decoration-line-through me-2">
              ₹{data.price}
            </span>
            <span className="badge bg-danger">{data.discountedPrice}% OFF</span>
          </div>

          {/* Quantity */}
          <div className="mb-3 d-flex align-items-center gap-2">
            <button
              onClick={DecrementQty}
              className="btn btn-outline-secondary btn-sm"
            >
              −
            </button>
            <span className="fw-semibold">Qty: {quantity}</span>
            <button
              onClick={IncrementQty}
              className="btn btn-outline-secondary btn-sm"
            >
              +
            </button>
          </div>
          {/* size */}
          <div className="mb-3">
            <p className="fw-semibold mb-2">Select Size</p>
            <div className="d-flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn btm-sm fw-semibold ${selectedSize === size ? "btn-dark" : "btn-outline-dark"}`}
                  style={{ minWidth: "50px" }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
