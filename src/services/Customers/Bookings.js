import * as httpRequest from '../../unils/HttpRequest';

const postBooking = async(body) => {
    try {   
        
        return await httpRequest.post("/customers/bookings", body, {"Content-Type": "application/json"});
    } catch (error) {
        return error.response;
    }
}
const getBooking = () => {
    return httpRequest.get('customers/get-bookings', true);
}
const getBookingDetail = (id) => {
    return httpRequest.get(`customers/get-bookings/${id}`, true);
}
const confirmBooking = async(body, id) => {
    try {   
        
        return await httpRequest.update("/customers/confirm-bookings/", body, id, true, {"Content-Type": "application/json"});
    } catch (error) {
        return error.response;
    }
}



export  {postBooking, getBooking, confirmBooking, getBookingDetail}