import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGames, fetchUserGames } from "../features/game/gameSlice";
import GameCard from "../components/GameCard";
import Filter from "../components/Filter";
import "react-toastify/dist/ReactToastify.css";

function calculateTimeDifference(startTime) {
  const startTimeObj = new Date(startTime);

  const currentTime = Date.now();
  const currentTimeObj = new Date(currentTime);
  const differenceInMs = startTimeObj - currentTimeObj;

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const day = Math.floor(differenceInMinutes / 60 / 24);
  const remainingMinutes = differenceInMinutes % (60 * 24);
  const hour = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return day > 0
    ? `${day} days ${hour} hours`
    : hour > 0
      ? `${hour} hours ${minutes} minutes`
      : `${minutes} minutes`;
}

function Home() {
  const [sport, setSport] = useState("Default");
  const [country, setCountry] = useState("Default");
  const [stateOfCountry, setStateOfCountry] = useState("Default");
  const [filter, setFilter] = useState({
    sport: "Default",
    country: "Default",
    stateOfCountry: "Default",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games = useSelector((state) => state.game.gameList);
  const userGames = useSelector((state) => state.game.userGames);
  const loading = useSelector((state) => state.game.loading);

  useEffect(() => {
    const fetchGames = async () => {
      await dispatch(fetchAllGames()).unwrap();
      await dispatch(fetchUserGames()).unwrap();
    };

    fetchGames();
  }, [dispatch, filter]);

  if (loading || games.length === 0) {
    return;
  }

  const userFirstGame = userGames
    ? [...userGames].sort((a, b) => {
        const dateTimeA = new Date(a.start_time);
        const dateTimeB = new Date(b.start_time);
        return dateTimeA - dateTimeB;
      })[0]
    : null;

  const handleSport = (e) => setSport(e.target.value);

  const handleCountry = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const handleStateOfCountry = (selectedStateOfCountry) =>
    setStateOfCountry(selectedStateOfCountry);

  const handleFilter = () => {
    country === "Default"
      ? setFilter({
          sport,
          country,
          stateOfCountry: "Default",
        })
      : setFilter({
          sport,
          country,
          stateOfCountry,
        });
  };
  
  const handleReset = () =>
    setFilter({
      sport: "Default",
      country: "Default",
      stateOfCountry: "Default",
    });

  const handleView = (gameId) => navigate(`/game/${gameId}`);

  return (
    <div className="mx-8 mb-12 mt-2 desktop:mx-24 desktop:mt-6">
      {userFirstGame && (
        <div className="flex rounded border border-black bg-yellow-100 p-3 text-sm desktop:mx-auto desktop:w-[800px]">
          Your next game is in{" "}
          {calculateTimeDifference(userFirstGame.start_time)}
          <button
            className="ml-auto"
            onClick={() => handleView(userFirstGame.id)}
          >
            View
          </button>
        </div>
      )}
      <div className="flex">
        <p className="mt-4 text-2xl font-bold">Find your game</p>
        <Filter
          handleSport={handleSport}
          handleCountry={handleCountry}
          handleStateOfCountry={handleStateOfCountry}
          sport={sport}
          country={country}
          stateOfCountry={stateOfCountry}
          handleFilter={handleFilter}
          handleReset={handleReset}
        />
      </div>
      <section className="mx-auto grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3 largeDesktop:grid-cols-4">
        {[...games]
          .sort((a, b) => {
            const dateTimeA = new Date(a.start_time);
            const dateTimeB = new Date(b.start_time);
            return dateTimeA - dateTimeB;
          })
          .filter((game) => {
            const gameTime = new Date(game.end_time);
            const currentTime = new Date();

            const isActive =
              currentTime < gameTime &&
              game.participants.length !== game.number_of_players;

            const matchSport =
              filter.sport === "Default" || game.sport === filter.sport;
            const matchCountry =
              filter.country === "Default" ||
              game.location.includes(filter.country);
            const matchState =
              filter.stateOfCountry === "Default" ||
              game.location.includes(filter.stateOfCountry);

            return isActive && matchSport && matchCountry && matchState;
          })
          .map((game) => (
            <GameCard key={game.id} game={game} loading={loading} />
          ))}
      </section>
    </div>
  );
}

export default Home;
