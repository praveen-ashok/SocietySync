import { useContext, useMemo, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import facilities from "../data/facilities";
import TIME_SLOTS from "../data/timeSlots";
import "./FacilityBooking.css";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function FacilityBooking() {
  const { state, dispatch } = useContext(BookingContext);

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [facility, setFacility] = useState("");
  const [customFacility, setCustomFacility] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const myBookings = state.bookings.filter(
    (b) => b.bookedBy === user?.email
  );

  const isOtherFacility = facility === "Other";

  const effectiveFacility = isOtherFacility
    ? customFacility.trim()
    : facility;

  // Slots already booked (and not cancelled) for the chosen facility + date
  const bookedSlots = useMemo(() => {
    if (!effectiveFacility || !date) return [];

    return state.bookings
      .filter(
        (b) =>
          b.facility === effectiveFacility &&
          b.date === date &&
          b.status !== "Cancelled"
      )
      .map((b) => b.time);
  }, [state.bookings, effectiveFacility, date]);

  const handleFacilityChange = (e) => {
    setFacility(e.target.value);
    setCustomFacility("");
    setSlot("");
    setError("");
    setSuccess("");
  };

  const handleCustomFacilityChange = (e) => {
    setCustomFacility(e.target.value);
    setSlot("");
    setError("");
    setSuccess("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSlot("");
    setError("");
    setSuccess("");
  };

  const handleSlotSelect = (chosenSlot) => {
    if (bookedSlots.includes(chosenSlot)) return;
    setSlot(chosenSlot);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!facility || !effectiveFacility || !date || !slot) {
      setError(
        isOtherFacility && !customFacility.trim()
          ? "Please enter the facility name."
          : "Please select a facility, date, and an available time slot."
      );
      return;
    }

    // Guard against a race where the slot got booked after selection
    if (bookedSlots.includes(slot)) {
      setError("That time slot was just booked. Please choose another.");
      setSlot("");
      return;
    }

    const newBooking = {
      id: Date.now(),
      facility: effectiveFacility,
      date,
      time: slot,
      bookedBy: user?.email,
      bookedByName: user?.name,
      flatNumber: user?.flatNumber,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_BOOKING", payload: newBooking });

    setSuccess(
      `${effectiveFacility} booked for ${date} during ${slot}.`
    );
    setFacility("");
    setCustomFacility("");
    setDate("");
    setSlot("");
  };

  const handleCancel = (id) => {
    dispatch({ type: "CANCEL_BOOKING", payload: id });
  };

  return (
    <div className="booking-container">

      <div className="booking-header">
        <h1>Facility Booking</h1>
        <p>Reserve a shared facility for your event or activity.</p>
      </div>

      <div className="booking-content">

        {/* New Booking Form */}
        <div className="booking-form-box">

          <h3>New Booking</h3>

          {error && <p className="booking-alert booking-alert-error">{error}</p>}
          {success && <p className="booking-alert booking-alert-success">{success}</p>}

          <form onSubmit={handleSubmit}>

            <div className="booking-form-group">
              <label>Select Facility</label>

              <select
                value={facility}
                onChange={handleFacilityChange}
              >
                <option value="">Choose a facility</option>

                {facilities.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name}
                  </option>
                ))}

                <option value="Other">Other</option>
              </select>
            </div>

            {isOtherFacility && (
              <div className="booking-form-group">
                <label>Facility Name</label>

                <input
                  type="text"
                  placeholder="Enter facility name"
                  value={customFacility}
                  onChange={handleCustomFacilityChange}
                />
              </div>
            )}

            <div className="booking-form-group">
              <label>Booking Date</label>

              <input
                type="date"
                min={todayISO()}
                value={date}
                onChange={handleDateChange}
              />
            </div>

            {effectiveFacility && date && (
              <div className="booking-form-group">
                <label>Available Time Slots</label>

                <div className="slot-grid">
                  {TIME_SLOTS.map((s) => {
                    const isBooked = bookedSlots.includes(s);
                    const isSelected = slot === s;

                    return (
                      <button
                        type="button"
                        key={s}
                        disabled={isBooked}
                        onClick={() => handleSlotSelect(s)}
                        className={`slot-btn ${
                          isBooked
                            ? "slot-booked"
                            : isSelected
                            ? "slot-selected"
                            : "slot-available"
                        }`}
                      >
                        <span className="slot-time">{s}</span>
                        <span className="slot-tag">
                          {isBooked ? "Booked" : "Available"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="booking-submit-btn"
              disabled={!effectiveFacility || !date || !slot}
            >
              Confirm Booking
            </button>

          </form>
        </div>

        {/* My Bookings List */}
        <div className="booking-list-box">

          <h3>My Bookings</h3>

          {myBookings.length === 0 ? (
            <p className="booking-empty-text">
              No bookings yet. Reserve a facility to see it here.
            </p>
          ) : (
            <div className="booking-items">
              {myBookings.map((b) => (
                <div className="booking-item" key={b.id}>

                  <div>
                    <h4>{b.facility}</h4>
                    <p>{b.date} · {b.time}</p>
                    <span
                      className={`booking-status-tag ${b.status
                        .toLowerCase()}`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {b.status !== "Cancelled" && (
                    <button
                      className="booking-cancel-btn"
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel
                    </button>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default FacilityBooking;
