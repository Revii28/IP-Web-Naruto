import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://naruto.revirifaldi.my.id/" + id, 
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        console.log(data)
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err)
      });
  }, [id]);

  console.log(userData)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios({
        method: "PUT",
        url: "https://naruto.revirifaldi.my.id/users/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: userData,
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Updated Successfully! 👌",
        showConfirmButton: true,
        timer: 2000,
      });
      navigate("/users");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to update user",
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
          <h5 className="card-title">Upadate User</h5>
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
              Update User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
