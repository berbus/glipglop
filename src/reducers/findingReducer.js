import {
    GET_FINDINGS,
    CLEAR_FINDINGS,
    CREATE_FINDING,
    UPDATE_FINDING,
    DELETE_FINDING
} from '../actions/types.js';

const initialState = {
    findings: {},
    loaded: false
};

export default function FindingReducer (state = initialState, action) {
    switch (action.type) {
        case GET_FINDINGS:
            return {
                ...state,
                findings: action.payload,
                loaded: true
            };
        case CLEAR_FINDINGS:
            return initialState;
        case CREATE_FINDING:
            return {
                ...state,
                findings: state.findings.concat([action.payload]),
                loaded: true
            };
        case UPDATE_FINDING:
            return {
                ...state,
                findings: state.findings.map((finding, i) => {
                    return finding.oid === action.payload.oid
                        ? {...finding, ...action.payload} 
                        : finding}
                ),
                loaded: true
            };
        case DELETE_FINDING:
            return {
                ...state,
                findings: state.findings.filter(f => f.oid !== action.payload.findingId)
            };
        default:
            return state;
    }
}
