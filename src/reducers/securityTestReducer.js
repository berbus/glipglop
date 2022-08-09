import { 
    GET_SECURITY_TESTS,
    CREATE_SECURITY_TEST,
    DELETE_SECURITY_TEST,
} from '../actions/types.js';
import { itemsListToDict } from '../utils';


const initialState = {
    security_tests: {},
    loaded: false
};


export default function SecurityTestReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_SECURITY_TESTS:
            return {
                ...state,
                security_tests: itemsListToDict(action.payload),
                loaded: true
            };
        case CREATE_SECURITY_TEST:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                security_tests: {...state.security_tests, ...newItem}
            };
        case DELETE_SECURITY_TEST:
            return {
                ...state,
                security_tests: Object.keys(state.security_tests)
                .filter((key) => key !== action.payload.securityTestId)
                .reduce((cur, key) => { 
                    return Object.assign(cur, { [key]: state.security_tests[key] })
                }, {})
            };
        default:
            return state;
    }
}
