import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { CartCounter } from "./CartCounter";
import useWishListContext from "../contexts/wishlistContext";

export default function Nav({ setSearchText }) {
  const { allWishListItem } = useWishListContext();
  return (
    <>
      <nav className="navbar bg-light border-bottom px-4 py-3">
        <div className="container-fluid">
          <div className="row w-100 align-items-center">
            {/* left side */}
            <div className="col-4 d-flex align-items-center gap-4">
              <h3 className="mb-0">ShoppingSite</h3>
              <Link to="/" className="text-decoration-none text-dark">
                Home
              </Link>

              <Link
                to="/productlistings"
                className="text-decoration-none text-dark"
              >
                Products
              </Link>
            </div>
            {/* center */}
            <div className="col-4 d-flex justify-content-center">
              <input
                className="form-control"
                style={{ maxWidth: "300px" }}
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {/* right */}
            <div className="col-4 d-flex justify-content-end align-items-center gap-3">
              <button className="btn btn-outline-secondary">Login</button>
              <Link to="/wishlist" className="text-decoration-none text-dark">
                <FaRegHeart /> {allWishListItem.length}
              </Link>
              <Link to="/cart" className="text-decoration-none text-dark">
                <CartCounter />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
