import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createGame } from "../features/game/gameSlice";
import GameForm from "../components/GameForm";

function CreateGame() {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState();

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onSubmit = (data) => {
    dispatch(createGame(data) )
    navigate('/home');
  }

  return (
    <div className="no-scrollbar mx-10 mb-8 flex flex-col overflow-auto py-8">
      <p className="mb-4 text-3xl font-bold desktop:ml-60 tablet:ml-24">Create a game</p>
      <hr className="mb-6"/>
      <form
        className="flex w-[22rem] flex-col gap-6 self-center desktop:w-[87%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <GameForm title="Event title" type="text" register={register} />
        <GameForm
          title="Event description"
          type="textarea"
          register={register}
        />
        <GameForm title="Sport" type="text" register={register} />
        <GameForm
          title="Start time"
          type="datetime-local"
          register={register}
          handleStartTime={handleStartTime}
        />
        <GameForm
          title="End time"
          type="datetime-local"
          register={register}
          startTime={startTime}
        />
        <GameForm title="Location" register={register} setValue={setValue} />
        <GameForm title="Number of players" type="number" register={register} />
        <button className="mt-4 rounded-lg border bg-black py-1 text-[#FFE047] hover:bg-gray-500 desktop:w-[40%] desktop:mx-auto desktop:mt-8">
          Create Game
        </button>
      </form>
    </div>
  );
}

export default CreateGame;
