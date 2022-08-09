import { 
    GET_REVIEW_DETAILS,
    CLEAR_REVIEW_DETAILS,
    CREATE_SECURITY_TEST_FOR_REVIEW,
    CREATE_THREAT_MODEL_FOR_REVIEW,
    COMPLETE_REVIEW
} from '../actions/types.js';

const initialReviewDetails = {
    oid: null,
    title: null,
    creation_date: null,
    completion_date: null,
    services: [],
    securityTests: [],
    threatModels: [],
    jiraIssue: null,
    loaded: false,
}

const initialState = initialReviewDetails;


export default function ReviewDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                title: action.payload.title,
                creation_date: action.payload.creation_date,
                completion_date: action.payload.completion_date,
                services: action.payload.services,
                securityTests: action.payload.security_tests,
                threatModels: action.payload.threat_models,
                jiraIssue: action.payload.jira_issue,
                loaded: true
            };
        case CLEAR_REVIEW_DETAILS:
            return initialReviewDetails;
        case CREATE_SECURITY_TEST_FOR_REVIEW:
            return {
                ...state,
                securityTests: [...state.securityTests, action.payload],
            };
        case CREATE_THREAT_MODEL_FOR_REVIEW:
            return {
                ...state,
                threatModels: [...state.threatModels, action.payload],
            };
        case COMPLETE_REVIEW:
            return {
                ...state,
                completion_date: action.payload.completion_date
            };
        default:
            return state;
    }
}
