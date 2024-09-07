export function formatStartTime(startTime) {

  const startTimeObj = new Date(startTime);
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedStartTime = new Intl.DateTimeFormat("en-GB", options).format(
    startTimeObj,
  );

  return formattedStartTime;
}

export function formatEndTime(endTime) {
  const endTimeObj = new Date(endTime);
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedEndTime = new Intl.DateTimeFormat("en-GB", options).format(
    endTimeObj,
  );

  return formattedEndTime;
}

export function formatDate(startTime) {
  const date = new Date(startTime);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long", timeZone: "Asia/Kuala_Lumpur" });

  return `${day} ${month}`;
}
