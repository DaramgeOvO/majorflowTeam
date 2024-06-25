package dw.majorflow.controller;

import dw.majorflow.model.Cart;
import dw.majorflow.model.User;
import dw.majorflow.service.CartService;
import dw.majorflow.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartByUser(@PathVariable User userId) {
        List<Cart> cartItems = cartService.getCartByUser(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @PostMapping("/add/{userId}/{lectureId}")
    public ResponseEntity<Void> addToCart(@PathVariable String userId, @PathVariable long lectureId) {
        cartService.addToCart(userId, lectureId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{userId}/{cartId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String userId, @PathVariable long cartId) {
        cartService.removeFromCart(userId, cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}