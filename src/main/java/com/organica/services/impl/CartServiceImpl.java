package com.organica.services.impl;

import com.organica.entities.Cart;
import com.organica.entities.CartDetalis;
import com.organica.entities.Product;
import com.organica.entities.User;
import com.organica.payload.*;
import com.organica.repositories.CartDetailsRepo;
import com.organica.repositories.CartRepo;
import com.organica.repositories.ProductRepo;
import com.organica.repositories.UserRepo;
import com.organica.services.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

@Service
public class CartServiceImpl implements CartService {@Autowired
private ProductRepo productRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartDetailsRepo cartDetailsRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto CreateCart(CartHelp cartHelp) {
        return null;
    }

    @Override
    public CartDto addProductToCart(CartHelp cartHelp) {

        int productId = cartHelp.getProductId();
        int quantity = cartHelp.getQuantity();
        String userEmail = cartHelp.getUserEmail();
        AtomicReference<Integer> totalAmount = new AtomicReference<>(0);

        User user = this.userRepo.findByEmail(userEmail);
        Product product = this.productRepo.findById(productId).orElseThrow();

        // Tạo chi tiết giỏ hàng
        CartDetalis cartDetalis = new CartDetalis();
        cartDetalis.setProducts(product);
        cartDetalis.setQuantity(quantity);
        cartDetalis.setAmount((int) (product.getPrice() * quantity));

        Cart cart = user.getCart();

        if (cart == null) {
            Cart cart1 = new Cart();
            cart1.setUser(user);

            int totalAmount2 = 0;

            CartDetalis cartDetalis1 = new CartDetalis();
            cartDetalis1.setQuantity(quantity);
            cartDetalis1.setProducts(product);
            cartDetalis1.setAmount((int) (product.getPrice() * quantity));
            totalAmount2 = cartDetalis1.getAmount();

            List<CartDetalis> pro = cart1.getCartDetalis();
            if (pro == null) {
                pro = new java.util.ArrayList<>();
            }
            pro.add(cartDetalis1);
            cart1.setCartDetalis(pro);
            cart1.setTotalAmount(totalAmount2);
            cartDetalis1.setCart(cart1);

            CartDto map = this.modelMapper.map(cart1, CartDto.class);
            return map;
        }

        cartDetalis.setCart(cart);

        List<CartDetalis> list = cart.getCartDetalis();
        AtomicReference<Boolean> flag = new AtomicReference<>(false);

        List<CartDetalis> newProduct = list.stream().map((i) -> {
            if (i.getProducts().getProductId() == productId) {
                i.setQuantity(quantity);
                i.setAmount((int) (i.getQuantity() * product.getPrice()));
                flag.set(true);
            }
            totalAmount.set(totalP(i.getAmount(), totalAmount.get()));
            return i;
        }).collect(Collectors.toList());

        if (flag.get()) {
            list.clear();
            list.addAll(newProduct);
        } else {
            cartDetalis.setCart(cart);
            totalAmount.set(totalAmount.get() + (int) (quantity * product.getPrice()));
            list.add(cartDetalis);
        }
        cart.setCartDetalis(list);
        cart.setTotalAmount(totalAmount.get());
        System.out.println(cart.getTotalAmount());
        Cart save = this.cartRepo.save(cart);

        CartDto map = this.modelMapper.map(save, CartDto.class);
        return map;
    }

    @Override
    public CartDto GetCart(String userEmail) {
        User user = this.userRepo.findByEmail(userEmail);
        Cart byUser = this.cartRepo.findByUser(user);
        CartDto map = this.modelMapper.map(byUser, CartDto.class);
        return map;
    }

    @Override
    public void RemoveById(Integer ProductId, String userEmail) {
        User user = this.userRepo.findByEmail(userEmail);
        Product product = this.productRepo.findById(ProductId).orElseThrow();
        Cart cart = this.cartRepo.findByUser(user);

        CartDetalis byProductsAndCart = this.cartDetailsRepo.findByProductsAndCart(product, cart);
        int amount = byProductsAndCart.getAmount();
        cart.setTotalAmount(cart.getTotalAmount() - amount);
        this.cartRepo.save(cart);

        this.cartDetailsRepo.delete(byProductsAndCart);
    }

    public int totalP(int t1, int total) {
        return total + t1;
    }

}
