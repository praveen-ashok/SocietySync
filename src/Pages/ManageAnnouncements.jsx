import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AnnouncementContext } from "../context/AnnouncementContext";
import "./ManageAnnouncements.css";

const CATEGORIES = ["Meeting", "Notice", "Maintenance", "Event"];

function ManageAnnouncements() {
  const { state, dispatch } = useContext(AnnouncementContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newAnnouncement = {
      id: Date.now(),
      title: data.title,
      category: data.category,
      description: data.description,
      date: new Date().toISOString(),
    };

    dispatch({
      type: "ADD_ANNOUNCEMENT",
      payload: newAnnouncement,
    });

    reset();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Remove this announcement?"
    );

    if (!confirmDelete) return;

    dispatch({
      type: "DELETE_ANNOUNCEMENT",
      payload: id,
    });
  };

  return (
    <div className="manage-announcements-container">

      <div className="manage-announcements-header">
        <h1>Manage Announcements</h1>
        <p>Publish notices and updates that members will see instantly.</p>
      </div>

      <div className="manage-announcements-content">

        {/* Create Announcement Form */}
        <div className="announcement-form-box">

          <h3>Publish New Announcement</h3>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="announcement-form-group">
              <label>Title</label>

              <input
                type="text"
                placeholder="e.g. Lift Maintenance Notice"
                {...register("title", {
                  required: "Title is required",
                })}
              />

              {errors.title && (
                <p className="announcement-error">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="announcement-form-group">
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
                <p className="announcement-error">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="announcement-form-group">
              <label>Description</label>

              <textarea
                rows={4}
                placeholder="Write the announcement details"
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
                <p className="announcement-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button type="submit" className="announcement-submit-btn">
              Publish Announcement
            </button>

          </form>
        </div>

        {/* Published Announcements List */}
        <div className="announcement-list-box">

          <h3>Published Announcements</h3>

          {state.announcements.length === 0 ? (
            <p className="announcement-empty-text">
              No announcements published yet.
            </p>
          ) : (
            <div className="announcement-cards">
              {state.announcements.map((a) => (
                <div className="announcement-card" key={a.id}>

                  <div className="announcement-card-top">
                    <h4>{a.title}</h4>

                    <button
                      className="announcement-delete-btn"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <span className="announcement-category-tag">
                    {a.category}
                  </span>

                  <p className="announcement-desc">
                    {a.description}
                  </p>

                  <p className="announcement-date">
                    Published on{" "}
                    {new Date(a.date).toLocaleDateString()}
                  </p>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ManageAnnouncements;
