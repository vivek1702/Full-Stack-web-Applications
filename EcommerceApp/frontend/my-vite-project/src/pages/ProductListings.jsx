import { useState } from "react";
import useFetch from "../useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import useWishListContext from "../contexts/wishlistContext";
import toast from "react-hot-toast";

export default function Productlistings({ searchText }) {
  const [wishlistedItems, setWishlistedItems] = useState({});
  const { updateCartItem } = useCartContext();
  const { allWishListItem, updateWishList, deleteWishListItem } =
    useWishListContext();
  const [selectedRating, setselectedRating] = useState(null);
  const [selectSortBy, setSelectSortBy] = useState(null);
  const [givenPrice, setPrice] = useState(100);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data: categories } = useFetch(`http://localhost:3000/api/categories`);
  const { data: products, loading } = useFetch(
    categoryId
      ? `http://localhost:3000/api/products/categories/${categoryId}`
      : `http://localhost:3000/api/products`,
  );

  const handleRating = (event) => {
    setselectedRating(Number(event.target.value));
  };

  const handleSortBy = (event) => {
    setSelectSortBy(Number(event.target.value));
  };

  const handlePrice = (event) => {
    setPrice(Number(event.target.value));
  };

  let result = products;

  if (searchText) {
    result = result.filter((item) => {
      const search = searchText.toLowerCase();
      const matchSearch =
        item.productName.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);
      return matchSearch;
    });
  }

  if (selectedRating !== null) {
    result = result.filter((item) => item.rating > selectedRating);
  }

  if (selectSortBy !== null) {
    if (selectSortBy === 1) {
      result = result.toSorted((a, b) => a.price - b.price);
    } else {
      result = result.toSorted((a, b) => b.price - a.price);
    }
  }

  if (givenPrice > 100) {
    result = result.filter((item) => item.price <= givenPrice);
  }

  function clearFilter() {
    setselectedRating(null);
    setSelectSortBy(null);
    setPrice(100);
    navigate("/productlistings");
  }

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* LEFT: Filters */}
        <div className="col-md-2 border-end">
          <h6 className="fw-bold mb-3">Filters</h6>

          <div className="mb-4">
            <h6 className="fw-semibold mt-3">Price</h6>

            <div className="px-2">
              <input
                type="range"
                className="form-range"
                min="100"
                max="1000"
                step="50"
                value={givenPrice}
                onChange={handlePrice}
              />

              <div className="d-flex justify-content-between mt-1">
                <span className="text-muted">100</span>
                <span className="text-muted">400</span>
                <span className="text-muted">700</span>
                <span className="text-muted">1000</span>
              </div>
            </div>

            {/* Category */}
            <h6 className="fw-semibold mt-3">Category</h6>
            {categories?.map((item) => (
              <div className="form-check" key={item._id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  checked={categoryId === item._id}
                  onChange={() => navigate(`/productlistings/${item._id}`)}
                />
                <label className="form-check-label">{item.name}</label>
              </div>
            ))}

            {/* Rating */}
            <h6 className="fw-semibold mt-3">Rating</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                value={4}
                checked={selectedRating === 4}
                onChange={handleRating}
              />
              4 star & Above
              <br />
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                value={3}
                checked={selectedRating === 3}
                onChange={handleRating}
              />
              3 star & Above
              <br />
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                value={2}
                checked={selectedRating === 2}
                onChange={handleRating}
              />
              2 star & Above
              <br />
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                value={1}
                checked={selectedRating === 1}
                onChange={handleRating}
              />
              1 star & Above
            </div>

            {/* sort by */}
            <h6 className="fw-semibold mt-3">Sort by</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sortBy"
                value={1}
                checked={selectSortBy === 1}
                onChange={handleSortBy}
              />
              Price- low to high
              <br />
              <input
                className="form-check-input"
                type="radio"
                name="sortBy"
                value={2}
                checked={selectSortBy === 2}
                onChange={handleSortBy}
              />
              Price- high to low
            </div>

            <button
              className="btn btn-outline-secondary btn-sm mt-3"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* RIGHT: Products */}
        <div className="col-md-10">
          {loading ? (
            <p>loading..</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {result.map((item) => (
                <div className="col" key={item._id}>
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Clickable product area */}
                    <Link
                      to={`/productDetails/${item._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="position-relative">
                        <img
                          src={item.productImage}
                          className="card-img-top"
                          style={{ height: "300px", objectFit: "cover" }}
                          alt={item.productName}
                        />
                        <span
                          role="button"
                          className="position-absolute top-0 end-0 m-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setWishlistedItems((prev) => {
                              const isWishlisted = prev[item._id];

                              if (!isWishlisted) {
                                updateWishList(item);
                                toast.success("Added to wishlist ❤️");
                              } else {
                                deleteWishListItem(item._id);
                                toast("Removed from wishlist 💔", {
                                  icon: "🗑️",
                                });
                              }

                              return {
                                ...prev,
                                [item._id]: !isWishlisted,
                              };
                            });
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "22px",
                            color: wishlistedItems[item._id] ? "red" : "#333",
                            userSelect: "none",
                          }}
                        >
                          ♥
                        </span>
                      </div>

                      <div className="card-body text-center">
                        <h6 className="fw-semibold">{item.productName}</h6>
                        <p className="text-muted mb-2">₹{item.price}</p>
                      </div>
                    </Link>

                    {/* Add to Cart button */}
                    <div className="px-3 pb-3">
                      <button
                        className="btn btn-outline-dark fw-semibold w-100"
                        onClick={() => updateCartItem(item, 1)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
