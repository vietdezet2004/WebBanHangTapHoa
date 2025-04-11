package com.organica.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    // Đường dẫn lưu file; nếu folder uploads cùng cấp với dự án, giữ nguyên "uploads/"
    private final String uploadDir = "uploads/";

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
        // Trả về đường dẫn truy cập file (ứng với cấu hình Resource Handler bên dưới)
        String baseURL = "http://localhost:8000"; // hoặc domain thật
        return baseURL + "/uploads/" + fileName;
    }
}
