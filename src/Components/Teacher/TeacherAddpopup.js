import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeacherAddpopup.css";

const TeacherAddpopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    classTitle: "",
    classDate: "",
    classDuration: "",
    role: "",
    specificRole: "",
    staff: "",
    className: "",
    section: "",
    gmeetUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const roleOptions = 
    formData.role === "Student"
      ? ["All", "Level-1", "Level-2", "Level-3", "Level-4", "Level-5"]
      : formData.role === "Teacher"
      ? ["All", "Full-time", "Part-time"]
      : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal show d-block custom-modal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Online Classes Shedule Form</h5>
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
                    <label className="form-label">Class Duration (Minutes) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="classDuration"
                      value={formData.classDuration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Role *</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>

                {formData.role && (
                  <div className="mb-3">
                    <label className="form-label">Specific Role *</label>
                    <select
                      className="form-select"
                      name="specificRole"
                      value={formData.specificRole}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      {roleOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Staff *</label>
                    <select
                      className="form-select"
                      name="staff"
                      value={formData.staff}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Staff1">Staff 1</option>
                      <option value="Staff2">Staff 2</option>
                    </select>
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label className="form-label">Class *</label>
                    <select
                      className="form-select"
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Class1">Class 1</option>
                      <option value="Class2">Class 2</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Section *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Gmeet URL *</label>
                  <input
                    type="url"
                    className="form-control"
                    name="gmeetUrl"
                    value={formData.gmeetUrl}
                    onChange={handleChange}
                    required
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
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddpopup;
