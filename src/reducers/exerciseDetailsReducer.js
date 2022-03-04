import { 
    GET_EXERCISE_DETAILS,
    CLEAR_EXERCISE_DETAILS,
    FINISH_EXERCISE
} from '../actions/types.js';


const initialExerciseDetails = {
    oid: null,
    title: null,
    creation_date: null,
    template: null,
    serviceName: null,
    templateName: null,
    service: null,
    testCases: [],
    loaded: false,
    finished: false
}

const initialState = initialExerciseDetails;


export default function ExerciseDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_EXERCISE_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                title: action.payload.title,
                creation_date: action.payload.creation_date,
                template: action.payload.template,
                service: action.payload.service,
                testCases: action.payload.tests,
                serviceName: action.payload.service_name,
                templateName: action.payload.template_name,
                finished: action.payload.finished,
                loaded: true
            };
        case CLEAR_EXERCISE_DETAILS:
            return initialExerciseDetails;
        case FINISH_EXERCISE:
            return {
                ...state,
                finished: true
            };
        default:
            return state;
    }
}
