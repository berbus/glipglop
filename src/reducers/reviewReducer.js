import { 
    GET_REVIEWS,
    CREATE_REVIEW,
    DELETE_REVIEW,
} from '../actions/types.js';


const initialState = {
    reviews: [],
    loaded: false
};


export default function ReviewReducer (state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loaded: true
            };
        case CREATE_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
                loaded: true
            };
        case DELETE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(x => x.oid !== action.payload.reviewId)
            };
        default:
            return state;
    }
}
