package com.example.ucm_discuss_be.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "email",
    "isStudent",
    "name",
    "nim"
})

public class UserLoginDto {
    //To match ze Contract
    private Long id;

    private String email;

    private Boolean isStudent;

    private String name;

    @JsonProperty("nim")
    private String nimOrNisn;

}
