import { 
    GET_EXERCISES,
    LOADED_EXERCISES,
    CREATE_EXERCISE,
    DELETE_EXERCISE,
} from '../actions/types.js';


const initialState = {
    exercises: [],
    loaded: false
};


export default function ExerciseReducer (state = initialState, action) {
    switch (action.type) {
        case GET_EXERCISES:
            return {
                ...state,
                exercises: action.payload,
                loaded: true
            };
        case LOADED_EXERCISES:
            return {
                ...state,
                loaded: true
            };
        case CREATE_EXERCISE:
            return {
                ...state,
                exercises: [...state.exercises, action.payload],
                loaded: true
            };
        case DELETE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.filter(x => x.oid !== action.payload.exerciseId)
            };
        default:
            return state;
    }
}
