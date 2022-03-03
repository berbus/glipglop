import {
    GET_FINDINGS,
    CLEAR_FINDINGS,
    CREATE_FINDING,
    UPDATE_FINDING
} from '../actions/types.js';
import { itemsListToDict } from '../utils';

const initialState = {
    findings: {},
    loaded: false
};

export default function FindingReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_FINDINGS:
            return {
                ...state,
                findings: itemsListToDict(action.payload),
                loaded: true
            };
        case CLEAR_FINDINGS:
            return initialState;
        case CREATE_FINDING:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload
            return {
                ...state,
                findings: {...state.findings, ...newItem},
                loaded: true
            };
        case UPDATE_FINDING:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload
            return {
                ...state,
                findings: {...state.findings, ...newItem},
                loaded: true
            };
        default:
            return state;
    }
}
