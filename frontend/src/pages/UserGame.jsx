import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserGames } from "../features/game/gameSlice";
import GameCard from "../components/GameCard";

function UserGame() {
  const userGames = useSelector((state) => state.game.userGames);
  const loading = useSelector((state) => state.game.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserGames());
  }, [dispatch]);

  return (
    <div className="mx-8 mt-2 desktop:mt-6 desktop:mx-24">
      <p className="text-2xl font-bold">My Game</p>
      { userGames.length !== 0 &&
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-2 mx-auto largeDesktop:grid-cols-4">
        {[...userGames]
          .sort((a, b) => {
            const dateTimeA = new Date(a.start_time);
            const dateTimeB = new Date(b.start_time);
            return dateTimeA - dateTimeB;
          })
          .map((game) => (
            <GameCard key={game.id} game={game} loading={loading} />
          ))}
      </div>}
    </div>
  );
}

export default UserGame;
