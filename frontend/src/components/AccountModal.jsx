import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "react-toastify/dist/ReactToastify.css";

function AccountModal({
  openModal,
  modalMode,
  handleModal,
  closeModal,
  authToken,
  handleAuthToken,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authToken) {
      navigate(location.pathname === "/" ? "/home" : location.pathname);
      closeModal();
    } else {
      navigate("/");
    }
  }, [authToken]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/signup`, {
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      if (result.data && result.data.auth === true && result.data.token) {
        handleAuthToken(result.data.token);
        setError(false)
      }
    } catch (error) {
      setError(true)
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        className="overflow-y relative inset-0 z-10"
        open={openModal}
        onClose={closeModal}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="my-8 min-h-[20.75rem] max-w-lg overflow-hidden rounded-lg bg-white text-left data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="px-4 pb-4 pt-5">
              <DialogTitle className="text-xl font-bold">
                {modalMode === "register"
                  ? "Create an Account"
                  : "Log in to your account"}
              </DialogTitle>
              <form
                className="mt-8"
                onSubmit={modalMode === "register" ? handleSignup : handleLogin}
              >
                <label>
                  Username:
                  <br />
                  <input
                    type="text"
                    className="mb-2 mt-2 w-[20rem] rounded border border-gray-300 px-2 py-1"
                    onChange={(e) => handleUsernameChange(e)}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <br />
                  <input
                    type="password"
                    className="mt-2 w-[20rem] rounded border border-gray-300 px-2 py-1"
                    onChange={(e) => handlePasswordChange(e)}
                  />
                </label>
                <br />
                  <p className="mt-8 text-red-500">{error ? "Invalid username or password" : ""}</p>
                <button
                  type="submit"
                  className="mt-2 w-full rounded border bg-[#2B293D] py-2 text-center text-white"
                >
                  {modalMode === "register" ? "Sign Up" : "Log in"}
                </button>
              </form>
              {modalMode == "register" && (
                <p className="mt-2 text-xs text-gray-400">
                  Already have an account?
                  <span
                    className="cursor-pointer text-black hover:text-gray-400"
                    onClick={() => handleModal("login")}
                  >
                    Log in
                  </span>
                </p>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default AccountModal;
