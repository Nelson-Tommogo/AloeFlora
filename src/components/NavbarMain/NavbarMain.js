import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import styles from "./NavbarMain.module.css";
import { NavLink} from "react-router-dom";
import logo from './logo.png'; // Assuming logo.png is in the same folder

const NavbarMain = () => {
  const [activeNav, setActiveNav] = useState([true, false, false, false, false, false, false]);
  const [expand, setExpand] = useState(false);

  const closeNav = () => {
    setExpand(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("NavbarMain") != null) {
      let temp = JSON.parse(sessionStorage.getItem("NavbarMain"));
      setActiveNav([...temp]);
    }
  }, []);

  const handleActiveNav = (i) => {
    let temp = activeNav.map(() => false);
    temp[i] = true;
    setActiveNav([...temp]);
    sessionStorage.setItem("NavbarMain", JSON.stringify(temp));
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "white",
          boxShadow: "1px 1px 10px rgb(0 0 0 / 0.4)",
        }}
        variant="light"
        expand="lg"
        sticky="top"
        onToggle={() => {
          setExpand((prevState) => !prevState);
        }}
        expanded={expand}
      >
        <Container>
          <Navbar.Brand href="/" className={styles.logo}>
            <img src={logo} alt="Mebiut Logo" style={{ width: '140px', height: 'auto', marginRight: '8px' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: "auto" }}>
              <NavLink
                to="/"
                className={`${styles.nav_text} nav-link ${activeNav[0] ? styles.active : ""}`}
                style={{ marginTop: "8px" }}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
              >
                Home
              </NavLink>

              <NavLink
                to="/Shop"
                className={`${styles.nav_text} nav-link ${activeNav[3] ? styles.active : ""}`}
                style={{ marginTop: "8px" }}
                onClick={() => {
                  handleActiveNav(3);
                  closeNav();
                }}
              >
                Shop Now
              </NavLink>

              {/* More Insights Dropdown */}
              <NavDropdown
                className={`nav-link ${styles.drop}`}
                title={
                  <span className={`${styles.nav_text} my-auto`}>
                    More Insights
                  </span>
                }
                id="more-insights-dropdown"
              >
                <NavDropdown.Item>
                  <NavLink
                    to="/aboutUs"
                    className={styles.dropdownText}
                    onClick={() => {
                      handleActiveNav(5);
                      closeNav();
                    }}
                  >
                    About Us
                  </NavLink>
               
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    to="/contactUs"
                    className={styles.dropdownText}
                    onClick={() => {
                      handleActiveNav(5);
                      closeNav();
                    }}
                  >
                    Contact Us
                  </NavLink>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <NavLink
                    to="/team"
                    className={styles.dropdownText}
                    onClick={() => {
                      handleActiveNav(5);
                      closeNav();
                    }}
                  >
                    Team
                  </NavLink>
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMain;
