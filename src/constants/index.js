import Cookies from 'js-cookie';

export const HTTP_CONF = {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    },
};

export { OWASP_SECTIONS } from './owaspSections';
