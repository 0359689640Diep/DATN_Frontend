import * as httpRequest from '../../unils/HttpRequest';

const getReviews = (params) => {
    return httpRequest.get('customers/reviews', true, {params});
}
const getReviewsByIdRoomType = (id) => {
    return httpRequest.get(`customers/reviews/${id}`, true,);
}

const getAverageRatingType = (id) => {
    return httpRequest.get(`customers/reviews/average-rating/${id}`, true,);
}

export  {getReviews, getReviewsByIdRoomType, getAverageRatingType}