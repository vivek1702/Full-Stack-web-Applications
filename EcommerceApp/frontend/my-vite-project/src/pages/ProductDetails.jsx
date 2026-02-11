import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import useCartContext from "../contexts/cartContext";

export default function ProductDetails() {
  const { updateCartItem } = useCartContext();
  const [initalQuantity, setInitalQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Not Selected");
  const { productId } = useParams();
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
    null,
  );

  if (loading || !data) {
    return <p className="text-center mt-5">loading...</p>;
  }

  function IncreaseQuantity() {
    setInitalQty(() => initalQuantity + 1);
  }

  function DecreaseQuantity() {
    setInitalQty(() => initalQuantity - 1);
  }

  //discounted price calculation
  const discountAmount = data.price - data.price * (data.discountedPrice / 100);

  console.log("PRODUCT DATA 👉", data);

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
              <button
                className="btn btn-outline-dark fw-semibold w-100"
                onClick={() =>
                  updateCartItem(data, initalQuantity, selectedSize)
                }
              >
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
              onClick={() => DecreaseQuantity()}
              className="btn btn-outline-secondary btn-sm"
            >
              −
            </button>
            <span className="fw-semibold">Quantity: {initalQuantity}</span>
            <button
              onClick={() => IncreaseQuantity()}
              className="btn btn-outline-secondary btn-sm"
            >
              +
            </button>
          </div>
          {/* size */}
          <div className="mb-3">
            <p className="fw-semibold mb-2">Select Size</p>

            <div className="d-flex gap-2 flex-wrap">
              {data.size.map((sizes) => (
                <button
                  key={sizes}
                  onClick={() => setSelectedSize(sizes)}
                  className={`btn btn-sm fw-semibold ${
                    selectedSize === sizes ? "btn-dark" : "btn-outline-dark"
                  }`}
                  style={{ minWidth: "50px" }}
                >
                  {sizes}
                </button>
              ))}
            </div>

            {!selectedSize && (
              <small className="text-danger d-block mt-1">
                Please select a size
              </small>
            )}
          </div>
          {/* Divider */}
          <hr className="my-4" />

          {/* Delivery & Payment Info */}
          <div className="d-flex justify-content-start gap-4 text-center mb-4">
            <div>
              <i className="bi bi-arrow-counterclockwise fs-4 d-block mb-1"></i>
              <small className="fw-semibold">
                10 Days
                <br />
                Return
              </small>
            </div>

            <div>
              <i className="bi bi-cash-coin fs-4 d-block mb-1"></i>
              <small className="fw-semibold">
                Pay on
                <br />
                Delivery
              </small>
            </div>

            <div>
              <i className="bi bi-truck fs-4 d-block mb-1"></i>
              <small className="fw-semibold">
                Free
                <br />
                Delivery
              </small>
            </div>

            <div>
              <i className="bi bi-shield-check fs-4 d-block mb-1"></i>
              <small className="fw-semibold">
                Secure
                <br />
                Payment
              </small>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4" />

          {/* Description */}
          <div>
            <h6 className="fw-bold mb-2">Description</h6>

            <ul className="text-muted small">
              <p>
                {" "}
                <strong>{data.description}</strong>
              </p>
              <li>
                <strong>Stylish Design:</strong> Premium quality material with a
                modern fit for everyday wear.
              </li>
              <li>
                <strong>Comfort First:</strong> Soft, breathable fabric for
                all-day comfort.
              </li>
              <li>
                <strong>Durable:</strong> Designed to withstand regular use and
                washing.
              </li>
              <li>
                <strong>Versatile:</strong> Perfect for casual outings and daily
                wear.
              </li>
              <li>
                <strong>Easy Care:</strong> Machine washable, retains shape and
                color.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
