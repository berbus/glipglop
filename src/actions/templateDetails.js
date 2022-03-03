import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_TEMPLATE_DETAILS,
    CLEAR_TEMPLATE_DETAILS,
    UPDATE_TEMPLATE_DETAILS
} from './types';


export const getTemplateDetails = (templateId) => (dispatch, getState) => {
    axios
        .get(`/api/template/${templateId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_TEMPLATE_DETAILS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

export const clearTemplateDetails = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_TEMPLATE_DETAILS });
};


export const updateTemplateDetails = (templateId, data)  => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .patch(`/api/template/${templateId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: UPDATE_TEMPLATE_DETAILS,
                payload: res.data
            });
            toast.success('Template updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}
