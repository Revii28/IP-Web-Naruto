import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios({
          method: "GET",
          url: "https://naruto.revirifaldi.my.id/users",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios({
        method: "DELETE",
        url: `https://naruto.revirifaldi.my.id/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((beforeUser) => beforeUser.filter((user) => user.id !== id));

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Deleted Successfully! 👌",
        showConfirmButton: true,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to delete user",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <h1
        className="text-center primary mb-0"
        style={{ backgroundColor: "white", padding: "1rem" }}
      >
        List of Users
      </h1>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col">Image</th>
            <th scope="col">Is Premium</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="table-danger" key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{user.isPremium ? "Yes" : "No"}</td>
              <td>
                <Link to="/addUser">
                  <i className="fa-solid fa-user-plus"></i>
                </Link>
                ||
                <a
                  className="fa-solid fa-user-minus"
                  onClick={() => handleDelete(user.id)}
                ></a>
                ||
                <Link to={"/updateUser/" + user.id}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
