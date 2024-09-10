import { useNavigate } from "react-router";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { useDispatch } from "react-redux";
import {
  IoFootball,
  IoTimeOutline,
  IoLocationOutline,
  IoCalendarNumberOutline,
  IoBasketballOutline,
} from "react-icons/io5";
import { PiTennisBall, PiRacquet, PiVolleyball } from "react-icons/pi";
import profilepic from "../assets/profilepic.png";
import {
  joinGame,
  withdrawFromGame,
  fetchUserGames,
} from "../features/game/gameSlice";
import getUserId from "../utils/authUtils";
import {
  formatDate,
  formatStartTime,
  formatEndTime,
} from "../utils/formatDateAndTime";

function GameCard({ game, loading, notify }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const { events } = useDraggable(ref);

  const handleNavigation = (id) => {
    navigate(`/game/${id}`);
  };

  if (loading) {
    return;
  }

  const token = localStorage.getItem("authToken").replace(/"/g, "");
  const userId = getUserId(token);

  const handleJoinGame = async (gameId, status) => {
    if (game.host === userId) {
      notify(game.participants.includes(userId), userId, game.host);
      return;
    }
    if (status) {
      await dispatch(withdrawFromGame(gameId)).unwrap();
      await dispatch(fetchUserGames()).unwrap();
      notify(game.participants.includes(userId), userId, game.host);
      return;
    }
    await dispatch(joinGame(gameId)).unwrap();
    await dispatch(fetchUserGames()).unwrap();
    notify(game.participants.includes(userId), userId, game.host);
  };

  return (
    <div className="mx-auto my-4 flex h-80 w-[400px] flex-col gap-1 rounded-md border border-dashed border-black p-4 tablet:w-[280px]">
      <div className="flex">
        <p className="text-xl font-bold">{game.title}</p>
        {userId === game.host ? (
          <p className="w-18 ml-auto flex h-7 items-center justify-center rounded-full border-2 border-red-500 bg-orange-100 p-4 text-xs text-red-500">
            Host
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="font-xs flex items-center">
        {game.sport === "football" ? (
          <IoFootball style={{ fontSize: "12px" }} />
        ) : game.sport === "basketball" ? (
          <IoBasketballOutline />
        ) : game.sport === "badminton" ? (
          <PiRacquet />
        ) : game.sport === "tennis" ? (
          <PiTennisBall />
        ) : (
          <PiVolleyball />
        )}{" "}
        <p className="ml-1">{game.sport.substring(0,1).toUpperCase()+game.sport.substring(1)}</p>
      </div>
      <div className="flex items-center">
        <IoCalendarNumberOutline className="mr-1" />
        {formatDate(game.start_time)}
      </div>
      <div className="flex items-center">
        <IoTimeOutline className="mr-1" />
        {formatStartTime(game.start_time)} - {formatEndTime(game.end_time)}
      </div>
      <div className="no-scrollbar flex h-12 w-full overflow-auto">
        <IoLocationOutline className="mr-1 mt-1 flex-shrink-0" />
        <div>{game.location}</div>
      </div>
      <div
        className="no-scrollbar flex h-12 items-center gap-2 overflow-auto"
        ref={ref}
        {...events}
      >
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
      <div className="mt-auto flex items-center justify-center gap-3">
        <button
          className="h-7 w-full rounded-md border bg-blue-500 text-white"
          onClick={() => {
            handleNavigation(game.id);
          }}
        >
          View
        </button>
        <button
          className="h-7 w-full rounded-md border bg-green-500 text-white"
          onClick={() => {
            handleJoinGame(game.id, game.participants.includes(userId));
          }}
        >
          {game.participants.includes(userId) ? "Joined" : "Join"}
        </button>
      </div>
    </div>
  );
}

export default GameCard;
