import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogout } from "../../features/user/userActions";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../assets/Navbar.css";
const logoutUserMenu = [];

const userMenu = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
];

const profileUserDropdown = [
  {
    name: "Create Profile",
    path: "/apply-doctor",
  },
];

const profileDoctorDropdown = [
  {
    name: "View Profile",
    path: "/view-profile",
  },
  {
    name: "Edit Profile",
    path: "/edit-profile",
  },
  {
    name: "Add Education",
    path: "/add-education",
  },
  {
    name: "Add Experience",
    path: "/add-experience",
  },
];

const doctorMenu = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Patients",
    path: "/patient-appointments",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
];

const adminMenu = [
  {
    name: "Dashboard",
    path: "/admin-dashboard",
  },
  {
    name: "Users",
    path: "/user-list",
  },
  {
    name: "Doctors",
    path: "/doctor-list",
  },
];

// const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

function NavMenu() {
  const location = useLocation();
  const pathElements = location.pathname.split("/");
  const pathname = `/${pathElements[1]}`;

  const { userInfo, userToken } = useSelector((state) => state.user);
  const { myProfile } = useSelector((state) => state.profile);

  const menuToBeRendered =
    userInfo?.role === "admin"
      ? adminMenu
      : userInfo?.role === "doctor"
      ? doctorMenu
      : userInfo?.role === "patient"
      ? userMenu
      : logoutUserMenu;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //logout user function
  function logoutUser() {
    navigate("/", { replace: true });
    dispatch(userLogout());
    localStorage.clear();
  }

  // automatically authenticate user if token is found
  useEffect(() => {}, [userToken, dispatch, userInfo]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbars">
      <Container fluid>
        <Link className="nav-logo" to="/">
          NextDr
          <img
            alt="logo"
            style={{ width: "3.2rem" }}
            src={process.env.PUBLIC_URL + "/logo.png"}
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", fontSize: "20px", marginLeft: "10%" }}
            navbarScroll
          >
            {menuToBeRendered.map((item, index) => {
              const isActive = pathname === item.path;

              return (
                <div key={index}>
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    className={isActive ? "Active" : undefined}
                  >
                    {item.name}
                  </Nav.Link>
                </div>
              );
            })}

            {/* --------------------------for user ------------------ */}
            {userInfo && userInfo?.role !== "admin" && !myProfile ? (
              <>
                <NavDropdown
                  id="navbarScrollingDropdown"
                  className={profileUserDropdown.map((item) => {
                    return item.path === pathname ? "Active" : undefined;
                  })}
                  title="Apply Doctor"
                >
                  {profileUserDropdown.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <div key={item.name + "3asfd2"}>
                        <NavDropdown.Item
                          as={Link}
                          to={item.path}
                          className={isActive ? "Active" : undefined}
                        >
                          {item.name}
                        </NavDropdown.Item>
                      </div>
                    );
                  })}
                </NavDropdown>
              </>
            ) : null}

            {/* ------------------------for doctor------------------ */}
            {(userInfo && userInfo.role === "doctor") || myProfile ? (
              <>
                <NavDropdown
                  id="navbarScrollingDropdown"
                  className={profileDoctorDropdown.map((item) => {
                    return item.path === pathname ? "Active" : undefined;
                  })}
                  title="My Profile"
                >
                  {profileDoctorDropdown.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <div key={item.name + "3asfd2"}>
                        <NavDropdown.Item
                          as={Link}
                          to={item.path}
                          className={isActive ? "Active" : undefined}
                        >
                          {item.name}
                        </NavDropdown.Item>
                      </div>
                    );
                  })}
                </NavDropdown>
              </>
            ) : null}
          </Nav>
          {userInfo ? (
            <>
              {/* user icon */}
              <Nav className="NavIcon">
                {/* <Badge count={1} color="white">
                  <Icon
                    icon="clarity:notification-line"
                    color="white"
                    hFlip={true}
                    width="26"
                    height="26"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  />
                </Badge> */}
                <NavDropdown
                  title={
                    <Icon
                      icon="bxs:user-circle"
                      color="white"
                      width="30"
                      height="30"
                      hFlip={true}
                    />
                  }
                  id="collasible-nav-dropdown"
                >
                  <div className="profile-popover">
                    <strong style={{ textTransform: "capitalize" }}>
                      {userInfo?.role}
                    </strong>
                    <br />
                    <h6 style={{ textTransform: "capitalize" }}>
                      {" "}
                      {userInfo?.name}
                    </h6>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/myinfo">
                    My Info
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <Button
                    variant="dark"
                    style={{ marginLeft: "5%" }}
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </Button>
                  {/* </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              {/* user icon */}
              <Nav className="NavIcon">
                <NavDropdown
                  title={
                    <Icon
                      icon="bxs:user-circle"
                      color="white"
                      width="30"
                      height="30"
                      hFlip={true}
                    />
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/login">
                    <i className="fas fa-user-md"> Login</i>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    <i className="fas fa-users"> Register</i>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
