import * as httpRequest from '../../unils/HttpRequest';

const getRoomType = async (params) => {
    const response = await httpRequest.get('/admin/rooms-type/', true, {params});
    return response;
}

const postRoomType = async (data) => {
    const response = await httpRequest.post('admin/rooms-type/add', data,);
    return response;
}
const putRoomType = async (data, id) => {
    const response = await httpRequest.post(`admin/rooms-type/edit/${id}`, data);
    return response;
}

export {getRoomType, postRoomType, putRoomType}