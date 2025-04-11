package com.organica.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.organica.entities.CategoryEnum;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ProductDto {
    private int Productid;
    private String ProductName;
    private String Description;
    private Float Price;
    private Float Weight;
    // Thay đổi trường ảnh từ byte[] sang String lưu URL
    private String imgUrl;
    private CategoryEnum category;
}
