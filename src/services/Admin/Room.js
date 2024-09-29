import * as httpRequest from '../../unils/HttpRequest';

const getRoom  = async(params) => {
    const url = 'admin/rooms';
    return await httpRequest.get(url, true, {params});
}

const postRoom = async(data) => {
    const url = 'admin/rooms/add';
    return await httpRequest.post(url, data, {"Content-Type": "application/json"});
}
const putRoom = async(id, data) => {
    const url = 'admin/rooms/edit/';
    return await httpRequest.update(url, data, id, true, {"Content-Type": "application/json"});
}
const deleteRoom = async(id) => {
    const url = 'admin/rooms/delete';
    return await httpRequest.remote(url, id);
}

export {postRoom, getRoom, putRoom, deleteRoom}