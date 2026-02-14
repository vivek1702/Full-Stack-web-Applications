import useCartContext from "../contexts/cartContext";
import useWishListContext from "../contexts/wishlistContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    allCartItems,
    updateCartItem,
    DecreaseQty,
    IncreaseQty,
    deleteCartItem,
  } = useCartContext();

  const { updateWishList } = useWishListContext();

  //calculation of discounted price, total price, delivery fee
  const totalAfterDiscount = allCartItems.reduce((acc, curr) => {
    const discountAmount = curr.price * (curr.discountedPrice / 100);
    const discountedPricePerItem = curr.price - discountAmount;
    return acc + discountedPricePerItem * curr.quantity;
  }, 0);
  const totalPrice = allCartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const deliveryCharge = allCartItems.length > 0 ? 100 : 0;
  const finalAmount = totalAfterDiscount + deliveryCharge;

  const navigate = useNavigate();
  function handleCheckout() {
    if (allCartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    navigate("/checkout");
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* LEFT : CART ITEMS */}
        <div className="col-md-8">
          <h5 className="fw-semibold mb-3">MY CART ({allCartItems.length})</h5>
          {allCartItems.map((item) => (
            <div className="card mb-3 p-3 shadow-sm" key={item._id}>
              <div className="row g-3">
                {/* Image */}
                <div className="col-md-3 text-center">
                  <img
                    src={item.productImage}
                    alt="product"
                    className="img-fluid"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>

                {/* Product Info */}
                <div className="col-md-9">
                  <Link
                    to={`/productDetails/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <h6 className="fw-semibold mb-1">{item.productName}</h6>
                  </Link>
                  <div>
                    <span>
                      Selected Size: <strong>{item.selectedSize}</strong>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="fw-bold fs-6 me-2">
                      ₹
                      {Math.floor(
                        item.quantity * item.price -
                          item.price * (item.discountedPrice / 100),
                      )}
                    </span>
                    <span className="text-muted text-decoration-line-through me-2">
                      ₹{item.quantity * item.price}
                    </span>
                    <span className="text-success fw-semibold">
                      {item.discountedPrice}% OFF
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="fw-semibold">Quantity:</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => DecreaseQty(item._id)}
                    >
                      −
                    </button>
                    <span className="px-2 fw-semibold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => IncreaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-outline-danger btn-sm fw-semibold"
                      onClick={() => {
                        (deleteCartItem(item._id),
                          toast.success("Item removed from cart 🗑️"));
                      }}
                    >
                      Remove From Cart
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm fw-semibold"
                      onClick={() => {
                        (updateWishList(item), deleteCartItem(item._id));
                        toast.success("Moved to wishlist ❤️");
                      }}
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT : PRICE DETAILS */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-semibold border-bottom pb-2">PRICE DETAILS</h6>

            <div className="d-flex justify-content-between mb-2">
              <span>Price ({allCartItems.length} item)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 text-success">
              <span>After Discount</span>
              <span>- ₹{totalAfterDiscount}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-6 mb-2">
              <span>Final Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <p className="text-success small mb-3">
              You will save ₹{totalAfterDiscount} on this order
            </p>

            <button
              className="btn btn-outline-dark fw-semibold w-100 mb-3"
              onClick={() => navigate("/addressDetails")}
            >
              + Add New Address
            </button>

            <button
              className="btn btn-primary fw-semibold w-100"
              onClick={handleCheckout}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
