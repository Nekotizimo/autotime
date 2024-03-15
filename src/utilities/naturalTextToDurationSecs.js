import juration from "juration";

const naturalTextToDurationSecs = (text) => {
    try {
        const res = juration.parse(text);
        return res; 
    } catch (error) {
        return undefined;
    }
}

export default naturalTextToDurationSecs;