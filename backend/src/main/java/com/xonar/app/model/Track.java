package com.xonar.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;

@Document(collection = "tracks")
public class Track {

    @Id
    private String id;
    @NotBlank
    private String title;
    @NotBlank
    private String artist;
    @NotBlank
    private String fileURL;

    public Track() {} //Creates an empty object first then fill in values from the database

    //Contructs data
    public Track(String id, String title, String artist, Double duration, String fileURL) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.fileURL = fileURL;
    }

    //Reads values out of the object in data
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getArtist() { return artist; }
    public String getFileURL() { return fileURL; }
}
