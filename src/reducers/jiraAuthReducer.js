import { 
    JIRA_AUTH_GET_STATUS
} from '../actions/types.js';

const initialState = {
    authenticated: false,
    url: null,
    loaded: false
};


export default function JiraAuthReducer (state = initialState, action) {
    switch (action.type) {
        case JIRA_AUTH_GET_STATUS:
            return {
                ...state,
                authenticated: action.payload.authenticated,
                url: action.payload.url,
                loaded: true
            };
        default:
            return state;
    }
}
