function Navbar() {
  return (
    <nav className="navBg navbar navbar-expand-lg navbar-dark">
      <a className="BrandName navbar-brand" href="#">
        <span className="flickPlay">i</span>VOTE
      </a>
      <button
        className="navbar-toggler"
        typeName="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navElements navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#facts">
              Facts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#reviews">
              Reviews
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
