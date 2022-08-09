import { 
    GET_SECURITY_TEST_DETAILS,
    CLEAR_SECURITY_TEST_DETAILS,
    COMPLETE_SECURITY_TEST
} from '../actions/types.js';


const initialSecurityTestDetails = {
    oid: null,
    title: null,
    creationDate: null,
    completion_date: null,
    template: null,
    service: null,
    review: null,
    testCases: [],
    loaded: false,
}

const initialState = initialSecurityTestDetails;


export default function SecurityTestDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_SECURITY_TEST_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                title: action.payload.title,
                creationDate: action.payload.creation_date,
                template: action.payload.template,
                service: action.payload.service,
                review: action.payload.review,
                testCases: action.payload.tests,
                completionDate: action.payload.completion_date,
                loaded: true
            };
        case CLEAR_SECURITY_TEST_DETAILS:
            return initialSecurityTestDetails;
        case COMPLETE_SECURITY_TEST:
            return {
                ...state,
                completionDate: action.payload.completion_date
            };
        default:
            return state;
    }
}

