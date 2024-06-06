import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    teacherName: "",
    courseDescription: "",
    coursePrice: "",
    no_of_weeks: "",
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/admin/addCourse",
        courseData
      );
      console.log("Course added successfully:", response.data);
      alert("course added");
      setCourseData({
        courseName: "",
        teacherName: "",
        courseDescription: "",
        coursePrice: "",
        no_of_weeks: "",
        isActive: false,
      });
      // Close the modal after saving
      // window.$("#exampleAddCourse").modal("hide");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#exampleAddCourse"
      >
        Add Course
      </button>

      <div
        className="modal fade"
        id="exampleAddCourse"
        tabIndex="-1"
        aria-labelledby="exampleAddCourseLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleAddCourseLabel">
                Add Course
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teacher Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="teacherName"
                  value={courseData.teacherName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Description</label>
                <textarea
                  className="form-control"
                  name="courseDescription"
                  value={courseData.courseDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="coursePrice"
                  value={courseData.coursePrice}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">No. of Weeks</label>
                <input
                  type="number"
                  className="form-control"
                  name="no_of_weeks"
                  value={courseData.no_of_weeks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isActive"
                  checked={courseData.isActive}
                  onChange={() =>
                    setCourseData({
                      ...courseData,
                      isActive: !courseData.isActive,
                    })
                  }
                />
                <label className="form-check-label">Active</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSave}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
