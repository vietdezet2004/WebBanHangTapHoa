package com.organica.services;

import com.organica.payload.ProductDto;
import java.util.List;
import com.organica.entities.CategoryEnum;

public interface ProductService {

    // create
    ProductDto CreateProduct(ProductDto productDto);

    // read
    ProductDto ReadProduct(Integer productId);

    // read all
    List<ProductDto> ReadAllProduct();

    // delete
    void DeleteProduct(Integer productId);

    // update
    ProductDto UpdateProduct(ProductDto productDto, Integer productId);

    // lấy sản phẩm nổi bật (ví dụ: top 5 sản phẩm có viewCount cao nhất)
    List<ProductDto> getFeaturedProducts();
    //Lấy sản phẩm theo danh mục
    List<ProductDto> getProductsByCategory(CategoryEnum category);
}
