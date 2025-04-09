package com.organica.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Nếu thư mục uploads nằm cùng cấp với file jar (hoặc ở vị trí chạy ứng dụng)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");

        // Nếu cần sử dụng đường dẫn tuyệt đối, ví dụ:
        // registry.addResourceHandler("/uploads/**")
        //         .addResourceLocations("file:/C:/path/to/your/project/uploads/");
    }
}
