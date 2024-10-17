import * as httpRequest from '../unils/HttpRequest';

const getBanners = () => {
    return httpRequest.get('customers/banner');
}

const getBannersAdmin = () => {
    return httpRequest.get('admin/banner', true);
}

const postBannersAdmin = async (data) => {
    const response = await httpRequest.post('admin/banner/add', data,);
    return response;
}
const putBannersAdmin = async (data, id) => {
    const response = await httpRequest.post(`admin/banner/edit/${id}`, data);
    return response;
}

export  {getBanners, getBannersAdmin, postBannersAdmin, putBannersAdmin}