package com.course_manage.cms.dto;


import java.util.Date;

public class ApiResponse {

    String status;
    Date date;
    public ApiResponse(String status){
        this.status = status;
        this.date = new Date();
    }
}
interface ApiData{
}
class LoginResponse implements ApiData{
    String token;
    LoginResponse(String token){
        this.token = token;
    }
}

class SignUpResponse implements ApiData{

}