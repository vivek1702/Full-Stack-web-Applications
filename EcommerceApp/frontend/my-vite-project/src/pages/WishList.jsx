import useCartContext from "../contexts/cartContext";
import useWishListContext from "../contexts/wishlistContext";

export default function WishList() {
  const { allWishListItem, deleteWishListItem } = useWishListContext();
  const { updateCartItem } = useCartContext();
  return (
    <div className="container my-5">
      <h4 className="text-center fw-semibold mb-4">My Wishlist</h4>

      <div className="row g-4 justify-content-start">
        {/* Wishlist Card */}
        {allWishListItem.map((item) => (
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm position-relative h-100">
              {/* Heart icon */}
              <button
                className="btn position-absolute top-0 end-0 m-2 p-0"
                style={{ background: "transparent" }}
              >
                <span style={{ fontSize: "18px" }}>❤️</span>
              </button>

              {/* Product Image */}
              <img
                src={item.productImage}
                alt="product"
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              {/* Product Info */}
              <div className="card-body text-center">
                <h6 className="mb-1 fw-medium">{item.productName}</h6>
                <p className="mb-3 fw-semibold">₹{item.price}</p>

                <button
                  className="btn btn-secondary w-100 fw-semibold"
                  onClick={() => {
                    (updateCartItem(item, 1), deleteWishListItem(item._id));
                  }}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* End Card */}
      </div>
    </div>
  );
}
