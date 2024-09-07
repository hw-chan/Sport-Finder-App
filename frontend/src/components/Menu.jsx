import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function Menu({ openMenu, handleMenu, handleLogout }) {
  const handleLogoutandMenu = () => {
    handleLogout(), handleMenu();
  };

  return (
    <div
      className={`z-100 fixed right-0 top-0 flex h-full w-[250px] ${openMenu ? "translate-x-0" : "translate-x-full"} z-100 flex-col items-start justify-center bg-[#232324] py-5 opacity-100 transition duration-300`}
    >
      <RxCross2
        className="ml-6 cursor-pointer hover:text-[#f7f7ebca]"
        style={{ color: "white", fontSize: "24px" }}
        onClick={handleMenu}
      />
      <ul className="mt-12 flex flex-col gap-5 pl-8">
        <li>
          <Link
            to="/home"
            className="text-2xl text-[#FFE047] hover:text-[#f7f7ebca]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-2xl text-[#FFE047] hover:text-[#f7f7ebca]"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/create"
            className="text-2xl text-[#FFE047] hover:text-[#f7f7ebca]"
          >
            Create Game
          </Link>
        </li>
        <li>
          <Link
            to="/game/user"
            className="text-2xl text-[#FFE047] hover:text-[#f7f7ebca]"
          >
            My Game
          </Link>
        </li>
      </ul>
      <div
        className="mt-auto cursor-pointer pl-8 text-2xl text-[#FFE047] hover:text-[#f7f7ebca]"
        onClick={handleLogoutandMenu}
      >
        Log out
      </div>
    </div>
  );
}

export default Menu;
