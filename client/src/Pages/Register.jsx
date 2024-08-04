import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "https://naruto.revirifaldi.my.id/register",
        data: {
          email,
          password,
          username,
          address,
          phoneNumber,
        },
      });

      navigate("/login");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Terima kasih telah registrasi 😊",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops... Ada yang salah nih 😪",
        text: err.message,
      });
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-sm-6 text-black"
              style={{ backgroundColor: "#5B9C5D" }}
            >
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "red" }}
                />
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={handdleSubmit} style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1 }}
                  >
                    {" "}
                    <br />
                    <br />
                    Register
                  </h3>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-control form-control-lg"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label className="form-label" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="text"
                      id="address"
                      className="form-control form-control-lg"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <p>
                    Have account?{" "}
                    <Link to="/login" className="link-info">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://api.duniagames.co.id/api/content/upload/file/11058584281590646089.png"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
