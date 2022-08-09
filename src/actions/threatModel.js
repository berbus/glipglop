import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    CREATE_THREAT_MODEL,
    CREATE_THREAT_MODEL_FOR_REVIEW,
    DELETE_THREAT_MODEL,
    GET_THREAT_MODELS,
} from './types';


export const getThreatModels = () => (dispatch, getState) => {
    axios
        .get('/api/threat_model/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_THREAT_MODELS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const createThreatModel = (threatModelData, forReview) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    const type = forReview ? CREATE_THREAT_MODEL_FOR_REVIEW : CREATE_THREAT_MODEL;

    axios
        .post('/api/threat_model/', threatModelData, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: type,
                payload: res.data
            });
            toast.success('Created threat model', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};


export const deleteThreatModel = (threatModelId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    axios
        .delete(`/api/threat_model/${threatModelId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_THREAT_MODEL,
                payload: {threatModelId: threatModelId}
            });
            toast.success('Threat model deleted', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}

