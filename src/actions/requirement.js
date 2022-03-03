import axios from 'axios';

import { itemsListToDict } from '../utils';
import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_REQUIREMENTS
} from './types';


export const getRequirements = () => (dispatch, getState) => {
    axios
        .get('/api/requirement/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_REQUIREMENTS,
                payload: itemsListToDict(res.data),
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};
