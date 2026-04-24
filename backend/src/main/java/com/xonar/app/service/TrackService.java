package com.xonar.app.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.xonar.app.dto.TrackDTO;
import com.xonar.app.entity.TrackEntity;
import com.xonar.app.exception.status.ConflictException;
import com.xonar.app.exception.status.NotFoundException;
import com.xonar.app.exception.status.ServiceException;
import com.xonar.app.mapper.TrackMapper;
import com.xonar.app.repository.TrackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Validated
public class TrackService {
    private final TrackRepository trackRepository;
    private final TrackMapper trackMapper;
    private final Cloudinary cloudinary;

    private String getCurrentOwner() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Transactional(readOnly = true) // Ensures consistency across multiple steps, returning the data to its original state if a step fails
    public List<TrackDTO> getService() {
        return trackRepository.findByOwner(getCurrentOwner())
            .stream()
            .map(trackMapper::toDTO) // Short-hand version for .map(track -> trackMapper.toDTO(track))
            .toList();
    }

    @Transactional
    public TrackDTO createService(TrackDTO dto, MultipartFile file) {
        if (trackRepository.existsByTitleIgnoreCaseAndOwner(dto.getTitle(), getCurrentOwner()))
            throw new ConflictException("You already have this track");

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "video", // Cloudinary treats audio as 'video', I found this out the hard way
                "folder", "xonar/tracks" + getCurrentOwner(),
                "public_id", dto.getTitle().replaceAll("\\s+", "_"),
                "secure", true
            ));

            String url = (String) uploadResult.get("secure_url");

            if (url == null) 
                throw new ServiceException("Cloudinary failed to return a secure URL");
        
            TrackEntity entity = trackMapper.toEntity(dto, getCurrentOwner(), url);

            if (entity == null) 
                throw new ServiceException("Failed to map track data");

            // System.out.println(entity); <-- debugging

            return trackMapper.toDTO(trackRepository.save(entity));

        } catch (IOException e) {
            throw new ServiceException("POST error: " + e.getMessage());
        }
    }

    @Transactional
    public TrackDTO favoriteService(@NonNull String id) {
        TrackEntity entity = trackRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Track with ID " + id + " doesn't exist"));

        if (!entity.getOwner().equalsIgnoreCase(getCurrentOwner())) 
            throw new AccessDeniedException("You do not have permission to alter this track");

        entity.setFavorited(!entity.getFavorited());
        trackRepository.save(entity);
        
        return trackMapper.toDTO(entity);
    }

    @Transactional
    public void deleteService(@NonNull String id) {
        TrackEntity entity = trackRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Track with ID " + id + " doesn't exist"));
            
        if (!entity.getOwner().equalsIgnoreCase(getCurrentOwner())) 
            throw new AccessDeniedException("You do not have permission to delete this track");

        trackRepository.delete(entity);
    }
}
