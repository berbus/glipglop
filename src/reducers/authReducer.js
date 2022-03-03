import {
    USER_LOGOUT,
    USER_LOAD
} from '../actions/types.js';


const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    profilePicture: null,
    loggedIn: false,
    loaded: false
};

export default function AuthReducer (state = initialState, action) {
    switch(action.type) {
        case USER_LOGOUT:
            return initialState;
        case USER_LOAD:
            if (Object.keys(action.payload).length === 0) {
                return {
                    ...state,
                    loaded: true
                }
            } else {
                return {
                    ...state,
                    username: action.payload.username,
                    firstName: action.payload.first_name,
                    lastName: action.payload.last_name,
                    profilePicture: action.payload.profile.picture,
                    loaded: true,
                    loggedIn: Object.keys(action.payload).length !== 0
                };
            }
        default:
            return state;

    }
}
