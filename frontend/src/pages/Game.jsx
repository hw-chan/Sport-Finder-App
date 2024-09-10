import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import profilepic from "../assets/profilepic.png";
import "react-toastify/dist/ReactToastify.css";
import {
  IoFootball,
  IoTimeOutline,
  IoLocationOutline,
  IoCalendarNumberOutline,
  IoBasketballOutline,
} from "react-icons/io5";
import {
  PiTennisBall,
  PiRacquet,
  PiVolleyball,
} from "react-icons/pi";
import { MdOutlineDescription } from "react-icons/md";
import { fetchGame } from "../features/game/gameSlice";
import DisplayedMap from "../components/DisplayedMap";
import getUserId from "../utils/authUtils";
import ConfirmationDialog from "../components/ConfirmationDialog";
import {
  formatDate,
  formatStartTime,
  formatEndTime,
} from "../utils/formatDateAndTime";
import {
  withdrawFromGame,
  joinGame,
} from "../features/game/gameSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Game() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.game);
  const loading = useSelector((state) => state.game.loading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  if (loading || Object.keys(game).length === 0) {
    return;
  }

  const notify = (status) => {
    !status ? toast("You have joined a game.") : toast("You have left a game.");
  };

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  const token = localStorage.getItem("authToken").replace(/"/g, "");
  const userId = getUserId(token);

  const isGameHost = game.host === userId;

  const handleButton = (status) => {
    if (isGameHost) {
      setIsOpen(!isOpen)
      return;
    } else if (status) {
      dispatch(withdrawFromGame(game.id));
      return;
    } else {
      dispatch(joinGame(game.id));
    }
  };

  return (
    <div className="mb-16 desktop:mx-36 mt-4 tablet:mx-24">
      {isGameHost && (
        <p className="ml-8 mt-6 flex h-7 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-orange-100 text-xs text-red-500 desktop:w-24">
          Host
        </p>
      )}
      <div className="mx-8 mt-1 flex flex-col gap-2 desktop:w-[600px] tablet:w-[400px]">
        <p className="text-2xl font-bold desktop:text-3xl">{game.title}</p>
        <div className="flex items-center">
          {game.sport === "football" ? (
            <IoFootball />
          ) : game.sport === "basketball" ? (
            <IoBasketballOutline />
          ) : game.sport === "badminton" ? (
            <PiRacquet />
          ) : game.sport === "tennis" ? (
            <PiTennisBall />
          ) : (
            <PiVolleyball />
          )}{" "}
          <p className="ml-1">{game.sport}</p>
        </div>
        <div className="flex items-center ">
          <IoCalendarNumberOutline className="mr-1" />{" "}
          {formatDate(game?.start_time)}
        </div>
        <div className="flex items-center ">
          <IoTimeOutline className="mr-1" />
          {formatStartTime(game?.start_time)} - {formatEndTime(game?.end_time)}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-start">
            <IoLocationOutline className="mr-1 mt-1 flex-shrink-0" />{" "}
            {game.location}
          </div>
          <DisplayedMap location={game.location} />
        </div>
        <div className="flex items-center">
          <MdOutlineDescription className="my-6 mr-1" />
          {game.description}
        </div>
        <div className="no-scrollbar mt-2 flex flex-col justify-center gap-2 overflow-auto">
          <p>
            Going {game.participants.length}/{game.number_of_players}
          </p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: game.number_of_players }).map((_, index) =>
              index < game.participants.length ? (
                <img
                  key={index}
                  src={profilepic}
                  className="h-10 w-10 rounded-full border border-black"
                />
              ) : (
                <div
                  key={index}
                  className="h-10 w-10 flex-shrink-0 rounded-full border border-black"
                />
              ),
            )}
          </div>
        </div>
        <div>
          <button
            className={`mt-6 h-7 w-full rounded-md border ${isGameHost ? `bg-red-700` : `bg-green-500`} text-white`}
            onClick={() => {
              handleButton(game.participants.includes(userId));
              game.host !== userId && notify(game.participants.includes(userId));
            }}
          >
            {isGameHost
              ? "Delete"
              : game.participants.includes(userId)
                ? "Joined"
                : "Join"}
          </button>
        </div>
      </div> 
      <ConfirmationDialog gameId={game.id} isOpen={isOpen} handleClose={handleClose} />
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose="3000"
        progressClassName="black"
      />
    </div>
  );
}

export default Game;
