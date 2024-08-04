import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function AddUser() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
    phoneNumber: "",
    address: "",
    image: "",
    villageId: 1,
    isPremium: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      image: userData.image,
      villageId: userData.villageId,
      isPremium: userData.isPremium,
    };

    try {
      await axios.post("https://naruto.revirifaldi.my.id/users", user, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Added Successfully! 👌",
        showConfirmButton: true,
        timer: 2000,
      });
      navigate("/users");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to add user",
        showConfirmButton: true,
      });
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div
        className="card bg-dark text-white border border-primary mt-5 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <div className="card-body">
          <h5 className="card-title">Add New User</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={userData.role}
                onChange={handleInput}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={userData.image}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="villageId" className="form-label">
                Village ID
              </label>
              <input
                type="number"
                className="form-control"
                id="villageId"
                name="villageId"
                value={userData.villageId}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="isPremium" className="form-label">
                Premium User?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPremium"
                  name="isPremium"
                  checked={userData.isPremium}
                  onChange={(e) =>
                    setUserData({ ...userData, isPremium: e.target.checked })
                  }
                />
                <label className="form-check-label" htmlFor="isPremium">
                  Premium User
                </label>
              </div>
            </div>
            <Link to="/users">
              <button type="button" className="btn btn-secondary">
                Close
              </button>
            </Link>
            <button type="submit" className="btn btn-primary ms-2">
              Add User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
