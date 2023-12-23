const Timer = ({name, durationInSeconds}) => {
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
  }

  return (
    <div className="timer">
      <div>
        <h4>{name}</h4>
        <h3>{durationToText(durationInSeconds)}</h3>
      </div>
      <div>
        <button className="btn stop-btn" onClick={() => {console.log("stop")}}></button>
        <button className="btn start-btn" onClick={() => {console.log("start")}}></button>
      </div>
    </div>
  )
};

export default Timer;