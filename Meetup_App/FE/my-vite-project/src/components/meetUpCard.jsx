import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const MeetUpCard = ({ searchText }) => {
  const { data = [] } = useFetch("http://localhost:3000/meetups");
  const [selectEvent, SetSelectEvent] = useState("Both");

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

  const filterData = data.filter((item) => {
    const matchEventType =
      item.eventType === selectEvent || selectEvent === "Both";

    const search = searchText.toLowerCase();
    const matchSearch =
      item.eventTitle.toLowerCase().includes(search) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(search));

    return matchEventType && matchSearch;
  });

  return (
    <>
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <h1>Meetup Events</h1>
        <select
          className="form-select w-auto"
          name="eventType"
          onChange={(e) => SetSelectEvent(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Select Event Type
          </option>
          <option value="Both" selected>
            Both
          </option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
      <div className="container py-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filterData?.map((item) => (
            <div className="col" key={item._id}>
              <Link
                to={`/meetups/${item._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={item.eventImageUrl}
                      className="card-img-top meetup-img"
                      alt={item.eventTitle}
                    />
                    <div className="card-img-overlay d-flex align-items-start p-3">
                      <span className="badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm">
                        {item.eventType} Event
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-1">
                      {formatDate(item.startTime)}
                    </p>
                    <h4 className="fw-bold">{item.eventTitle}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MeetUpCard;
