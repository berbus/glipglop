import { 
    GET_TEST_CASE,
    CLEAR_TEST_CASES,
    UPDATE_TEST_CASE,
    BULK_UPDATE_TEST_CASE
} from '../actions/types.js';
import { itemsListToDict } from '../utils';


const initialState = {
    testCases: {},
    loaded: false
};


export default function TestCaseReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_TEST_CASE:
            return {
                ...state,
                testCases: itemsListToDict(action.payload),
                loaded: true
            };
        case CLEAR_TEST_CASES:
            return initialState;
        case UPDATE_TEST_CASE:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload
            return {
                ...state,
                testCases: {...state.testCases, ...newItem},
                loaded: true
            };
        case BULK_UPDATE_TEST_CASE:
            return {
                ...state,
                testCases: {...state.testCases, ...itemsListToDict(action.payload)},
                loaded: true
            };
        default:
            return state;
    }
}
