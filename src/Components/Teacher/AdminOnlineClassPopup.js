import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminOnlineClassPopup.css";

const AdminOnlineClassPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    classTitle: "",
    classDate: "",
    classTime: "",
    classDuration: "",
    instructor: "",
    gmeetUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Class Scheduled:", formData);
    // Implement backend call or state update logic here
  };

  return (
    <div className="modal-overlay">
      <div className="modal show d-block custom-modal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Schedule Online Class</h5>
              <button type="button" className="close-btn" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Class Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="classTitle"
                    value={formData.classTitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Class Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="classDate"
                      value={formData.classDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Class Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="classTime"
                      value={formData.classTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Duration (Minutes) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="classDuration"
                      value={formData.classDuration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Instructor *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Google Meet URL *</label>
                  <input
                    type="url"
                    className="form-control"
                    name="gmeetUrl"
                    value={formData.gmeetUrl}
                    onChange={handleChange}
                    required
                    placeholder="e.g., https://meet.google.com/xyz-abc-def"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Schedule Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOnlineClassPopup;
