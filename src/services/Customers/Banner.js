import * as httpRequest from '../../unils/HttpRequest';

const getBanners = () => {
    return httpRequest.get('customers/banner');
}

export  {getBanners}