import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxExit } from "react-icons/rx";
import { useState } from "react";
import AccountModal from "./AccountModal";
import Menu from "./Menu";
import useLocalStorage from "use-local-storage";

function Layout() {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [error, setError] = useState(false)
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const location = useLocation();

  const handleModal = (mode) => {
    setModalMode(mode);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setError(false)
  };

  const handleAuthToken = (token) => {
    setAuthToken(token);
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleError = (status) => setError(status)

  const handleLogout = () => setAuthToken("");

  const index = location.pathname === "/";

  return (
    <div
      className={`z-1 h-screen w-screen ${index ? "overflow-hidden" : "no-scrollbar overflow-auto "} fixed tablet:relative`}
    >
      <div className="flex h-20 items-center justify-between bg-black px-6 tablet:px-8 desktop:px-10">
        <p className="cursor-pointer font-lalezar text-3xl text-[#FFE047] tablet:text-4xl">
          WeSport
        </p>

        {!index ? (
          <div className="ml-auto">
            <div className="mr-16 flex w-full">
              <ul className="hidden items-center justify-center gap-10 text-white desktop:flex">
                <li className="cursor-pointer text-yellow-300">
                  <Link to="/home">Home</Link>
                </li>
                <li className="cursor-pointer text-yellow-300">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="cursor-pointer text-yellow-300">
                  <Link to="/create">Create</Link>
                </li>
                <li className="cursor-pointer text-yellow-300">
                  <Link to="/game/user">My Game</Link>
                </li>
              </ul>
              <div className="ml-auto">
                <RxHamburgerMenu
                  className="desktop:hidden"
                  onClick={handleMenu}
                  style={{ color: "#FFE047", fontSize: "24px" }}
                />
                <div
                  className="hidden cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-[#FFE047] px-3 py-1 desktop:flex"
                  onClick={handleLogout}
                >
                  Log Out
                  <RxExit />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 text-[#2B293D]">
            <div
              className="flex w-20 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-3 py-1 text-[#FFE047]"
              onClick={() => handleModal("register")}
            >
              Register
            </div>
            <div
              className="flex w-20 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-[#FFE047] px-3 py-1"
              onClick={() => handleModal("login")}
            >
              Log in
            </div>
          </div>
        )}
      </div>
      <Outlet />
      <AccountModal
        openModal={openModal}
        modalMode={modalMode}
        handleModal={handleModal}
        closeModal={closeModal}
        authToken={authToken}
        handleAuthToken={handleAuthToken}
        handleError={handleError}
        error={error}
      />
      <Menu
        openMenu={openMenu}
        handleMenu={handleMenu}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default Layout;
