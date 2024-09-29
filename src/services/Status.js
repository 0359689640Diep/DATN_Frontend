import * as httpRequest from '../unils/HttpRequest';
const getStatus = async() => {
    try {
        return await httpRequest.get('status');
    } catch (error) {
        return error;
    }
}

export {getStatus}