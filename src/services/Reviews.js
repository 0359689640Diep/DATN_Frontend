import * as httpRequest from '../unils/HttpRequest';

const getReviews = (params) => {
    return httpRequest.get('customers/reviews', true, {params});
}
const getReviewsByIdRoomType = (id) => {
    return httpRequest.get(`customers/reviews/${id}`, true,);
}
const getReviewsByIdBookings = (id) => {
    return httpRequest.get(`customers/reviews/bookings/${id}`, true,);
}
const postReviews = (data) => {
    return httpRequest.post(`customers/reviews/bookings`, data, true, {"Content-Type": "application/json"});
}
const getAverageRatingType = (id) => {
    return httpRequest.get(`customers/reviews/average-rating/${id}`, true,);
}

export  {getReviews, getReviewsByIdRoomType, getAverageRatingType, getReviewsByIdBookings, postReviews}