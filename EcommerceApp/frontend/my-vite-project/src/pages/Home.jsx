import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/categories`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div className="container py-3">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.map((item) => (
          <div key={item._id} className="col">
            <div className="card h-100 border-0 shadow-sm">
              <Link
                to={`/productlistings/${item._id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={item.categoryURL}
                  className="w-100"
                  alt={item.name}
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="container-fluid p-0 mt-5">
        <div
          className="d-flex align-items-center justify-content-center text-center text-white"
          style={{
            height: "350px",
            backgroundColor: "#e5e7eb", // light grey
          }}
        >
          <div className="bg-dark bg-opacity-50 px-4 py-3 rounded">
            <h1 className="fw-bold mb-2">Fresh Styles, Every Day</h1>
            <p className="mb-0">
              Explore fashion essentials for Men, Women & Kids
            </p>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-6">
            <div
              className="d-flex align-items-center p-4 h-100"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#ffffff",
                  marginRight: "20px",
                }}
              />

              {/* Text */}
              <div>
                <small className="text-uppercase text-muted">
                  New Arrivals
                </small>
                <h5 className="fw-bold mt-2">Summer Collection</h5>
                <p className="text-muted mb-0">
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            <div
              className="d-flex align-items-center p-4 h-100"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#ffffff",
                  marginRight: "20px",
                }}
              />

              {/* Text */}
              <div>
                <small className="text-uppercase text-muted">
                  New Arrivals
                </small>
                <h5 className="fw-bold mt-2">Summer Collection</h5>
                <p className="text-muted mb-0">
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
