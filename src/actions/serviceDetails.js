import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_SERVICE_DETAILS,
    CLEAR_SERVICE_DETAILS,
    UPDATE_SERVICE_DETAILS
} from './types';


export const getServiceDetails = (serviceID) => (dispatch, getState) => {
    axios
        .get(`/api/service/${serviceID}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_SERVICE_DETAILS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const clearServiceDetails = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_SERVICE_DETAILS
    });
};


export const updateServiceDetails = (serviceId, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .patch(`/api/service/${serviceId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: UPDATE_SERVICE_DETAILS,
                payload: res.data
            });
            toast.success('Service updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};
