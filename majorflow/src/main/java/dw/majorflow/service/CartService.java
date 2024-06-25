package dw.majorflow.service;

import dw.majorflow.exception.ResourceNotFoundException;
import dw.majorflow.model.Cart;
import dw.majorflow.model.Lecture;
import dw.majorflow.model.User;
import dw.majorflow.repository.CartRepository;
import dw.majorflow.repository.LectureRepository;
import dw.majorflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Cart> getCartByUser(User user) {
        return cartRepository.findByUser(user);
    }

    public void addToCart(String userId, long lectureId) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if (lectureOptional.isPresent()) {
            Lecture lecture = lectureOptional.get();
            Cart cart = new Cart();
            cart.setLecture(lecture);
            cart.setUser(user);
            cart.setPurchaseTime(LocalDateTime.now());
            cartRepository.save(cart);
        } else {
            throw new ResourceNotFoundException("Lecture", "lectureId", lectureId);
        }
    }

    public void removeFromCart(String userId, long cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            if (cart.getUser().equals(user)) {
                cartRepository.delete(cart);
            } else {
                throw new ResourceNotFoundException("Cart", "cartId", cartId);
            }
        } else {
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }
    }
}