import useFetch from "../useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedLead, setSelectedLead] = useState("All");

  const { data, loading, error } = useFetch(`http://localhost:3000/api/leads`);
  console.log(data);

  const leadStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(selectedLead);

  return (
    <div>
      <header class="container">
        <h1>Anvaya CRM Dashboard</h1>
      </header>
      <hr class="styled-hr" />
      <main>
        <div class="body-container">
          <div class="sidebar">
            <ul class="sidebar-list">
              <li class="sidebar-listitems">
                <a href="/">Leads</a>
              </li>
              <li class="sidebar-listitems">
                <a href="/">Sales Agent</a>
              </li>
              <li class="sidebar-listitems">
                <a href="/">Reports</a>
              </li>
              <li class="sidebar-listitems">
                <a href="/">Settings</a>
              </li>
            </ul>
          </div>
          <div class="body-containerRightSide">
            <h2>Leads</h2>
            <div class="containerRightSide-items">
              <ul>
                {data.map((item) => (
                  <li key={item._id}>
                    <Link to={`/leadDetails/${item._id}`} class="lead-items">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <hr class="styled-hr" />
            <h2>Lead Status</h2>
            <div class="RightSide-items-leadStatus">
              <ul style={{ listStyle: "none" }}>
                {leadStatus.map((item) => (
                  <li class="RightSide-items-leadStatus-items">
                    - {item}:
                    <div class="RightSide-items-leadStatus-itemsTwo">
                      {
                        data.filter((dataItem) => dataItem.status === item)
                          .length
                      }
                    </div>
                    Leads
                  </li>
                ))}
              </ul>
            </div>
            <hr class="styled-hr" />
            <h2>Quick Filter:</h2>
            <div>
              <ul className="filter-list">
                {leadStatus.map((item) => (
                  <li key={item}>
                    <input
                      type="radio"
                      id={item}
                      name="leads"
                      value={item}
                      checked={selectedLead === item}
                      onChange={(e) => setSelectedLead(e.target.value)}
                      className="hidden-radio"
                    />
                    <label
                      htmlFor={item}
                      className={
                        selectedLead === item
                          ? "filter-btn active"
                          : "filter-btn"
                      }
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>© 2026 Avnaya Corp. All rights reserved.</p>
      </footer>
    </div>
  );
}
