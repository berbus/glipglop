import axios from 'axios';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import {
    USER_LOGOUT,
    USER_LOADING,
    USER_LOAD
} from './types';


export const logout = () => (dispatch, getState) => {
    axios
        .get('/api/user/logout/', HTTP_CONF)
        .then((res) => {
            dispatch({type: USER_LOGOUT});
            window.location.reload(false);
        })
        .catch((err) => {
            handleActionError(err, null);
        })
};

export const loadUserData = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios
        .get('/api/user/me/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: USER_LOAD,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        })
}
