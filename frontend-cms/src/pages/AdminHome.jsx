import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { AddCourse } from "../components/AddCourse";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const AdminHome = () => {
  // State to store courses and current course data for editing
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    teacherName: "",
    courseDescription: "",
    coursePrice: "",
    no_of_weeks: "",
    isActive: false,
  });

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/getCourseList"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  // Handle editing a course
  const handleEdit = (courseId) => {
    const selectedCourse = courses.find(
      (course) => course.courseId === courseId
    );
    setCourseData(selectedCourse);
  };

  // Handle saving edited course data
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9090/api/admin/updateCourse?courseId=${courseData.courseId}`,
        courseData
      );
      console.log("Course updated successfully:", response.data);
      // Reload courses after editing a course
      const updatedCourses = courses.map((course) =>
        course.courseId === courseData.courseId ? response.data : course
      );
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Handle deleting a course
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:9090/api/admin/deleteCourse?courseId=${courseId}`
      );
      console.log("Course deleted successfully");
      // Reload courses after deleting a course
      setCourses(courses.filter((course) => course.courseId !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      {/* Modal for editing a course */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Course
              </h5>
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
                ></textarea>
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
                onClick={handleSaveEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Header/>
      <div className="py-3"></div>
      <div className="container-fluid mt-5 px-5">
        <h2>Courses</h2>
        <AddCourse />
        <table className="table table-responsive my-5">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Teacher Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>No. of Weeks</th>
              <th>Active</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td >{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.teacherName}</td>
                <td>{course.courseDescription}</td>
                <td>${course.coursePrice.toFixed(2)}</td>
                <td>{course.no_of_weeks}</td>
                <td>{course.isActive ? "Yes" : "No"}</td>
                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
                <td className="d-flex">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEdit(course.courseId)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5"></div>

      <Footer/>
    </>
  );
};
