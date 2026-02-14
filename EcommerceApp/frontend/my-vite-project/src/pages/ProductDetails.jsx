import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import useCartContext from "../contexts/cartContext";
import useWishListContext from "../contexts/wishlistContext";
import toast from "react-hot-toast";

function ProductDetailsSkeleton() {
  return (
    <div className="container py-5">
      <div className="row">
        {/* LEFT IMAGE SKELETON */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-3">
            <div
              className="bg-light rounded placeholder-glow"
              style={{ height: "450px" }}
            ></div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <div className="btn btn-warning disabled placeholder col-12"></div>
            <div className="btn btn-dark disabled placeholder col-12"></div>
          </div>
        </div>

        {/* RIGHT CONTENT SKELETON */}
        <div className="col-md-7 ps-md-5">
          <h3 className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </h3>

          <div className="placeholder-glow mb-3">
            <span className="placeholder col-2"></span>
          </div>

          <div className="placeholder-glow mb-3">
            <span className="placeholder col-3 me-2"></span>
            <span className="placeholder col-2 me-2"></span>
            <span className="placeholder col-2"></span>
          </div>

          <div className="placeholder-glow mb-3">
            <span className="placeholder col-4"></span>
          </div>

          <div className="placeholder-glow mb-3">
            <span className="placeholder col-8"></span>
          </div>

          <hr />

          <div className="row mb-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-6 col-md-3 mb-3" key={item}>
                <div
                  className="bg-light rounded"
                  style={{ height: "100px" }}
                ></div>
              </div>
            ))}
          </div>

          <hr />

          <div className="placeholder-glow">
            <span className="placeholder col-4 d-block mb-2"></span>
            <span className="placeholder col-10 d-block mb-2"></span>
            <span className="placeholder col-8 d-block mb-2"></span>
            <span className="placeholder col-6 d-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const [wishlistedItems, setWishlistedItems] = useState({});
  const { updateCartItem } = useCartContext();
  const { allWishListItem, updateWishList, deleteWishListItem } =
    useWishListContext();
  const [initalQuantity, setInitalQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Not Selected");
  const { productId } = useParams();
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
    null,
  );

  if (loading || !data) {
    return <ProductDetailsSkeleton />;
  }

  function handleAddToCart() {
    if (selectedSize === "Not Selected") {
      toast.error("Please select a size");
      return;
    }

    updateCartItem(data, initalQuantity, selectedSize);

    toast.success("Added to cart 🛒");
  }

  function IncreaseQuantity() {
    setInitalQty(() => initalQuantity + 1);
  }

  function DecreaseQuantity() {
    if (initalQuantity > 1) {
      setInitalQty(initalQuantity - 1);
    }
  }

  //discounted price calculation
  const discountAmount = data.price - data.price * (data.discountedPrice / 100);

  console.log("PRODUCT DATA 👉", data);

  return (
    <div className="container py-5">
      <div className="row">
        {/* LEFT: Product Image */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="position-relative p-3">
              <img
                src={data.productImage}
                alt={data.productName}
                className="img-fluid"
                style={{
                  maxHeight: "500px",
                  objectFit: "contain",
                  width: "100%",
                }}
              />

              <span
                role="button"
                className="position-absolute top-0 end-0 m-3 fs-4"
                style={{
                  cursor: "pointer",
                  color: wishlistedItems[data._id] ? "red" : "#333",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const isWishlisted = wishlistedItems[data._id];

                  if (!isWishlisted) {
                    updateWishList(data);
                    toast.success("Added to wishlist ❤️");
                  } else {
                    deleteWishListItem(data._id);
                    toast("Removed from wishlist 💔", { icon: "🗑️" });
                  }

                  setWishlistedItems((prev) => ({
                    ...prev,
                    [data._id]: !isWishlisted,
                  }));
                }}
              >
                ♥
              </span>
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-dark fw-semibold"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* <!-- Product Details --> */}
        <div className="col-md-7 ps-md-5">
          <h3 className="fw-semibold">{data.productName}</h3>

          {/* Rating */}
          <div className="mb-2">
            <span className="fw-semibold">{data.rating}</span> ⭐
          </div>

          {/* Price */}
          <div className="mb-3">
            <h4 className="fw-bold text-dark d-inline me-2">
              ₹{Math.round(discountAmount)}
            </h4>
            <span className="text-muted text-decoration-line-through me-2">
              ₹{data.price}
            </span>
            <span className="badge bg-danger px-2 py-1">
              {data.discountedPrice}% OFF
            </span>
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
          <div className="row text-center mb-4">
            <div className="col-6 col-md-3 mb-3">
              <div className="border rounded p-3 h-100 shadow-sm">
                <i className="bi bi-arrow-counterclockwise fs-4 d-block mb-2 text-dark"></i>
                <small className="fw-semibold d-block">
                  10 Days
                  <br />
                  Return
                </small>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-3">
              <div className="border rounded p-3 h-100 shadow-sm">
                <i className="bi bi-cash-coin fs-4 d-block mb-2 text-dark"></i>
                <small className="fw-semibold d-block">
                  Pay on
                  <br />
                  Delivery
                </small>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-3">
              <div className="border rounded p-3 h-100 shadow-sm">
                <i className="bi bi-truck fs-4 d-block mb-2 text-dark"></i>
                <small className="fw-semibold d-block">
                  Free
                  <br />
                  Delivery
                </small>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-3">
              <div className="border rounded p-3 h-100 shadow-sm">
                <i className="bi bi-shield-check fs-4 d-block mb-2 text-dark"></i>
                <small className="fw-semibold d-block">
                  Secure
                  <br />
                  Payment
                </small>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4" />

          {/* Description */}
          <div>
            <h6 className="fw-bold mb-2">Description</h6>
            <p className="text-muted">{data.description}</p>
            <ul className="text-muted small">
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
