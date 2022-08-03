import axios from 'axios';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    JIRA_GET_ISSUES
} from './types';


export const getJiraIssues = () => (dispatch, getState) => {
    axios
        .get('/api/jira_issue/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_GET_ISSUES,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};
