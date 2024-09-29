import React, { useState, useEffect } from "react";
import ticketData from "../../Assets/data.json";
import "./Dashboard.css";

function Dashboard() {
  const [sortedData, setSortedData] = useState(ticketData);
  const [sortConfig, setSortConfig] = useState({
    price: null,
    duration: null,
    arrival_time: null,
    departure_time: null,
  });
  const [activeSortButtons, setActiveSortButtons] = useState({
    price: false,
    duration_hr: false,
    arrival_time: false,
    departure_time: false,
  });

  const sortFlights = (type) => {
    const newSortConfig = { ...sortConfig };
    newSortConfig[type] = "asc";
    setSortConfig(newSortConfig);

    const newActiveSortButtons = { ...activeSortButtons };
    newActiveSortButtons[type] = true;
    setActiveSortButtons(newActiveSortButtons);
  };

  const resetFilters = () => {
    setSortConfig({
      price: null,
      duration: null,
      arrival_time: null,
      departure_time: null,
    });
    setSortedData(ticketData);
    setActiveSortButtons({
      price: false,
      duration_hr: false,
      arrival_time: false,
      departure_time: false,
    });  // Reset all buttons to inactive
  };

  const logout = () => {
    localStorage.setItem('loggedInUser', false);
    window.location.href = "/";
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return new Date(1970, 0, 1, hours, minutes);
  };

  const convertToHoursAndMinutes = (decimalTime) => {
    var hours = Math.floor(decimalTime);
    var minutes = Math.round((decimalTime - hours) * 100);

    if (minutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${minutes} min`;
  };

  useEffect(() => {
    let sortedFlights = [...ticketData];
    Object.keys(sortConfig).forEach((key) => {
      const sortOrder = sortConfig[key];
      if (sortOrder) {
        sortedFlights.sort((a, b) => {
          if (key === "price" || key === "duration_hr") {
            return a[key] - b[key];
          } else if (key === "arrival_time" || key === "departure_time") {
            const timeA = parseTime(a[key]);
            const timeB = parseTime(b[key]);
            return timeA - timeB;
          }
          return 0;
        });
      }
    });
    setSortedData(sortedFlights);
  }, [sortConfig]);

  return (
    <div className="container">
      <div className="sort-buttons">
        <button
          className={`top-buttons ${activeSortButtons.departure_time ? 'active' : ''}`}
          onClick={() => sortFlights("departure_time")}>
          Departure Time
        </button>
        <button
          className={`top-buttons ${activeSortButtons.duration_hr ? 'active' : ''}`}
          onClick={() => sortFlights("duration_hr")}>
          Duration
        </button>
        <button
          className={`top-buttons ${activeSortButtons.arrival_time ? 'active' : ''}`}
          onClick={() => sortFlights("arrival_time")}>
          Arrival Time
        </button>
        <button
          className={`top-buttons ${activeSortButtons.price ? 'active' : ''}`}
          onClick={() => sortFlights("price")}>
          Price
        </button>
        <button className="reset-button top-buttons" onClick={resetFilters}>
          Reset Filters
        </button>
        <button className="reset-button top-buttons" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="ticket-list">
        {sortedData.map((ticket) => (
          <div key={ticket.flight_id} className="ticket-tile">
            <div className="ticket-row">
              <img
                src={ticket.flight_vendor_icon}
                alt={ticket.flight_vendor}
                className="flight-logo"
              />
              <div className="ticket-info-row">
                <div className="ticket-column">
                  <strong>{ticket.departure}</strong>
                  <p className="arrival-depart">{ticket.departure_time}</p>
                </div>
                <div className="ticket-column">
                  <p>{convertToHoursAndMinutes(ticket.duration_hr)}</p>
                </div>
                <div className="ticket-column">
                  <strong>{ticket.arrival}</strong>
                  <p className="arrival-depart">{ticket.arrival_time}</p>
                </div>
                <div className="ticket-column">
                  <p>₹{ticket.price}</p>
                </div>
                <div className="ticket-column">
                  <button className="book-button">Book</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
