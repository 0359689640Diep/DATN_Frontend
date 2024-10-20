import * as httpRequest from '../unils/HttpRequest';

const getServices = (id) => {
    return httpRequest.get('customers/get-service/'+id, true);
}
const getServiceAdmin  = async(params) => {
    const url = 'admin/service';
    return await httpRequest.get(url, true, {params});
}

const postServiceAdmin = async(data) => {
    const url = 'admin/service/add';
    return await httpRequest.post(url, data, {"Content-Type": "application/json"});
}
const putServiceAdmin = async(id, data) => {
    const url = 'admin/service/edit/';
    return await httpRequest.update(url, data, id, true, {"Content-Type": "application/json"});
}
const deleteServiceAdmin = async(id) => {
    const url = 'admin/service/delete';
    return await httpRequest.remote(url, id);
}
export  {getServices, getServiceAdmin, postServiceAdmin ,putServiceAdmin ,deleteServiceAdmin }