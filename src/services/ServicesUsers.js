import * as httpRequest from '../unils/HttpRequest';

const getServiceUsersByIdService = (id, params) => {
    return httpRequest.get('admin/service-users/service/'+id, true, {params});
}
const getServiceAdmin  = async(params) => {
    const url = 'admin/service-users';
    return await httpRequest.get(url, true, {params});
}

const postServiceUsersAdmin = async(data) => {
    const url = 'admin/service-users/add';
    return await httpRequest.post(url, data, {"Content-Type": "application/json"});
}
const putServiceUsersAdmin = async(id, data) => {
    const url = 'admin/service-users/edit/';
    return await httpRequest.update(url, data, id, true, {"Content-Type": "application/json"});
}
const deleteServiceUsersAdmin = async(id) => {
    const url = 'admin/service-users/delete';
    return await httpRequest.remote(url, id);
}
export  {getServiceUsersByIdService, getServiceAdmin, postServiceUsersAdmin ,putServiceUsersAdmin ,deleteServiceUsersAdmin }