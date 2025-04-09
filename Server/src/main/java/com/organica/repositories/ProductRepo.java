package com.organica.repositories;

import com.organica.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.organica.entities.CategoryEnum;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    // Lấy 5 sản phẩm có viewCount cao nhất
    List<Product> findTop5ByOrderByViewCountDesc();
    // Lọc sản phẩm theo danh mục
    List<Product> findByCategory(CategoryEnum category);

}
