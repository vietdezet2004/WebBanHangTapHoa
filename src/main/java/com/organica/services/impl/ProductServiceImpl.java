package com.organica.services.impl;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.repositories.ProductRepo;
import com.organica.services.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import com.organica.entities.CategoryEnum;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;

    @Override
    public ProductDto CreateProduct(ProductDto productDto) {
        Product product = this.modelMapper.map(productDto, Product.class);
        product.setViewCount(0);
        Product saved = this.productRepo.save(product);
        return this.modelMapper.map(saved, ProductDto.class);
    }

    @Override
    public ProductDto ReadProduct(Integer productId) {
        Product product = this.productRepo.findById(productId).orElseThrow();
        product.setViewCount(product.getViewCount() + 1);
        productRepo.save(product);
        return this.modelMapper.map(product, ProductDto.class);
    }

    @Override
    public List<ProductDto> ReadAllProduct() {
        List<Product> all = this.productRepo.findAll();
        return all.stream()
                .map(entity -> this.modelMapper.map(entity, ProductDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void DeleteProduct(Integer productId) {
        this.productRepo.deleteById(productId);
    }

    @Override
    public ProductDto UpdateProduct(ProductDto productDto, Integer productId) {
        Product existingProduct = this.productRepo.findById(productId).orElseThrow();

        existingProduct.setProductName(productDto.getProductName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setWeight(productDto.getWeight());
        existingProduct.setPrice(productDto.getPrice());
        if (productDto.getImgUrl() != null) {
            existingProduct.setImgUrl(productDto.getImgUrl());
        }
        existingProduct.setCategory(productDto.getCategory());

        Product updated = this.productRepo.save(existingProduct);
        return this.modelMapper.map(updated, ProductDto.class);
    }

    @Override
    public List<ProductDto> getProductsByCategory(CategoryEnum category) {
        List<Product> products = productRepo.findByCategory(category);
        return products.stream()
                .map(entity -> this.modelMapper.map(entity, ProductDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getFeaturedProducts() {
        List<Product> featured = productRepo.findTop5ByOrderByViewCountDesc();
        return featured.stream()
                .map(entity -> this.modelMapper.map(entity, ProductDto.class))
                .collect(Collectors.toList());
    }
}
