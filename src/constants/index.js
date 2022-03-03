import Cookies from 'js-cookie';

export const API_URL = "http://localhost:8000/"
export const HTTP_CONF = {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    },
};
