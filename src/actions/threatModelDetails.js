import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_THREAT_MODEL_DETAILS,
    CLEAR_THREAT_MODEL_DETAILS,
    COMPLETE_THREAT_MODEL
} from './types';


export const getThreatModelDetails = (threatModelId) => (dispatch, getState) => {
    axios
        .get(`/api/threat_model/${threatModelId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_THREAT_MODEL_DETAILS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const clearThreatModelDetails = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_THREAT_MODEL_DETAILS });
};


export const completeThreatModel = (threatModelId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .get(`/api/threat_model/${threatModelId}/complete/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: COMPLETE_THREAT_MODEL,
                payload: res.data
            });
            toast.success('Threat model completed', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};

