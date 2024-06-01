package com.course_manage.cms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLogin {
    String status;
    String email;
    String token;
}

