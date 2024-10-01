import * as httpRequest from '../../unils/HttpRequest';

const getRoomType = (params) => {
    return httpRequest.get('customers/room-type', true, {params});
}

export  {getRoomType}