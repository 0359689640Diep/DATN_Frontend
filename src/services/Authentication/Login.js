import * as httpRequest from '../../unils/HttpRequest';

export default async function LoginRequset (body){
    try {   
        
        return await httpRequest.post("/authentication/login", body);
    } catch (error) {
        return error.response;
    }
}