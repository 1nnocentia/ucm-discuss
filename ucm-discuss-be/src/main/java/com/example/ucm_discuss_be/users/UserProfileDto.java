package com.example.ucm_discuss_be.users;

import com.example.ucm_discuss_be.faculties.FacultyResponseDto;
import com.example.ucm_discuss_be.majors.MajorResponseDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
    "name",
    "nim",
    "major",
    "faculty",
    "votesCount",
    "headerImage",
    "postCount",
    "commentCount",
    "isAnonymous",
})
public class UserProfileDto {

    @JsonProperty("nim")
    private String nimOrNisn;

    private String name;

    private String major;

    private String faculty;

    private int votesCount;

    private String headerImage;

    private int postCount;

    private int commentCount;
    
    @JsonProperty("isAnonymous")
    private Boolean isAnon;
    
    
}