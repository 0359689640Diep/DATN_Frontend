import * as httpRequest from '../../unils/HttpRequest';

const getRoomType = (params) => {
    return httpRequest.get('customers/room-type', true, {params});
}
const getRoomTypeById = (id) => {
    return httpRequest.get(`customers/room-type/${id}`, true,);
}

export  {getRoomType, getRoomTypeById}