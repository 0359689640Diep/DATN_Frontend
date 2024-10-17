import * as httpRequest from '../unils/HttpRequest';

const getUsers = () => {
    return httpRequest.get('customers/get-customer', true);
}
const updateUsers = (data) => {
    return httpRequest.post('customers/update-customer', data, );
}

export  {getUsers, updateUsers}