import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/categories`,
  );

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div className="container py-3 mt-5">
      <div className="row g-4">
        {data.map((item) => (
          <div key={item._id} className="col-6 col-md-3">
            <div className="card h-100 border-1 shadow-sm">
              <Link
                to={`/productlistings/${item._id}`}
                className="text-decoration-none text-dark"
                style={{
                  height: "350px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <img
                  src={item.categoryURL}
                  className="w-100"
                  alt={item.name}
                  style={{ height: "350px", objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* middle banner  */}
      <div className="container-fluid p-0 mt-5">
        <div
          className="d-flex align-items-center justify-content-center text-center text-white"
          style={{
            height: "400px",
            backgroundImage:
              "url('https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            boxShadow:
              "inset 120px 0 120px -40px rgba(0,0,0,0.6), inset -120px 0 120px -40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          ></div>

          {/* Text Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 className="fw-bold mb-3 display-5">Fresh Styles, Every Day</h1>
            <p className="lead mb-4">
              Explore fashion essentials for Men, Women & Kids
            </p>

            <button
              className="btn btn-light btn-lg px-4"
              onClick={() => navigate("/productlistings")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="row g-4 mt-4">
          {/* Card 1 */}
          <div className="col-md-6">
            <div
              className="d-flex align-items-center p-4 h-100 shadow-sm"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Image */}
              <img
                src="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Summer Collection"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              />

              {/* Text */}
              <div>
                <small className="text-uppercase text-muted">
                  New Arrivals
                </small>
                <h5 className="fw-bold mt-2">Winter Collection</h5>
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
              className="d-flex align-items-center p-4 h-100 shadow-sm"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Image */}
              <img
                src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Summer Collection"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px",
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
                  Check out our best summer collection to stay cool in style
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
