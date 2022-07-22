const initialState = [];

const timeline = (timeline = initialState, { type, payload }) => {
    switch (type) {
        case "timeline/FETCH_TIMELINE":
            return payload;
        default:
            return timeline;
    }
}

export default timeline;