import axios from 'axios';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    JIRA_AUTH_GET_STATUS
} from './types';


export const getJiraAuthStatus = () => (dispatch, getState) => {
    axios
        .get('/api/jira_auth/status/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_AUTH_GET_STATUS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};
