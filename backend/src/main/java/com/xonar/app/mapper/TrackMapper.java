package com.xonar.app.mapper;

import org.springframework.stereotype.Component;

import com.xonar.app.dto.TrackDTO;
import com.xonar.app.entity.TrackEntity;

@Component
public class TrackMapper {
    // Pass the user inputs to database
    // No .id is defined, toEntity() will ignore it even when user tries to define an ID
    public TrackEntity toEntity(TrackDTO dto, String owner, String fileURL) {
        return TrackEntity.builder()
            .owner(owner)
            .cover(dto.getCover())
            .title(dto.getTitle())
            .artist(dto.getArtist())
            .fileURL(fileURL)
            .favorited(dto.getFavorited())
            .build();
    }

    // Pass the database values back to the user
    // Allows frontend to read the value as it cant receive the data directly from the database
    public TrackDTO toDTO(TrackEntity entity) {
        return TrackDTO.builder()
            .id(entity.getId())
            .cover(entity.getCover())
            .title(entity.getTitle())
            .artist(entity.getArtist())
            .fileURL(entity.getFileURL())
            .favorited(entity.getFavorited())
            .build();
    }
}
