import "../Css/Footer.css";

export default function Footer() {
  return (
    <footer className="text-center akatsuki-background">
      {/* Grid container */}
      <div className="container pt-4">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            data-mdb-ripple-init=""
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-facebook-f" />
          </a>
          {/* Instagram */}
          <a
            data-mdb-ripple-init=""
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-instagram" />
          </a>
          {/* Linkedin */}
          <a
            data-mdb-ripple-init=""
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-linkedin" />
          </a>
          {/* Github */}
          <a
            data-mdb-ripple-init=""
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-github" />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-body" href="https://github.com/Revi28">
          Revi Rifaldi
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
}
