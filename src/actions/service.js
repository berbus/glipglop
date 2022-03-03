import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import {
    GET_SERVICES,
    CREATE_SERVICE,
    LOADED_SERVICES,
    DELETE_SERVICE
} from './types';


export const getServices = () => (dispatch, getState) => {
    axios
        .get('/api/service/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_SERVICES,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
            dispatch({type: LOADED_SERVICES});
        });
};


export const createService = (serviceName, confluenceSpace, confluenceParentId) => (dispatch, getState) => {
    let data = {
        'name': serviceName,
        'confluence_space': confluenceSpace,
        'confluence_parent_id': confluenceParentId
    }

    const tid = toast.loading('Loading...')

    axios
        .post('/api/service/', data, HTTP_CONF)
        .then((res) => {
            toast.success('Service created', {id: tid});
            dispatch({
                type: CREATE_SERVICE,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, tid);
        })
}


export const deleteService = (serviceId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    axios
        .delete(`/api/service/${serviceId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_SERVICE,
                payload: {serviceId: serviceId}
            });
            toast.success('Service deleted', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}
