import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_TEMPLATES,
    LOADED_TEMPLATES,
    CREATE_TEMPLATE,
    DELETE_TEMPLATE
} from './types';


export const getTemplates = () => (dispatch, getState) => {
    axios
        .get('/api/template/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_TEMPLATES,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
            dispatch({type: LOADED_TEMPLATES});
        });
};


export const createTemplate = (templateName) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    let data = {
        'name': templateName,
        'requirements': []
    }

    axios
        .post('/api/template/', data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: CREATE_TEMPLATE,
                payload: res.data,
            });
            toast.success('Create template', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });

}


export const deleteTemplate = (templateId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/template/${templateId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_TEMPLATE,
                payload: {templateId: templateId}
            });
            toast.success('Delete template', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, null);
            dispatch({type: LOADED_TEMPLATES});
        });
}
