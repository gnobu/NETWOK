import { combineReducers } from "redux";

import user from './user.reducer';
import profile from './profile.reducer';
import timeline from './timeline.reducer';

export default combineReducers({
    user,
    profile,
    timeline
})