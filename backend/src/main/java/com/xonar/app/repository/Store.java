package com.xonar.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.xonar.app.model.Track;

//CRUD Functionality
public interface Store extends MongoRepository<Track, String> {
    boolean existsByTitleIgnoreCase(String title);
}
