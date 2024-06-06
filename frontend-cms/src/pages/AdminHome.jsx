import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import $ from "jquery";

export const AdminHome = () => {
  // get data on page load
  const [courses, setCourses] = useState([]);

  //store data of add/ edit course
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    teacherName: "",
    courseDescription: "",
    coursePrice: "",
    no_of_weeks: "",
    isActive: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/getCourseList"
        );
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [courses]);

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
      // Reload courses after adding a new course
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleEdit = (courseId) => {
    // Find the course with the matching courseId
    const selectedCourse = courses.find(
      (course) => course.courseId === courseId
    );
    // Set the course data to the state
    setCourseData(selectedCourse);
    // Show the modal
    $("#exampleModal").modal("show");
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:9090/api/admin/deleteCourse?courseId=${courseId}`
      );
      console.log("Course deleted successfully");
      // Reload courses after deleting a course
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* Modal content */}
      </div>

      <div className="container mt-5">
        <h2>Courses</h2>
        <table className="table">
          {/* Table headers */}
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
          {/* Table body */}
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.teacherName}</td>
                <td>{course.courseDescription}</td>
                <td>${course.coursePrice.toFixed(2)}</td>
                <td>{course.no_of_weeks}</td>
                <td>{course.isActive ? "Yes" : "No"}</td>
                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
                <td>
                  {/* Edit button */}
                  <button
                    className="btn btn-primary btn-sm me-1"
                    onClick={() => handleEdit(course.courseId)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
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
    </>
  );
};
