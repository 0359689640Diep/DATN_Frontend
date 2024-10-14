import * as httpRequest from '../../unils/HttpRequest';

const getUsers = () => {
    return httpRequest.get('customers/get-customer', true);
}

export  {getUsers}