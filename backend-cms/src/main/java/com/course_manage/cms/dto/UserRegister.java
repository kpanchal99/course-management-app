package com.course_manage.cms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegister {
    String email;
    String status;
    long id;
    String token;
    Boolean isAdmin;
}