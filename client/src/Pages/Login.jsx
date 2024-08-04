import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const username = email.split("@")[0];
  const handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "https://naruto.revirifaldi.my.id/login",
        data: {
          email,
          password,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Selamat Datang ${username} 😊🙏`,
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

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "93865105873-6qniqqnnam8gs41ksqv0tk94qsieh6ek.apps.googleusercontent.com",
      callback: async (response) => {
        const googleToken = response.credential;
        try {
          const { data } = await axios.post(
            "https://naruto.revirifaldi.my.id/login/google",
            {
              googleToken,
            }
          );
          localStorage.setItem("access_token", data.access_token);
          navigate("/");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Selamat Datang ${username} 😊🙏`,
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
      },
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-sm-6 text-black"
              style={{ backgroundColor: "#CEA138" }}
            >
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                />
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={handdleSubmit} style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 2 }}
                  >
                    {" "}
                    <br />
                    <br />
                    Login
                  </h3>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      login
                    </button>
                    <hr />
                    <div id="buttonDiv"></div>
                  </div>
                  <div
                    className="fb-login-button"
                    data-width="20"
                    data-size="20"
                    data-button-type="submit"
                    data-layout=""
                    data-auto-logout-link="true"
                    data-use-continue-as="true"
                  ></div>
                  <p>
                    Dont have an account?{" "}
                    <Link to="/register" className="link-info">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://w0.peakpx.com/wallpaper/58/875/HD-wallpaper-konoha-anime-naruto.jpg"
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
