const textToDurationSecs = (text) => {
    const nums = text.split(":");
    // console.log(nums);
    var secs = 0;
    for (var e = 0; e < nums.length; e++) {
        if (isNaN(nums[nums.length - e - 1])) {
            return undefined;
        }
        secs += Number(nums[nums.length - e - 1]) * Math.pow(60, e);
    }
    // console.log(secs);
    return secs;
}

export default textToDurationSecs;