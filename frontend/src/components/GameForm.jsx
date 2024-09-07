import AutosearchMap from "./AutosearchMap";

function formatString(str) {
  const words = str.toLowerCase().split(' ');
  for (let i=1 ;i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  const formattedWord = words.join(" ").replaceAll(" ", "")

  return formattedWord
}

export default function GameForm({
  title,
  type,
  register,
  setValue,
  handleStartTime,
  startTime,
}) {
  const inputValue = formatString(title)

  const current = new Date();
  const formattedDate = current.toISOString().split("T")[0];
  const hours = current.getHours();
  const minutes = String(current.getMinutes()).padStart(2, "0");

  return (
    <label className="flex flex-col desktop:flex-row desktop:gap-8">
      <p
        className={`${type === "textarea" ? "justify-start" : ""} desktop:w-[20%] desktop:text-right desktop:text-xl`}
      >
        {title}:{" "}
      </p>
      {type === "textarea" ? (
        <textarea
          className="h-16 resize-none rounded border border-[#545151] px-2 desktop:h-32 desktop:w-[50%]"
          {...register(inputValue, {
            required: true,
          })}
        />
      ) : title === "Start time" ? (
        <input
          className="h-8 rounded border border-[#545151] px-2 desktop:w-[50%] desktop:pl-4"
          type={type}
          min={`${formattedDate}T${hours}:${minutes}`}
          {...register(inputValue, {
            required: true,
          })}
          onChange={handleStartTime}
        />
      ) : title === "End time" ? (
        <input
          className="h-8 rounded border border-[#545151] px-2 desktop:w-[50%] desktop:pl-4"
          type={type}
          min={startTime}
          {...register(inputValue, {
            required: true,
          })}
        />
      ) : title === "Location" ? (
        <AutosearchMap register={register} setValue={setValue} />
      ) : title === "Sport" ? (
        <select
          {...register(inputValue)}
          className="h-8 rounded border border-[#545151] px-2 desktop:w-[50%]"
        >
          <option value="Badminton">Badminton</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Volleyball">Volleyball</option>
        </select>
      ) : (
        <input
          type={type}
          className="h-8 rounded border border-[#545151] px-2 desktop:w-[50%]"
          {...register(inputValue, {
            required: true,
          })}
        />
      )}
    </label>
  );
}
