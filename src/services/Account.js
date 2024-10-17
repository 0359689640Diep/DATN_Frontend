import * as httpRequest from '../unils/HttpRequest';

const getAccount = async (params) => {
    const response = await httpRequest.get('/admin/account/', true, {params});
    return response;
}

const postAccount = async (data) => {
    const response = await httpRequest.post('admin/account/add', data,);
    return response;
}
const putAccount = async (data, id) => {
    const response = await httpRequest.post(`admin/account/edit/${id}`, data);
    return response;
}

export {getAccount, postAccount, putAccount}