import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ComplaintContext } from "../context/ComplaintContext";
import Modal from "../ComponentCommon/Modal";
import "./Complaints.css";

const CATEGORIES = [
  "Water",
  "Electricity",
  "Cleanliness",
  "Security",
  "Parking",
  "Other",
];

function Complaints() {
  const { state, dispatch } = useContext(ComplaintContext);

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const myComplaints = state.complaints.filter(
    (c) => c.raisedBy === user?.email
  );

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const onSubmit = (data) => {
    const newComplaint = {
      id: Date.now(),
      title: data.title,
      category: data.category,
      description: data.description,
      raisedBy: user?.email,
      flatNumber: user?.flatNumber,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: "ADD_COMPLAINT",
      payload: newComplaint,
    });

    reset();
  };

  return (
    <div className="complaints-container">

      <div className="complaints-header">
        <h1>Complaints</h1>
        <p>Raise a new complaint and track the status of your existing ones.</p>
      </div>

      <div className="complaints-content">

        {/* Raise Complaint Form */}
        <div className="complaint-form-box">

          <h3>Raise a Complaint</h3>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="complaint-form-group">
              <label>Complaint Title</label>

              <input
                type="text"
                placeholder="e.g. Leaking pipe in basement"
                {...register("title", {
                  required: "Title is required",
                })}
              />

              {errors.title && (
                <p className="complaint-error">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="complaint-form-group">
              <label>Category</label>

              <select
                defaultValue=""
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="" disabled>
                  Select category
                </option>

                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="complaint-error">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="complaint-form-group">
              <label>Description</label>

              <textarea
                rows={4}
                placeholder="Describe the issue in detail"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message:
                      "Please provide at least 10 characters",
                  },
                })}
              />

              {errors.description && (
                <p className="complaint-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button type="submit" className="complaint-submit-btn">
              Submit Complaint
            </button>

          </form>
        </div>

        {/* My Complaints List */}
        <div className="complaint-list-box">

          <h3>My Complaints</h3>

          {myComplaints.length === 0 ? (
            <p className="complaint-empty-text">
              You haven't raised any complaints yet.
            </p>
          ) : (
            <div className="complaint-cards">
              {myComplaints.map((c) => (
                <div className="complaint-card" key={c.id}>

                  <div className="complaint-card-top">
                    <h4>{c.title}</h4>

                    <span
                      className={`complaint-status ${c.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <span className="complaint-category-tag">
                    {c.category}
                  </span>

                  <p className="complaint-desc">
                    {c.description}
                  </p>

                  <div className="complaint-card-footer">
                    <p className="complaint-date">
                      Raised on{" "}
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>

                    <button
                      type="button"
                      className="complaint-view-btn"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      View
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {selectedComplaint && (
        <Modal
          title="Complaint Details"
          onClose={() => setSelectedComplaint(null)}
        >
          <div className="ss-detail-row">
            <span className="ss-detail-label">Title</span>
            <p className="ss-detail-value">
              {selectedComplaint.title}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Category</span>
            <p className="ss-detail-value">
              <span className="complaint-category-tag">
                {selectedComplaint.category}
              </span>
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Description</span>
            <p className="ss-detail-value">
              {selectedComplaint.description}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Date Raised</span>
            <p className="ss-detail-value">
              {new Date(
                selectedComplaint.createdAt
              ).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Status</span>
            <p className="ss-detail-value">
              <span
                className={`complaint-status ${selectedComplaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedComplaint.status}
              </span>
            </p>
          </div>
        </Modal>
      )}

    </div>
  );
}

export default Complaints;
