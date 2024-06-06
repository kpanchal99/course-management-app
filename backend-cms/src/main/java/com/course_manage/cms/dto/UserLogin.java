package com.course_manage.cms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLogin {
    long id;
    String status;
    String email;
    String token;
    Boolean isAdmin;
}

