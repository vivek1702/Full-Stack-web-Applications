import { Link, Navigate } from "react-router-dom";
import { FaShoppingCart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import useWishListContext from "../contexts/wishlistContext";
import useCartContext from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

export default function Nav({ setSearchText }) {
  const navigate = useNavigate();
  const { allWishListItem } = useWishListContext();
  const { allCartItems } = useCartContext();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    navigate(`/productlistings?search=${value}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          UrbanWear
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productlistings">
                Products
              </Link>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex my-3 my-lg-0 w-100 w-lg-auto mx-lg-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              onChange={handleSearch}
            />
          </form>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/profile"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaUserCircle size={20} />
              <span className="d-lg-inline d-none">Profile</span>
            </Link>

            <Link
              to="/wishlist"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaRegHeart />
              <span className="badge bg-dark">{allWishListItem.length}</span>
            </Link>

            <Link
              to="/cart"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaShoppingCart />
              <span className="badge bg-dark">{allCartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
