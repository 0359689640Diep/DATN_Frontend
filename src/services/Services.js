import * as httpRequest from '../unils/HttpRequest';

const getServices = (id) => {
    return httpRequest.get('customers/get-service/'+id, true);
}

export  {getServices}