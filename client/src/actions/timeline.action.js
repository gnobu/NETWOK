import * as api from '../api';

// FETCH TIMELINE
export const fetchTimeline = () => async (dispatch) => {
    const { data } = await api.fetchTimelime();
    if (data.ok) {
        dispatch({ type: 'timeline/FETCH_TIMELINE', payload: data.data.timeline });
    } else {
        return data.error?.message;
    }
}