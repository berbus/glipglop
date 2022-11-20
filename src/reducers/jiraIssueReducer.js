import { 
    JIRA_GET_ISSUES
} from '../actions/types.js';


const initialState = {
    loaded: false,
    issues: {}
};


export default function JiraIssueReducer (state = initialState, action) {
    switch (action.type) {
        case JIRA_GET_ISSUES:
            return {
                ...state,
                issues: action.payload,
                loaded: true
            };
        default:
            return state;
    }
}
