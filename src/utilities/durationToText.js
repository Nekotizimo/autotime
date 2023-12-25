const durationToText = (durationInSeconds) => {
  var res = "";
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;
  if (hours > 0) {
    res += hours.toString() + ":";
  }
  if (minutes < 10) {
    res += "0";
  }
  res += minutes.toString() + ":";
  if (seconds < 10) {
    res += "0";
  }
  res += seconds.toString();
  // console.log(res);
  return res;
};

export default durationToText;
