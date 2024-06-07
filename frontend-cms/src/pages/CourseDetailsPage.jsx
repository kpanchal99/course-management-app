import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CourseDetailsPage = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/getUsersByCourseId?courseId=${id}`
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <div className="  ">
        <h2>User Details</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
