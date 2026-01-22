import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const MeetupDetails = () => {
  const { meetupId } = useParams();
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/meetups/${meetupId}`,
  );

  console.log(data);

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    return date.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <p className="text-center py-5">Loading meetup details...</p>;
  }

  if (error) {
    return <p className="text-center py-5">Something went wrong</p>;
  }

  if (!data) {
    return <p className="text-center py-5">Meetup not found</p>;
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* LEFT SECTION */}
        <div className="col-md-8">
          <div className="mb-3">
            <h2>{data.eventTitle}</h2>
          </div>

          <div className="meetup-content">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body px-4">
                <p>
                  HostedBy: <br />
                  <strong>{data.hostedBy}</strong>
                </p>

                <img
                  className="rounded img-fluid meetupdetails-img"
                  src={data.eventImageUrl}
                  alt={data.eventTitle}
                />

                <div className="mt-4">
                  <h3>Details</h3>
                  <p>{data.details}</p>
                </div>

                <div className="mt-4">
                  <h3>Additional Information</h3>
                  <p>
                    <strong>Dress Code:</strong>{" "}
                    {data.additionalInformation.dressCode}
                    <br />
                    <strong>Age Restriction:</strong>{" "}
                    {data.additionalInformation.ageRestriction}
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="mb-3">Event Tags</h5>
                  <div className="d-flex flex-wrap">
                    {data.tags.map((item, index) => (
                      <span
                        key={index}
                        className="badge rounded-pill bg-danger text-white me-2 mb-2 px-3 py-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (STICKY FIXED) */}
        <div className="col-md-4">
          <div className="meetup-sticky-wrapper">
            {/* SUMMARY CARD */}
            <div className="card border-0 shadow-sm mb-4 meetup-summary-card">
              <div className="card-body bg-light">
                <div className="d-flex align-items-start gap-2 mb-3">
                  <span>🕒</span>
                  <div>
                    <p className="mb-0 fw-semibold">
                      {formatDate(data.startTime)} to
                    </p>
                    <p className="mb-0 text-muted">
                      {formatDate(data.endTime)}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2 mb-3">
                  <span>📍</span>
                  <div>
                    <p className="mb-0 fw-semibold">{data.location.venue}</p>
                    <p className="mb-0 text-muted">
                      {data.location.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <span>₹</span>
                  <p className="mb-0">{data.isPaid ? data.price : "Free"}</p>
                </div>
              </div>
            </div>

            {/* SPEAKERS + RSVP */}
            <div>
              <h6 className="fw-bold mb-3">Speakers: {data.speakers.length}</h6>

              <div className="row">
                {data.speakers.map((item, index) => (
                  <div key={index} className="col-6 mb-3">
                    <div className="card text-center border-0 shadow-sm p-3 h-100">
                      <img
                        src={item.profilePicture}
                        className="rounded-circle mx-auto mb-2"
                        width="60"
                        height="60"
                        alt="Speaker"
                      />
                      <p className="fw-semibold mb-0">
                        {item.firstName} {item.lastName}
                      </p>
                      <small className="text-muted">{item.designation}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupDetails;
