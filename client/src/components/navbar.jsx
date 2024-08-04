import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, initMDB } from "mdb-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/Navbar.css";
import "mdb-ui-kit/css/mdb.min.css";
initMDB({ Dropdown });

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [textColor, setTextColor] = useState("#12e9f8");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const dropdown = document.querySelector('[data-mdb-toggle="dropdown"]');
    if (dropdown) {
      new Dropdown(dropdown);
    }

    const storedIsPremium = localStorage.getItem("isPremium");
    setIsPremium(storedIsPremium === "true");

   
    const interval = setInterval(() => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      setTextColor(randomColor);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const changeStatus = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const { data } = await axios.patch(
        `https://naruto.revirifaldi.my.id/isPremium`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsPremium(data.data.isPremium);
      localStorage.setItem("isPremium", data.data.isPremium);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const { data } = await axios.post(
        `https://naruto.revirifaldi.my.id/midtrans`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const cb = changeStatus;
      window.snap.pay(data.token, {
        onSuccess: function(result) {
          alert("payment success!");
          console.log(result);
          cb();
          localStorage.setItem("isPremium", true);
          setIsPremium(true);
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Kebanyakan Uang Bang? 🤔",
        text: `Kamu sudah premium 😪!`,
        icon: "question",
      });
    }
  };

  return (
    <div className="body-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <span
            className="font-naruto text-lg font-bold tracking-wider"
            style={{ color: textColor }}
          >
            N a r u t o
          </span>
          <div className="d-flex justify-content-center flex-grow-1">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <button className="btn btn-link nav-link" type="button">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users">
                  <button className="btn btn-link nav-link" type="button">
                    User
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Village">
                  <button className="btn btn-link nav-link" type="button">
                    Village
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <button
            onClick={handlePayment}
            type="button"
            className="btn btn-danger"
            data-mdb-ripple-init
          >
            Buy Verify
          </button>
          {isPremium ? (
            <img
              src="https://cdn-icons-png.freepik.com/256/11710/11710599.png?semt=ais_hybrid"
              alt="isVervy"
              style={{ width: "25px" }}
            />
          ) : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdolcNxLjMcG3Ga9sRBHm6TcXZW7KcrjrymwmFaOYQGAdgXPvnNQKjzIfQbtrenhoeGBg&usqp=CAU"
                  className="rounded-circle"
                  height={25}
                  alt="Avatar"
                  loading="lazy"
                />
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  {isLoggedIn ? (
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/login")}
                      type="button"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
