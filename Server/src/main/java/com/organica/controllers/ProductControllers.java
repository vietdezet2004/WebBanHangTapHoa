package com.organica.controllers;

import com.organica.payload.ApiResponse;
import com.organica.payload.ProductDto;
import com.organica.services.ProductService;
import com.organica.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.organica.entities.CategoryEnum;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductControllers {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileStorageService fileStorageService;

    // Create Product
    @PostMapping(value = "/add")
    public ResponseEntity<ProductDto> CreateProduct(
            @RequestParam MultiValueMap<String, String> formData,
            @RequestParam("img") MultipartFile file) throws IOException {

        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setWeight(Float.valueOf(formData.getFirst("weight")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));

        // Lưu file ảnh và lấy URL
        String imageUrl = fileStorageService.storeFile(file);
        productDto.setImgUrl(imageUrl);

        // Lấy category từ formData (nếu có)
        String categoryStr = formData.getFirst("category");
        if (categoryStr != null && !categoryStr.isEmpty()) {
            productDto.setCategory(CategoryEnum.valueOf(categoryStr));
        } else {
            productDto.setCategory(CategoryEnum.KHAC);
        }

        ProductDto saved = this.productService.CreateProduct(productDto);
        return new ResponseEntity<>(saved, HttpStatusCode.valueOf(200));
    }

    // Get Product by Id
    @GetMapping("/{productid}")
    public ResponseEntity<ProductDto> GetById(@PathVariable Integer productid) {
        ProductDto product = this.productService.ReadProduct(productid);
        return new ResponseEntity<>(product, HttpStatusCode.valueOf(200));
    }

    // Get All Products
    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAll() {
        List<ProductDto> products = this.productService.ReadAllProduct();
        return new ResponseEntity<>(products, HttpStatusCode.valueOf(200));
    }

    // Get Featured Products
    @GetMapping("/featured")
    public ResponseEntity<List<ProductDto>> getFeaturedProducts() {
        List<ProductDto> featured = this.productService.getFeaturedProducts();
        return new ResponseEntity<>(featured, HttpStatusCode.valueOf(200));
    }

    // Delete Product
    @DeleteMapping(value = "/del/{ProductId}", produces = "application/json")
    public ResponseEntity<ApiResponse> Delete(@PathVariable Integer ProductId) {
        this.productService.DeleteProduct(ProductId);
        return new ResponseEntity<>(new ApiResponse("Product deleted"), HttpStatusCode.valueOf(200));
    }

    // Lọc theo danh mục
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String category) {
        CategoryEnum categoryEnum = CategoryEnum.valueOf(category);
        List<ProductDto> products = productService.getProductsByCategory(categoryEnum);
        return new ResponseEntity<>(products, HttpStatusCode.valueOf(200));
    }

    // Update Product
    @PutMapping("/{ProductId}")
    public ResponseEntity<ProductDto> UpdateProduct(
            @RequestParam MultiValueMap<String, String> formData,
            @RequestParam(value = "img", required = false) MultipartFile file,
            @PathVariable Integer ProductId) throws IOException {

        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setWeight(Float.valueOf(formData.getFirst("weight")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));

        // Nếu có file mới được upload, lưu file và cập nhật URL
        if (file != null && !file.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(file);
            productDto.setImgUrl(imageUrl);
        }

        // Lấy category từ formData (nếu có)
        String categoryStr = formData.getFirst("category");
        if (categoryStr != null && !categoryStr.isEmpty()) {
            productDto.setCategory(CategoryEnum.valueOf(categoryStr));
        } else {
            productDto.setCategory(CategoryEnum.KHAC);
        }

        ProductDto saved = this.productService.UpdateProduct(productDto, ProductId);
        return new ResponseEntity<>(saved, HttpStatusCode.valueOf(200));
    }
}
