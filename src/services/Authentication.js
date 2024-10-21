import * as httpRequest from '../unils/HttpRequest';

async function LoginRequset (body){
    try {   
        
        return await httpRequest.post("/authentication/", body);
    } catch (error) {
        return error.response;
    }
}
async function LogoutRequset (body){
    try {   
        
        return await httpRequest.get("/authentication/logout", true);
    } catch (error) {
        return error.response;
    }
}

async function RegisterRequset (body){
    try {   
        
        return await httpRequest.post("/authentication/register", body);
    } catch (error) {
        return error.response;
    }
}
async function ConfirmRegisterRequset (body){
    try {   
        
        return await httpRequest.post("/authentication/register-verification", body);
    } catch (error) {
        return error.response;
    }
}

async function ForgotPasswordRequset (body){
    try {   
        
        return await httpRequest.post("/authentication/forgot-password", body);
    } catch (error) {
        return error.response;
    }
}

async function ForgotPasswordRequsetVerification (body){
    try {   
        
        return await httpRequest.post("/authentication/forgot-password-verification", body);
    } catch (error) {
        return error.response;
    }
}

export {LoginRequset, LogoutRequset, RegisterRequset, ConfirmRegisterRequset, ForgotPasswordRequset, ForgotPasswordRequsetVerification}